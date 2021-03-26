import * as admin from "firebase-admin";
import {
    sendEmail,
} from "@mikoroltanak/server-utils";
import * as fs from "fs";
import * as generatePassword from "generate-password";
import { CollectionId, IFirestoreSurgery } from "@mikoroltanak/api";

const serviceAccount = require("../../../secrets/mikor-oltanak-firebase-adminsdk-1bpqk-3f0bba69b8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

interface INewUserRequest {
    userEmail: string;
    password: string;
    name: string;
    description: string;
    location: string;
    surgeryEmail: string;
    phone: string;
}

async function createNewUser({
    userEmail,
    password,
    name,
    description,
    location,
    surgeryEmail,
    phone,
}: INewUserRequest) {
    try {
        // Delete user if exists
        console.log(`Does this user exist already? ${userEmail}...`);
        try {
            const { uid: existingUid } = (await admin.auth().getUserByEmail(userEmail));
            console.log("User exists already, deleting it...");
            await admin.auth().deleteUser(existingUid);
            console.log("User deleted!");
        } catch (e) {
            console.log("User doesn't yet exist, continuing!");
        }
        // Create new user
        console.log(`Creating user with email ${userEmail}...`);
        const newUser = await admin.auth().createUser({
            email: userEmail,
            password,
        });
        console.log(`User created with email ${userEmail}!`);
        const { uid } = newUser;
        // Wait until user gets auto-disabled
        // eslint-disable-next-line no-constant-condition
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
        // Wait until surgery doc is created
        // eslint-disable-next-line no-constant-condition
        while (true) {
            console.log("Waiting a bit...");
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log("Checking if surgery doc is created already...");
            const surgeryDoc = await admin.firestore().collection(CollectionId.Surgeries).doc(uid).get();
            if (surgeryDoc.exists) {
                break;
            }
        }
        console.log("Setting surgery information...");
        await (admin.firestore().collection(CollectionId.Surgeries).doc(uid) as FirebaseFirestore.DocumentReference<IFirestoreSurgery>).update({
            name,
            description,
            location,
            phone,
            email: surgeryEmail,
        });
        console.log("Surgery information set!");
        // Send welcome email
        const infoEmail = "info@mikoroltanak.hu";
        const bodyText = `Kedves Jelentkező!

A felhasználóneve: ${userEmail}
A jelszava: ${password}

A https://mikoroltanak.hu/rendelo lapon tud belépni.

Ha bármiben tudunk segíteni, állunk rendelkezésére, kérjük írjon az ${infoEmail} címre!

Köszönjük a munkáját és minden jót kívánunk:
"Mikor oltanak?" weblap
`;
        const bodyHtml = `
        <p>Kedves Jelentkező!</p>

        <p>
            A felhasználóneve: ${userEmail}<br />
            A jelszava: ${password}
        </p>

        <p>A https://mikoroltanak.hu/rendelo lapon tud belépni.</p>

        <p>Ha bármiben tudunk segíteni, állunk rendelkezésére, kérjük írjon az ${infoEmail} címre!</p>

        <p>Köszönjük a munkáját és minden jót kívánunk:<br />
        "Mikor oltanak?" weblap</p>
`;
        console.log(`Sending email to ${userEmail}...`);
        await sendEmail({
            toAddress: userEmail,
            replyToAddress: infoEmail,
            ccAddress: infoEmail,
            subject: "Sikeres regisztráció a mikoroltanak.hu weboldalra",
            bodyText,
            bodyHtml,
        });
        console.log(`Email sent to ${userEmail}!`);
    } catch (e) {
        console.error(`Failed to finish user creation for email ${userEmail}`, e);
    }
}

async function execute() {
    // Read new user file
    const filename = "../../secrets/new-users.txt";
    const fileContent = fs.readFileSync(filename, "utf8");
    const newUserRows = fileContent.split("\n");
    for (const newUserRow of newUserRows) {
        const newUserFields = newUserRow.split("\t");
        if (newUserFields.length < 6) {
            continue;
        }
        const [ userEmail, name, description, location, surgeryEmail, phone ] = newUserFields;
        const password = generatePassword.generate({
            length: 20,
            numbers: true,
        });
        await createNewUser({
            userEmail,
            password,
            name,
            description,
            location,
            surgeryEmail,
            phone,
        });
    }
    console.log("FINISHED!");
}

execute();
