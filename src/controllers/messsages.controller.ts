import debugLib from "debug";
import { Request, Response, Router } from "express";
import { bot } from "../utilities/bot";

const router = Router();
const debug = debugLib("Aidea:messagesController");

router.post("/send_mssg", async (req: Request, res: Response) => {
  debug("Sending messages");
  try {
    const { to, mssg } = req.body;
    await bot.sendMessage(to, mssg);

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false });
  }
});

router.post("/send_template", async (req: Request, res: Response) => {
  debug("Sending templates");
  try {
    const { to, template, lang } = req.body;
    await bot.sendTemplate(to, template, lang);
    res.status(200).json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: error });
  }
});

router.post("/send_template_params", async (req: Request, res: Response) => {
  debug("Sending templates");
  try {
    const { to, template, lang, variables } = req.body;
    let number = to;
    let params = [];
    for (const property in variables) {
      params.push({ type: "text", text: variables[property] });
    }

    if (to.charAt(0) === "+") {
      number = to.substring(1);
    }

    // number = "573212214921";
    const result = await bot.sendTemplate(number, template, lang, [
      { type: "body", parameters: params as any },
    ]);
    res.status(200).json({ ok: true, result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: error });
  }
});

export default router;
