"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const express_1 = require("express");
const bot_1 = require("../utilities/bot");
const router = (0, express_1.Router)();
const debug = (0, debug_1.default)("Aidea:messagesController");
router.post("/send_mssg", async (req, res) => {
    debug("Sending messages");
    try {
        const { to, mssg } = req.body;
        await bot_1.bot.sendMessage(to, mssg);
        res.status(200).json({ ok: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false });
    }
});
router.post("/send_template", async (req, res) => {
    debug("Sending templates");
    try {
        const { to, template, lang } = req.body;
        await bot_1.bot.sendTemplate(to, template, lang);
        res.status(200).json({ ok: true });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ ok: false });
    }
});
exports.default = router;
//# sourceMappingURL=messsages.controller.js.map