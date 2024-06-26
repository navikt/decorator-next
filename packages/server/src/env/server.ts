import { clientEnvSchema } from "decorator-shared/params";
import { serverSchema, serverEnv, client_env } from "./schema";

const _serverEnv = serverSchema.safeParse(serverEnv);
const _clientEnv = clientEnvSchema.safeParse(client_env);

if (!_serverEnv.success) {
    console.error(
        "❌ Invalid environment variables:\n",
        _serverEnv.error.format(),
    );
    throw new Error("Invalid environment variables");
}

if (!_clientEnv.success) {
    console.error(
        "❌ Invalid environment variables:\n",
        _clientEnv.error.format(),
    );
    throw new Error("Invalid environment variables");
}

// As to not leak important things
export const env = { ..._serverEnv.data };
export const clientEnv = {
    ..._clientEnv.data,
};
