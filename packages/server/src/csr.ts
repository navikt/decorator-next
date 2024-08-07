import { buildCdnUrl } from "./urls";
import { getCSSUrl } from "./views/styles";
import { scriptsProps } from "./views/scripts";

const getCSRScriptUrl = async () => {
    const csrManifest = (
        await import("decorator-client/dist/.vite/csr.manifest.json")
    ).default;

    return buildCdnUrl(csrManifest["src/csr.ts"].file);
};

export const csrAssets = {
    cssUrl: await getCSSUrl(),
    csrScriptUrl: await getCSRScriptUrl(),
    mainScripts: scriptsProps,
} as const;
