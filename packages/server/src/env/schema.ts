import { BoostEnviroment, Environment } from "decorator-shared/params";
import { z } from "zod";

export const serverSchema = z.object({
    UNLEASH_SERVER_API_TOKEN: z.string(),
    UNLEASH_SERVER_API_URL: z.string().url(),
    ENONICXP_SERVICES: z.string().url(),
    SEARCH_API: z.string().url(),
    XP_BASE_URL: z.string().url(),
    CDN_URL: z.string().url(),
    NODE_ENV: z.enum(["production", "development"]),
    ENV: z.enum(["localhost", "dev", "prod"]),
    IS_LOCAL_PROD: z.boolean().optional(),
    HOST: z.string().url(),
    VARSEL_API_URL: z.string().url(),
    API_DEKORATOREN_URL: z.string().url(),
    LOGIN_URL: z.string().url(),
    HAS_EXTERNAL_DEV_CONSUMER: z.boolean(),
});

export const serverEnv = {
    UNLEASH_SERVER_API_TOKEN: process.env.UNLEASH_SERVER_API_TOKEN,
    UNLEASH_SERVER_API_URL: process.env.UNLEASH_SERVER_API_URL,
    ENONICXP_SERVICES: process.env.ENONICXP_SERVICES,
    SEARCH_API: process.env.SEARCH_API,
    XP_BASE_URL: process.env.XP_BASE_URL,
    NODE_ENV:
        process.env.NODE_ENV === "test" ? "development" : process.env.NODE_ENV,
    ENV: process.env.ENV,
    CDN_URL: process.env.CDN_URL,
    IS_LOCAL_PROD: process.env.IS_LOCAL_PROD === "true",
    HOST: process.env.HOST,
    VARSEL_API_URL: process.env.VARSEL_API_URL,
    API_DEKORATOREN_URL: process.env.API_DEKORATOREN_URL,
    LOGIN_URL: process.env.LOGIN_URL,
    HAS_EXTERNAL_DEV_CONSUMER: process.env.HAS_EXTERNAL_DEV_CONSUMER === "true",
};

// This is session URL for prod
// https://login.nav.no/oauth2/session
export const client_env = {
    API_SESSION_URL: process.env.API_SESSION_URL,
    APP_URL: process.env.HOST,
    AUTH_API_URL: process.env.AUTH_API_URL,
    BOOST_ENVIRONMENT: process.env.BOOST_ENVIRONMENT as BoostEnviroment,
    ENV: serverEnv.NODE_ENV,
    LOGIN_URL: process.env.LOGIN_URL,
    LOGOUT_URL: process.env.LOGOUT_URL,
    MIN_SIDE_ARBEIDSGIVER_URL: process.env.MIN_SIDE_ARBEIDSGIVER_URL,
    MIN_SIDE_URL: process.env.MIN_SIDE_URL,
    PERSONOPPLYSNINGER_URL: process.env.PERSONOPPLYSNINGER_URL,
    PUZZEL_CUSTOMER_ID: process.env.PUZZEL_CUSTOMER_ID,
    VARSEL_API_URL: process.env.VARSEL_API_URL,
    XP_BASE_URL: process.env.XP_BASE_URL,
} satisfies Record<keyof Environment, unknown>;
