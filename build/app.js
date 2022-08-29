"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// config
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const express_actuator_1 = __importDefault(require("express-actuator"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config");
// swagger
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const express_fileupload_1 = __importDefault(require("express-fileupload"));
// controllers
const messsages_controller_1 = __importDefault(require("./controllers/messsages.controller"));
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
// EXPRESS
const app = (0, express_1.default)();
const apiPath = (0, config_1.getVariableSync)("API_PATH") || "";
const fullApiPath = `${apiPath}/V1`;
app.use((0, cors_1.default)());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
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
app.use("/app/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocs));
app.use(fullApiPath, messsages_controller_1.default);
exports.default = app;
//# sourceMappingURL=app.js.map