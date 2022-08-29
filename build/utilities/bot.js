"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bot = void 0;
const whatsapp_cloud_api_1 = require("whatsapp-cloud-api");
const config_1 = require("../config");
const from = (0, config_1.getVariableSync)("PHONE_ID") || "101833855975364";
const token = (0, config_1.getVariableSync)("BEARER_TOKEN");
exports.bot = (0, whatsapp_cloud_api_1.createBot)(from, token);
//# sourceMappingURL=bot.js.map