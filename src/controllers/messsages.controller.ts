import debugLib from "debug";
import { Request, Response, Router } from "express";
import { getVariableSync } from "../config";
import { axiosInstance } from "../utilities/axios";

const router = Router();
const debug = debugLib("AIDEA:messagesController");



/**
 * @openapi
 * /send_mssg:
 *  post:
 *    summary: Send a plain text message
 *    tags:
 *       - "Messages"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PlainText'
 *    responses:
 *      "200":
 *        description: Message sent successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseMessage'
 *      "400":
 *          description: Invalid Body
 *
 */

router.post("/send_mssg", async (req: Request, res: Response) => {
  debug("Sending messages");
  try {
    const { to, mssg } = req.body;
    const resp = await axiosInstance.post(`/${getVariableSync("PHONE_ID")}/messages`, {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "text",
      text: { // the text object
        preview_url: false,
        body: mssg
      }
    })

    res.status(200).json({ ok: true, resp:resp.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false });
  }
});


/**
 * @openapi
 * /send_template:
 *  post:
 *    summary: Send a plain text message
 *    tags:
 *       - "Messages"
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/Template'
 *    responses:
 *      "200":
 *        description: Message sent successfully
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/ResponseMessage'
 *      "400":
 *          description: Invalid Body
 *
 */

router.post("/send_template", async (req: Request, res: Response) => {
  debug("Sending templates");
  try {
    const { to, template, lang, components } = req.body;

    const resp = await axiosInstance.post(`/${getVariableSync("PHONE_ID")}/messages`, {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to,
      type: "template",
      template: {
        name: template,
        language: {
          code: lang
        },
        components
      }
    })
    // await bot.sendTemplate(to, template, lang);
    res.status(200).json({ ok: true, resp: resp.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: error });
  }
});


export default router;
