import * as SendGridMail from "@sendgrid/mail";
import { getSecret } from "./secrets";

const SENDGRID_API_KEY_SECRET_ID = "sendgrid-api-key";

/**
 * Make sure any interpolated values in `bodyHtml` are escaped before passing in here.
 */
export async function sendEmail(options: {
    toAddress: string;
    subject: string;
    bodyText: string;
    bodyHtml: string;
}) {
    const sendGridApiKey = await getSecret(SENDGRID_API_KEY_SECRET_ID);
    if (sendGridApiKey === undefined) {
        console.error(new Error(`Failed to fetch SendGrid API key from ${SENDGRID_API_KEY_SECRET_ID}`));
        return;
    }
    const { toAddress, subject, bodyText, bodyHtml } = options;
    SendGridMail.setApiKey(sendGridApiKey);
    const message: SendGridMail.MailDataRequired = {
        to: toAddress,
        from: {
            email: "no-reply@app.mikoroltanak.hu",
            name: "Mikor oltanak?",
        },
        subject,
        text: bodyText,
        html: bodyHtml,
    };
    try {
        const [response] = await SendGridMail.send(message);
        const { statusCode, body } = response;
        if (statusCode < 200 && statusCode >= 300) {
            console.error(new Error(`SendGrid API returned with statusCode ${statusCode} and body "${body}"`));
        }
    } catch (e) {
        console.error(`Failed to send email to "${toAddress}" with subject "${subject}"`, e);
    }
}
