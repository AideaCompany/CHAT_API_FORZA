import { createBot } from "whatsapp-cloud-api";
import { getVariableSync } from "../config";

const from = (getVariableSync("PHONE_ID") as string) || "101833855975364";
const token = getVariableSync("BEARER_TOKEN") as string;

export const bot = createBot(from, token);
