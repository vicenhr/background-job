import { inngest } from "./client.js";

export const sayHello = inngest.createFunction(
  { id: "say-hello", triggers: [{ event: "test/hello" }]},
  async ({ step }) => {
    await step.sleep("pause", "5s");
    return { message:'Hello from the background!'};
  }
);