import * as admin from 'firebase-admin';
import {
    sendEmail,
} from "@mikoroltanak/server-utils";
var serviceAccount = require("../../../secret/mikor-oltanak-firebase-adminsdk-1bpqk-d95de128e7.json");
import * as fs from 'fs';
import * as generatePassword from "generate-password";
import { CollectionId, IFirestoreSurgery } from '@mikoroltanak/api';

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

interface INewUserRequest {
    email: string;
    password: string;
    name: string;
    description: string;
}

async function createNewUser({
    email,
    password,
    name,
    description,
}: INewUserRequest) {
    try {
        // Delete user if exists
        console.log(`Does this user exist already? ${email}...`);
        try {
            const { uid: existingUid } = (await admin.auth().getUserByEmail(email));
            console.log("User exists already, deleting it...");
            await admin.auth().deleteUser(existingUid);
            console.log("User deleted!");
        } catch (e) {
            console.log("User doesn't yet exist, continuing!")
        }
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
        // Set surgery information
        console.log("Setting surgery information...");
        await (admin.firestore().collection(CollectionId.Surgeries).doc(uid) as FirebaseFirestore.DocumentReference<IFirestoreSurgery>).update({
            name,
            description
        });
        console.log("Surgery information set!");
        // Send welcome email
        const infoEmail = "info@mikoroltanak.hu";
        const bodyText = `Kedves Jelentkező!

A felhasználóneve: ${email}
A jelszava: ${password}

A https://mikoroltanak.hu/rendelo lapon tud belépni.

Ha bármiben tudunk segíteni, állunk rendelkezésére, kérjük írjon az ${infoEmail} címre!

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

        <p>Ha bármiben tudunk segíteni, állunk rendelkezésére, kérjük írjon az ${infoEmail} címre!</p>

        <p>Köszönjük a munkáját és minden jót kívánunk:<br />
        "Mikor oltanak?" weblap</p>
`
        console.log(`Sending email to ${email}...`);
        await sendEmail({
            toAddress: email,
            replyToAddress: infoEmail,
            ccAddress: infoEmail,
            subject: "Sikeres regisztráció a mikoroltanak.hu weboldalra",
            bodyText,
            bodyHtml,
        });
        console.log(`Email sent to ${email}!`);
    } catch (e) {
        console.error(`Failed to finish user creation for email ${email}`, e);
    }
}

async function execute() {
    // Read new user file
    const filename = "../../secret/new-users.txt"
    const fileContent = fs.readFileSync(filename, 'utf8');
    const newUserRows = fileContent.split("\n");
    for (const newUserRow of newUserRows) {
        const newUserFields = newUserRow.split("\t");
        if (newUserFields.length < 3) {
            continue;
        }
        const [ email, name, description ] = newUserFields;
        var password = generatePassword.generate({
            length: 20,
            numbers: true,
        });
        await createNewUser({
            email,
            password,
            name,
            description,
        });
    }
    console.log("FINISHED!");
}

execute();
