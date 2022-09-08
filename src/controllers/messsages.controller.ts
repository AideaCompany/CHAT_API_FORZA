import debugLib from "debug";
import { Request, Response, Router } from "express";
import { getVariableSync } from "../config";
import { axiosInstance } from "../utilities/axios";

const router = Router();
const debug = debugLib("Aidea:messagesController");

router.post("/send_mssg", async (req: Request, res: Response) => {
  debug("Sending messages");
  try {
    const { to, mssg } = req.body;
    await axiosInstance.post(`/${getVariableSync("PHONE_ID")}/messages`, {
      messaging_product: "whatsapp",
      recipient_type: "individual",
      to: to,
      type: "text",
      text: { // the text object
        preview_url: false,
        body: mssg
      }
    })

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false });
  }
});

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
    console.log(resp.data)
    // await bot.sendTemplate(to, template, lang);
    res.status(200).json({ ok: true, resp: resp.data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: error });
  }
});


export default router;
