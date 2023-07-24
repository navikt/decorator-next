"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mustache_express_1 = __importDefault(require("mustache-express"));
const params_1 = require("./params");
const utils_1 = require("./utils");
const app = (0, express_1.default)();
app.engine("mustache", (0, mustache_express_1.default)());
app.set("view engine", "mustache");
app.set("views", `${__dirname}/views`);
app.use("/public", express_1.default.static("public"));
app.use((req, res, next) => {
    const result = (0, params_1.parseParams)(req.query);
    if (result.success) {
        req.decorator = result.data;
    }
    // req.decorator = parseParams(req.query);
    next();
});
function getContextKey(context) {
    return (0, utils_1.capitalizeFirstLetter)(context);
}
const getTexts = async (params) => {
    var _a, _b, _c, _d;
    const contextKey = getContextKey(params.context);
    const get = (node, path) => {
        if (path.includes(".")) {
            return path
                .split(".")
                .reduce((prev, curr) => get(prev, curr), node);
        }
        return node.children.find(({ displayName }) => displayName === path);
    };
    const texts = {
        nb: {
            share_screen: "Del skjerm med veileder",
            to_top: "Til toppen",
            menu: "Meny",
            close: "Lukk",
        },
        en: {
            share_screen: "Share screen with your counsellor",
            to_top: "To the top",
            menu: "Menu",
            close: "Close",
        },
        se: {
            share_screen: "Del skjerm med veileder",
            to_top: "Til toppen",
            menu: "Meny",
            close: "Lukk",
        },
    };
    const menu = {
        children: await fetch("https://www.nav.no/dekoratoren/api/meny").then((response) => response.json()),
        displayName: "",
    };
    const key = {
        en: "en.Footer.Columns",
        se: "se.Footer.Columns",
        nb: `no.Footer.Columns.${contextKey}`,
        "": `no.Footer.Columns.${contextKey}`,
    };
    const footerLinks = (_a = get(menu, key[params.language])) === null || _a === void 0 ? void 0 : _a.children;
    const mainMenu = (_b = get(menu, "no.Header.Main menu")) === null || _b === void 0 ? void 0 : _b.children;
    const personvern = (_c = get(menu, "no.Footer.Personvern")) === null || _c === void 0 ? void 0 : _c.children;
    const headerMenuLinks = (_d = get(menu, "no.Header.Main menu." + (0, utils_1.capitalizeFirstLetter)(params.context))) === null || _d === void 0 ? void 0 : _d.children;
    return Object.assign({ footerLinks, mainMenu: mainMenu === null || mainMenu === void 0 ? void 0 : mainMenu.map((contextLink) => {
            return Object.assign({ styles: contextLink.displayName.toLowerCase() === params.context
                    ? "font-bold border-[#3386e0]"
                    : "border-transparent hover:border-gray-300 text-color-gray-700", context: contextLink.displayName.toLowerCase() }, contextLink);
        }), personvern,
        headerMenuLinks }, texts[params.language]);
};
app.use("/footer", async (req, res) => {
    const params = (0, params_1.parseParams)(req.query);
    if (params.success) {
        res.render("footer", Object.assign({ simple: params.data.simple, innlogget: false }, (await getTexts(params.data))));
    }
    else {
        res.status(400).send(params.error);
    }
});
app.use("/header", async (req, res) => { });
app.use("/", async (req, res) => {
    const params = (0, params_1.parseParams)(req.query);
    if (params.success) {
        res.render("index", Object.assign({ simple: params.data.simple, lang: { [params.data.language]: true }, breadcrumbs: params.data.breadcrumbs.map((b, i, a) => (Object.assign(Object.assign({}, b), { last: a.length - 1 === i }))) }, (await getTexts(params.data))));
    }
    else {
        res.status(400).send(params.error);
    }
});
app.listen(3000, function () {
    console.log("Server started");
});
