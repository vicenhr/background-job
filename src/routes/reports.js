import express from 'express';
import { validateReportInput } from '../validators/reportValidator.js';
import { requestReport } from '../inngest/services/reportService.js';
import { getReportById } from '../store/reportsStore.js'


const router = express.Router();

router.param('id', (req, res, next, id) => {
    const report = getReportById(id);
    if (!report) {
        return res.status(404).json({ error: `Report ${id} not found` });
    }
    req.report = report;
    next();
});

router.post('/reports', async (req, res) => {
    const { ok, error, topic } = validateReportInput(req.body);
    if (!ok) {
        return res.status(400).json({ error });
    }

    const result = await requestReport(topic);
    if (!result.ok) {
        return res.status(503).json({ error: 'could not queue the report, try again later' });
    }

    return res.status(202).json({ id: result.report.id, status: result.report.status });
});

router.get('/reports/:id', (req, res) => {
    return res.json(req.report);
});

export default router;