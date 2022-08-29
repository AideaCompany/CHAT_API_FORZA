"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const whatsapp_cloud_api_1 = require("whatsapp-cloud-api");
const config_1 = require("./config");
const cors_1 = __importDefault(require("cors"));
const debug_1 = __importDefault(require("debug"));
// or if using require:
// const { createBot } = require('whatsapp-cloud-api');
const debug = (0, debug_1.default)("Aidea:server");
(async () => {
    try {
        debug("Port set to:", (0, config_1.getVariableSync)("PORT"));
        // replace the values below
        const from = (0, config_1.getVariableSync)("PHONE_ID") || "101833855975364";
        const token = (0, config_1.getVariableSync)("BEARER_TOKEN");
        const to = "573212214921";
        const webhookVerifyToken = "YOUR_WEBHOOK_VERIFICATION_TOKEN";
        // Create a bot that can send messages
        const bot = (0, whatsapp_cloud_api_1.createBot)(from, token);
        // Send text message
        // const result = await bot.sendText(to, "Hello world");
        // Start express server to listen for incoming messages
        // NOTE: See below under `Documentation/Tutorial` to learn how
        // you can verify the webhook URL and make the server publicly available
        await bot.startExpressServer({
            webhookVerifyToken: "my-verification-token",
            port: (0, config_1.getVariableSync)("PORT") || 8082,
            webhookPath: `/custom/webhook`,
            useMiddleware: (app) => {
                app.use((0, cors_1.default)());
            },
        });
        // Listen to ALL incoming messages
        // NOTE: remember to always run: await bot.startExpressServer() first
        bot.on("message", async (msg) => {
            console.log(msg);
            if (msg.type === "text") {
                await bot.sendText(msg.from, "Received your text message!");
            }
            else if (msg.type === "image") {
                await bot.sendText(msg.from, "Received your image!");
            }
        });
    }
    catch (error) {
        debug("[ERROR] Could not start application: ", error);
    }
})();
//# sourceMappingURL=index2.js.map