set -eux

# 1. Get a private key for the firebase service account and place it in the /secret folder:
#    https://console.firebase.google.com/u/0/project/mikor-oltanak/settings/serviceaccounts/adminsdk
# 2. Update createUsers.ts to reference this new file
# 3. Set the following env var:
#    export GOOGLE_APPLICATION_CREDENTIALS="/path/to/secret/mikor-oltanak-firebase-adminsdk.json"
# 4. Copy the applicants into secret/new-users.txt in the following format:
#    email <tab> name <tab> description
#    email <tab> name <tab> description
#    email <tab> name <tab> description

pnpx ts-node src/createUsers.ts
