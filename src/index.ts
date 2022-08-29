import cors from "cors";
import express from "express";
import actuator from "express-actuator";
import logger from "morgan";
import path from "path";
import { getVariableSync } from "./config";
import debugLib from "debug";
import cookieParser from "cookie-parser";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
// controllers
import MessageControllers from "./controllers/messsages.controller";
import { bot } from "./utilities/bot";

const debug = debugLib("Aidea:server");
const apiPath = getVariableSync("API_PATH") || "";
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

const swaggerDocs = swaggerJsDocs(swaggerOptions);

(async () => {
  try {
    debug("Port set to:", getVariableSync("PORT") as number);

    await bot.startExpressServer({
      webhookVerifyToken: getVariableSync("SECRET_WEBHOOK") as string,
      port: (getVariableSync("PORT") as number) || 8082,
      useMiddleware: (app) => {
        // config
        app.use(cors());
        app.use(logger("dev"));
        app.use(express.json());
        app.use(cookieParser());
        app.use("/app/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocs));
        app.use(express.static(path.join(__dirname, "../static")));
        app.use((_req, res, next) => {
          res.header("Access-Control-Allow-Origin", "*");
          res.header(
            "Access-Control-Allow-Headers",
            "Authorization, X-API-KEY, Origin, X-Requested-With," +
              "Content-Type, Accept, Access-Control-Allow-Request-Method"
          );
          res.header(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, DELETE"
          );
          res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
          next();
        });
        app.use(
          actuator({
            basePath: "/management",
          })
        );

        // controllers
        app.use(fullApiPath, MessageControllers);
      },
    });

    // Listen to ALL incoming messages
    // NOTE: remember to always run: await bot.startExpressServer() first
    bot.on("message", async (msg) => {
      console.log(msg);

      if (msg.type === "text") {
        console.log("Mensaje recibido");
        await bot.sendText(msg.from, "Received your text message!");
      }
    });
  } catch (error) {
    debug("[ERROR] Could not start application: ", error);
  }
})();
