"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_actuator_1 = __importDefault(require("express-actuator"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
const debug_1 = __importDefault(require("debug"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// controllers
const messsages_controller_1 = __importDefault(require("./controllers/messsages.controller"));
const bot_1 = require("./utilities/bot");
const debug = (0, debug_1.default)("Aidea:server");
const apiPath = (0, config_1.getVariableSync)("API_PATH") || "";
const fullApiPath = `${apiPath}/V1`;
const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "WHATSAPP API",
            description: "Endpoints WhatsApp API Aidea",
            contact: {
                name: "Sergio Sanchez",
            },
            version: "0.0.1",
        },
        // servers: [
        //   {
        //     url: `${getVariableSync('BACKEND_URL')}${getVariableSync('API_PATH')}/V1`
        //   }
        // ]
    },
    apis: [`${__dirname}/controllers/*.js`, `${__dirname}/swagger/*.js`],
};
const swaggerDocs = (0, swagger_jsdoc_1.default)(swaggerOptions);
(async () => {
    try {
        debug("Port set to:", (0, config_1.getVariableSync)("PORT"));
        await bot_1.bot.startExpressServer({
            webhookVerifyToken: (0, config_1.getVariableSync)("SECRET_WEBHOOK"),
            port: (0, config_1.getVariableSync)("PORT") || 8082,
            useMiddleware: (app) => {
                // config
                app.use((0, cors_1.default)());
                app.use((0, morgan_1.default)("dev"));
                app.use(express_1.default.json());
                app.use((0, cookie_parser_1.default)());
                app.use("/app/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
                app.use(express_1.default.static(path_1.default.join(__dirname, "../static")));
                app.use((_req, res, next) => {
                    res.header("Access-Control-Allow-Origin", "*");
                    res.header("Access-Control-Allow-Headers", "Authorization, X-API-KEY, Origin, X-Requested-With," +
                        "Content-Type, Accept, Access-Control-Allow-Request-Method");
                    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
                    res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
                    next();
                });
                app.use((0, express_actuator_1.default)({
                    basePath: "/management",
                }));
                // controllers
                app.use(fullApiPath, messsages_controller_1.default);
            },
        });
        // Listen to ALL incoming messages
        // NOTE: remember to always run: await bot.startExpressServer() first
        bot_1.bot.on("message", async (msg) => {
            console.log(msg);
            if (msg.type === "text") {
                console.log("Mensaje recibido");
                await bot_1.bot.sendText(msg.from, "Received your text message!");
            }
        });
    }
    catch (error) {
        debug("[ERROR] Could not start application: ", error);
    }
})();
//# sourceMappingURL=index.js.map