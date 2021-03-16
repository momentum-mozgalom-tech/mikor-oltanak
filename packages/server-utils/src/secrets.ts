import { SecretManagerServiceClient } from "@google-cloud/secret-manager";
import { getProjectId } from "./commons";

export const getSecret = async (secretId: string, projectId?: string) => {
    const client = new SecretManagerServiceClient();
    const name = `projects/${projectId ?? getProjectId()}/secrets/${secretId}/versions/latest`;
    try {
        const [ version ] = await client.accessSecretVersion({ name });
        // Extract the payload as a string.
        const payload = version.payload?.data?.toString();
        return payload;
    } catch (e) {
        console.error("Failed to fetch secret", e);
        return;
    }
};

export const setSecret = async (value: string, secretId: string, projectId?: string) => {
    const client = new SecretManagerServiceClient();
    const parent = `projects/${projectId ?? getProjectId()}`;
    try {
        await client.createSecret({
            parent: parent,
            secretId: secretId,
            secret: {
                replication: {
                    automatic: {},
                },
            },
        });
    } catch (e) {
        console.debug(`Secret creation failed for ID ${secretId}`);
        console.debug(e);
    }
    const name = `${parent}/secrets/${secretId}`;
    const payload = Buffer.from(value, "utf8");
    try {
        await client.addSecretVersion({
            parent: name,
            payload: {
                data: payload,
            },
        });
    } catch (e) {
        console.error(`Failed to create secret at ${secretId}`, e);
        throw e;
    }
};
