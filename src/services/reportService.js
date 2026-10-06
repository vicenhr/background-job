import { inngest } from '../inngest/client.js';
import { createReport, updateReport } from '../store/reportsStore.js';

export async function requestReport(topic) {
    const report = createReport(topic);

    try {
        await inngest.send({
            name: 'report/requested',
            data: { id: report.id, topic: report.topic },
        });
    } catch (err) {
        console.error('Failed to send report/requested event:', err.message);
        updateReport(report.id, { status: 'failed' });
        return { ok: false };
    }

    return { ok: true, report };
}