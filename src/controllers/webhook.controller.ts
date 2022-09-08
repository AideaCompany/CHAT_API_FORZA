import axios from "axios";
import debugLib from "debug";
import { Request, Response, Router } from "express";
import { getVariableSync } from "../config";
import { updateSentMssgLink } from "../services/link.service";

const router = Router();
const debug = debugLib("Aidea:messagesController");

router.post("/webhook/whatsapp", async (req: Request, res: Response) => {
  debug("webhook");

  // Check the Incoming webhook message
  // console.log(JSON.stringify(req.body, null, 2));

  // info on WhatsApp text message payload: https://developers.facebook.com/docs/whatsapp/cloud-api/webhooks/payload-examples#text-messages
  if (req.body.object) {
    if (
      req.body.entry &&
      req.body.entry[0].changes &&
      req.body.entry[0].changes[0] &&
      req.body.entry[0].changes[0].value.statuses &&
      req.body.entry[0].changes[0].value.statuses[0]
    ) {

    const newStatus = req.body.entry[0].changes[0].value.statuses[0]
    console.log(newStatus.id)
    console.log(newStatus.status)
    await updateSentMssgLink({mssgId: newStatus.id, ack: newStatus.status})
    }
    res.sendStatus(200);
  } else {
    // Return a '404 Not Found' if event is not from a WhatsApp API
    res.sendStatus(404);
  }

});


router.get("/webhook/whatsapp", (req: Request, res: Response) => {
    const verify_token = getVariableSync("SECRET_WEBHOOK");
  
    // Parse params from the webhook verification request
    let mode = req.query["hub.mode"];
    let token = req.query["hub.verify_token"];
    let challenge = req.query["hub.challenge"];
  
    // Check if a token and mode were sent
    if (mode && token) {
      // Check the mode and token sent are correct
      if (mode === "subscribe" && token === verify_token) {
        // Respond with 200 OK and challenge token from the request
        console.log("WEBHOOK_VERIFIED");
        res.status(200).send(challenge);
      } else {
        // Responds with '403 Forbidden' if verify tokens do not match
        res.sendStatus(403);
      }
    }
  });

export default router