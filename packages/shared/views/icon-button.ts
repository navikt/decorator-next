import cls from "decorator-client/src/styles/icon-button.module.css";
import html, { Template } from "../html";

export function IconButton({
    Icon,
    id,
    text,
    className,
}: {
    Icon: Template;
    id?: string;
    text: Template | string;
    className?: string;
}) {
    return html`
        <button
            ${id && html`id="${id}"`}
            class="${cls.iconButton} ${className}"
        >
            ${Icon}
            <span class="${cls.iconButtonSpan}">${text}</span>
        </button>
    `;
}
