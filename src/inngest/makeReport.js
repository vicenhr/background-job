import { inngest } from "./client.js";
import { updateReport } from "../store/reportsStore.js";

export function buildReportContent(topic) {
  return `Report about ${topic}`;
}

export const makeReport = inngest.createFunction(
  {
    id: "make-report",
    triggers: [{ event: "report/requested" }],
    retries: 2,
    onFailure: async ({ event, error }) => {
      console.log(JSON.stringify(event, null, 2));
      const reportId = event.data.event.data.id;
      console.error(`Report ${reportId} failed for good:`, error.message);
      updateReport(reportId, { status: "failed" });
    },
  },
  async ({ event, step }) => {
    const { id, topic } = event.data;

    await step.sleep('do-the-slow-work', '8s');

    const result = await step.run('build-report', () => {
      if (topic === 'fail') {
        throw new Error("The report oven is broken!");
      }
      updateReport(id, { status: 'done', result: buildReportContent(topic) });
      return { id, status: 'done' };
    });

    return result;
  }
);