"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.axiosInstance = void 0;
const axios_1 = __importDefault(require("axios"));
const config_1 = require("../config");
exports.axiosInstance = axios_1.default.create({
    baseURL: `https://graph.facebook.com/${(0, config_1.getVariableSync)("VERSION")}`,
    headers: {
        Authorization: `Bearer ${(0, config_1.getVariableSync)("BEARER_TOKEN")}`,
    },
});
//# sourceMappingURL=axios.js.map