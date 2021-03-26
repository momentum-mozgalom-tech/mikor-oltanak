import * as admin from "firebase-admin";

const serviceAccount = require("../../../secrets/mikor-oltanak-firebase-adminsdk-1bpqk-3f0bba69b8.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

async function execute() {
    const { users } = await admin.auth().listUsers();
    for (const user of users) {
        console.log(`Checking ${user.email}...`);
        if (user.disabled) {
            console.log(`Deleting ${user.email}...`);
            await admin.auth().deleteUser(user.uid);
            console.log(`Deleted ${user.email}!`);
        }
        console.log(`Checked ${user.email}!`);
    }
    console.log("FINISHED!");
}

execute();
