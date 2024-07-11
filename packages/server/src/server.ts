import { Server } from "bun";
import { clientTextsKeys } from "decorator-shared/types";
import { makeFrontpageUrl } from "decorator-shared/urls";
import { Hono } from "hono";
import { serveStatic } from "hono/bun";
import { HTTPException } from "hono/http-exception";
import { cspDirectives } from "./content-security-policy";
import { clientEnv, env } from "./env/server";
import { authHandler } from "./handlers/auth-handler";
import { headers } from "./handlers/headers";
import { searchHandler } from "./handlers/search-handler";
import { versionProxyHandler } from "./handlers/version-proxy";
import i18n from "./i18n";
import { getMainMenuLinks, mainMenuContextLinks } from "./menu/main-menu";
import { setupMocks } from "./mocks";
import { archiveNotification } from "./notifications";
import { fetchOpsMessages } from "./ops-msgs";
import renderIndex from "./render-index";
import { getTaskAnalyticsConfig } from "./task-analytics-config";
import { texts } from "./texts";
import { getFeatures } from "./unleash";
import { validParams } from "./validateParams";
import { csrAssets } from "./views";
import { MainMenu } from "./views/header/main-menu";
import { Header } from "./views/header/header";
import { Footer } from "./views/footer/footer";
import { Scripts } from "./views/scripts";

const startupTime = Date.now();

const app = new Hono({
    strict: false,
});

if (env.NODE_ENV === "development" || env.IS_LOCAL_PROD) {
    console.log("Setting up mocks");
    setupMocks();
    app.get(
        "/mockServiceWorker.js",
        serveStatic({ path: "./public/mockServiceWorker.js" }),
    );
    app.get("/api/oauth2/session", async ({ req }) => fetch(req.url));
    app.get("/api/oauth2/session/refresh", async ({ req }) => fetch(req.url));
}

app.use(headers);

if (!process.env.IS_INTERNAL_APP) {
    app.use(versionProxyHandler);
}

app.get("/public/assets/*", serveStatic({}));

app.get("/api/isAlive", ({ text }) => text("OK"));
app.get("/api/isReady", ({ text }) => text("OK"));
app.get("/api/version", ({ json }) =>
    json({ versionId: env.VERSION_ID, started: startupTime }),
);
app.get("/api/ta", async ({ json }) => {
    const result = await getTaskAnalyticsConfig();
    if (result.ok) {
        return json(result.data);
    } else {
        throw new HTTPException(500, {
            message: result.error.message,
            cause: result.error,
        });
    }
});
app.post("/api/notifications/:id/archive", async ({ req, json }) => {
    const result = await archiveNotification({
        cookie: req.header("cookie") ?? "",
        id: req.param("id"),
    });
    if (result.ok) {
        return json(result.data);
    } else {
        throw new HTTPException(500, {
            message: result.error.message,
            cause: result.error,
        });
    }
});
app.get("/api/search", async ({ req, html }) =>
    html(
        await searchHandler({
            ...validParams(req.query()),
            query: req.query("q") ?? "",
        }),
    ),
);
app.get("/api/csp", ({ json }) => json(cspDirectives));
app.get("/main-menu", async ({ req, html }) => {
    const data = validParams(req.query());

    return html(
        MainMenu({
            title:
                data.context === "privatperson"
                    ? i18n("how_can_we_help")
                    : i18n(data.context),
            frontPageUrl: makeFrontpageUrl({
                context: data.context,
                language: data.language,
                baseUrl: env.XP_BASE_URL,
            }),
            links: await getMainMenuLinks({
                language: data.language,
                context: data.context,
            }),
            contextLinks: mainMenuContextLinks({
                context: data.context,
                language: data.language,
                bedrift: data.bedrift,
            }),
        }).render(data),
    );
});
app.get("/auth", async ({ req, json }) =>
    json(
        await authHandler({
            params: validParams(req.query()),
            cookie: req.header("Cookie") ?? "",
        }),
    ),
);
app.get("/ops-messages", async ({ json }) => json(await fetchOpsMessages()));
app.get("/header", async ({ req, html }) => {
    const data = validParams(req.query());
    return html(Header({ params: data, withContainers: false }).render(data));
});
app.get("/footer", async ({ req, html }) => {
    const data = validParams(req.query());
    return html(
        (
            await Footer({
                features: getFeatures(),
                params: data,
                withContainers: false,
            })
        ).render(data),
    );
});
app.get("/ssr", async ({ req, json }) => {
    const params = validParams(req.query());
    const features = getFeatures();

    return json({
        header: Header({
            params,
            withContainers: true,
        }).render(params),
        footer: (
            await Footer({
                params,
                features,
                withContainers: true,
            })
        ).render(params),
        scripts: Scripts({ features, params }),
    });
});
app.get("/env", async ({ req, json }) => {
    const params = validParams(req.query());
    const features = getFeatures();

    return json({
        header: Header({
            params,
            withContainers: true,
        }).render(params),
        footer: (
            await Footer({
                params,
                features,
                withContainers: true,
            })
        ).render(params),
        data: {
            texts: Object.entries(texts[params.language])
                .filter(([key]) => clientTextsKeys.includes(key as any))
                .reduce(
                    (prev, [key, value]) => ({
                        ...prev,
                        [key]: value,
                    }),
                    {},
                ),
            params,
            features,
            env: clientEnv,
        },
        scripts: csrAssets.mainScriptsProps,
        //TODO: Add css?
    });
});
app.get("/:clientWithId{client(.*).js}", async ({ redirect }) =>
    redirect(csrAssets.csrScriptUrl),
);
app.get("/css/:clientWithId{client(.*).css}", async ({ redirect }) =>
    redirect(csrAssets.cssUrl),
);
app.get("/", async ({ req, html }) => {
    return html(
        await renderIndex({
            params: validParams(req.query()),
            url: req.url,
        }),
    );
});

app.route("/decorator-next", app);
app.route("/dekoratoren", app);
app.route("/common-html/v4/navno", app);

export default {
    ...app,
    port: Number(process.env.PORT) || 8089,
} satisfies Partial<Server>;
