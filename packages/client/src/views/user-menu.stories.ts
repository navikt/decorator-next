import type { Meta, StoryObj } from "@storybook/html";
import "./user-menu";
import { createEvent } from "../events";
import { UserMenuDropdown } from "../../../server/src/views/header/user-menu-dropdown";
import { LoginButton } from "decorator-shared/views/login-button";
import i18n from "../i18n";

const meta: Meta = {
    title: "header/user-menu-client",
    tags: ["autodocs"],
    render: ({ timeout, authenticated }, context) => {
        const wrapper = document.createElement("div");
        wrapper.style.minHeight = "44px";
        wrapper.style.width = "200px";
        wrapper.style.display = "flex";
        wrapper.style.alignItems = "center";
        wrapper.style.justifyContent = "end";
        wrapper.innerHTML = "<user-menu></user-menu>";

        if (timeout) {
            setTimeout(() => {
                window.dispatchEvent(
                    createEvent("authupdated", {
                        detail: {
                            auth: { authenticated },
                            usermenuHtml: authenticated
                                ? UserMenuDropdown({
                                      name: "Charlie Jensen",
                                      notifications: null,
                                      level: `Level3`,
                                      loginUrl: "/login",
                                      logoutUrl: "/logout",
                                      minsideUrl: "/minside",
                                      personopplysningerUrl:
                                          "/personopplysninger",
                                  }).render({
                                      language: context.globals.locale,
                                  })
                                : LoginButton(i18n("login")).render({
                                      language: context.globals.locale,
                                  }),
                        },
                    }),
                );
            }, timeout);
        }

        // window.__DECORATOR_DATA__ = {
        //     params: { chatbot: true, chatbotVisible: true },
        //     features: { ["dekoratoren.chatbotscript"]: true },
        //     env: { ENV: "prod" },
        // } as any;

        return wrapper;
    },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {};

export const SlowLoggedIn: Story = {
    args: { timeout: 3000, authenticated: true },
};

export const FastLoggedIn: Story = {
    args: { timeout: 500, authenticated: true },
};

export const SlowLoggedOut: Story = {
    args: { timeout: 3000, authenticated: false },
};

export const FastLoggedOut: Story = {
    args: { timeout: 500, authenticated: false },
};
