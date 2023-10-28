import config from "config";
import Twilio, { Twilio } from "twilio";

let { SID, TOKEN, NUMBER } = config.get("SEND_SMS");

const client = new Twilio(SID, TOKEN);

export default async function sendSMS(smsData) {
  try {
    await client.sendSMS.create({
      body: smsData.body,
      to: smsData.phonenumber,
      from: NUMBER,
    });
  } catch (error) {
    console.log(error);
  }
}
