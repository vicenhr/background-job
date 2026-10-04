import express from 'express';
import healthRouter from './routes/health.js';
import reportsRouter from './routes/reports.js';
import { serve } from 'inngest/express';
import { inngest, functions } from './inngest/index.js';

function createApp(){
    const app = express();
    app.use(express.json());
    app.use('/api/inngest', serve({ client: inngest, functions }));
    app.use(healthRouter);
    app.use(reportsRouter);
    return app;
};

export default createApp();