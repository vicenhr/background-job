import express from 'express';
import healthRouter from './routes/health.js';

function createApp(){
    const app = express();
    app.use(healthRouter);
    return app;
};

export default createApp();