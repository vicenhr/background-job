import express from 'express';
import { createReport, updateReport, getReportById } from '../store/reportsStore.js'
import { inngest } from '../inngest/client.js';

const router = express.Router();
const MAX_TOPIC_LENGTH = 100;

router.param('id', (req, res, next, id) => {
    const report = getReportById(id);
    if(!report){
        return res.status(404).json({ error: `Report ${id} not found`});
    }
    req.report = report;
    next();
});

router.post('/reports', async (req, res) => {
    const topic = req.body?.topic;
    
    if (typeof topic !== 'string' || topic.trim() === '') {
        return res.status(400).json({ error: 'topic is required and must be a non-empty string' });
    }
    
    if (topic.trim().length > MAX_TOPIC_LENGTH) {
        return res.status(400).json({ error: `topic must be at most ${MAX_TOPIC_LENGTH} characters` });
    }

    const report = createReport(topic.trim());

    try{
        await inngest.send({
            name: 'report/requested',
            data: { id: report.id, topic: report.topic},
        });
    }catch(err){
        updateReport(report.id, {status: 'failed'});
        return res.status(503).json({ error: 'could not queue the report, try again later'});
    }

    return res.status(202).json({id: report.id, status: report.status});
});

router.get('/reports/:id', (req, res) =>{
    return res.json(req.report);
});

export default router;