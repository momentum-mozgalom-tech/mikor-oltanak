import * as admin from 'firebase-admin';
import {
    sendEmail,
} from "@mikoroltanak/server-utils";
var serviceAccount = require("../../../secret/mikor-oltanak-firebase-adminsdk-1bpqk-d95de128e7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

async function execute() {
    const email = "test@test.com";
    const password = "testtest";
    try {
        // Create new user
        console.log(`Creating user with email ${email}...`);
        const newUser = await admin.auth().createUser({
            email,
            password,
        });
        console.log(`User created with email ${email}!`);
        const { uid } = newUser;
        // Wait until user gets auto-disabled
        while (true) {
            console.log("Waiting a bit...");
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Checking if user is disabled already...");
            const userRefetched = await admin.auth().getUser(uid);
            if (userRefetched.disabled) {
                break;
            }
        }
        console.log("User is disabled!");
        // Reenable user
        console.log("Reenabling user...");
        await admin.auth().updateUser(uid, { disabled: false });
        console.log("User is reenabled!");
        // Send welcome email
        const bodyText = `Kedves Jelentkező!

A felhasználóneve: ${email}
A jelszava: ${password}

A https://mikoroltanak.hu/rendelo lapon tud belépni.

Ha bármiben tudunk segíteni, állunk rendelkezésére, kérjük írjon az info@mikoroltanak.hu címre!

Köszönjük a munkáját és minden jót kívánunk:
"Mikor oltanak?" weblap
`
        const bodyHtml = `
        <p>Kedves Jelentkező!</p>

        <p>
            A felhasználóneve: ${email}<br />
            A jelszava: ${password}
        </p>

        <p>A https://mikoroltanak.hu/rendelo lapon tud belépni.</p>

        <p>Ha bármiben tudunk segíteni, állunk rendelkezésére, kérjük írjon az info@mikoroltanak.hu címre!</p>

        <p>Köszönjük a munkáját és minden jót kívánunk:<br />
        "Mikor oltanak?" weblap</p>
`
        console.log(`Sending email to ${email}...`);
        await sendEmail({
            toAddress: email,
            subject: "Sikeres regisztráció a mikoroltanak.hu weboldalra",
            bodyText,
            bodyHtml,
        });
        console.log(`Email sent to ${email}!`);
    } catch (e) {
        console.error(`Failed to finish user creation for email ${email}`, e);
    }
}

execute();
