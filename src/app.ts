import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import actuator from "express-actuator";
import logger from "morgan";
import swaggerJsDocs from "swagger-jsdoc";
import swaggerUI from "swagger-ui-express";
import { getVariableSync } from "./config";
import path from 'path'
import MessageControllers from "./controllers/messsages.controller";
import WebHookController from "./controllers/webhook.controller";

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

  const swaggerDocs = swaggerJsDocs(swaggerOptions)  

  // EXPRESS
const app = express()
const apiPath = getVariableSync('API_PATH') || ''
const fullApiPath = `${apiPath}/V1`

app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '../static')))
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header(
    'Access-Control-Allow-Headers',
    'Authorization, X-API-KEY, Origin, X-Requested-With,' + 'Content-Type, Accept, Access-Control-Allow-Request-Method'
  )
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE')
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE')
  next()
})
app.use(
  actuator({
    basePath: '/management'
  })
)
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs))

// controllers
app.use(WebHookController);
app.use(fullApiPath, MessageControllers);

export default app