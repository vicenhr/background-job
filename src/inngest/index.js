import { sayHello } from "./functions/sayHello.js";
import { makeReport } from "./functions/makeReport.js";
import { heartbeat } from './functions/heartbeat.js';

export const functions = [sayHello, makeReport, heartbeat];

export { inngest } from './client.js';