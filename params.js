"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseParams = void 0;
const zod_1 = __importDefault(require("zod"));
const authLevelSchema = zod_1.default.enum(["Level3", "Level4"]);
const languageSchema = zod_1.default.enum(["nb", "nn", "en", "se", "pl", "uk", "ru"]);
const contextSchema = zod_1.default.enum([
    "privatperson",
    "arbeidsgiver",
    "samarbeidspartner",
]);
const breadcrumbSchema = zod_1.default.object({
    title: zod_1.default.string(),
    url: zod_1.default.string().url(),
    handleInApp: zod_1.default.boolean().default(false),
});
const background = zod_1.default.enum(["white", "gray", "transparent"]);
const paramsSchema = zod_1.default.object({
    context: contextSchema.default("privatperson"),
    simple: zod_1.default.boolean().default(false),
    simpleHeader: zod_1.default.boolean().default(false),
    simpleFooter: zod_1.default.boolean().default(false),
    enforceLogin: zod_1.default.boolean().default(false),
    redirectToApp: zod_1.default.boolean().default(false),
    level: authLevelSchema.default("Level3"),
    language: languageSchema.default("nb"),
    availableLanguages: zod_1.default
        .array(zod_1.default.object({
        locale: languageSchema,
        url: zod_1.default.string().url(),
    }))
        .default([]),
    breadcrumbs: zod_1.default.array(breadcrumbSchema).default([]),
    utilsBackground: background.default("transparent"),
    feedback: zod_1.default.boolean().default(false),
    chatbot: zod_1.default.boolean().default(true),
    chatbotVisible: zod_1.default.boolean().default(false),
    urlLookupTable: zod_1.default.boolean().default(false),
    shareScreen: zod_1.default.boolean().default(false),
    logoutUrl: zod_1.default.string().url().optional(),
    maskHotjar: zod_1.default.boolean().default(false),
});
const parseParams = (params) => {
    return paramsSchema.safeParse(Object.assign(Object.assign({}, params), { simple: params.simple === "true"
            ? true
            : params.simple === "false"
                ? false
                : params.simple, breadcrumbs: params.breadcrumbs
            ? JSON.parse(params.breadcrumbs)
            : params.breadcrumbs }));
};
exports.parseParams = parseParams;
