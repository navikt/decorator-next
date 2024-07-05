import { Hono, HonoRequest, MiddlewareHandler } from "hono";
import { BUILD_ID_HEADER } from "decorator-shared/constants";

const serverBuildId = process.env.BUILD_ID as string;

const fetchFromBuildVersion = async (request: HonoRequest) => {
    const reqBuildId = request.query(BUILD_ID_HEADER);

    const newUrl = new URL(request.url);
    newUrl.host = `nav-dekoratoren-${reqBuildId}`;
    newUrl.protocol = "http:";
    newUrl.searchParams.set("is-proxied-req", "true");

    console.log(`New url:`, newUrl.toString());

    try {
        const response = await fetch(newUrl.toString(), {
            method: request.method,
            headers: request.raw.headers,
            body: request.raw.body,
        });

        console.log("Response:", response);
        response.headers.delete("content-encoding");

        return new Response(response.body, response);
    } catch (e) {
        console.log(`Request failed - ${e}`);
        return null;
    }
};

export const versionProxyHandler: MiddlewareHandler = async (c, next) => {
    const reqBuildId = c.req.query(BUILD_ID_HEADER);
    const isProxyReq = c.req.query("is-proxied-req");

    console.log(`${reqBuildId} - ${isProxyReq}`);

    if (!reqBuildId || reqBuildId === serverBuildId || isProxyReq) {
        return next();
    }

    console.log(
        `Not my id! Wanted ${serverBuildId} - got ${reqBuildId} - url ${c.req.url}`,
    );

    const response = await fetchFromBuildVersion(c.req);
    if (response) {
        console.log("Returning response ", response);
        return response;
    }

    return next();
};
