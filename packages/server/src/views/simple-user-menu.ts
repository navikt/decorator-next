import cls from "decorator-client/src/styles/simple-user-menu.module.css";
import html from "decorator-shared/html";
import { LeaveIcon } from "decorator-icons";
import i18n from "../i18n";
import { HeaderButton } from "./components/header-button";

export type SimpleUserMenuProps = {
    name: string;
    logoutUrl: string;
};

export const SimpleUserMenu = ({ name, logoutUrl }: SimpleUserMenuProps) =>
    html`<div class="${cls.simpleUserMenu}">
        <span class="${cls.name}">
            <b>${i18n("logged_in")}:</b>
            <span>${name}</span>
        </span>
        ${HeaderButton({
            content: i18n("logout"),
            icon: LeaveIcon(),
            href: logoutUrl,
        })}
    </div>`;
