import { inngest } from '../client.js';
import { getReportsSummary } from '../../store/reportsStore.js';

export const heartbeat = inngest.createFunction(
    {
        id: 'heartbeat',
        triggers: [{cron: "* * * * *"}],
    },
    async({step }) => {
        const summary = await step.run('count-reports', () => getReportsSummary());
        return summary;
    }
);