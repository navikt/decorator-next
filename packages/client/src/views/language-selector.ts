import { languageSchema } from "./../../../shared/params";
import { AvailableLanguage, Language } from "decorator-shared/params";
import { CustomEvents } from "../events";
import { param, updateDecoratorParams } from "../params";
import cls from "../styles/language-selector.module.css";
import utils from "../styles/utils.module.css";
import { defineCustomElement } from "./custom-elements";

class LanguageButton extends HTMLElement {
    #language?: Language;

    // TODO: handleError
    private handleError() {}

    connectedCallback() {
        this.#language = param("language");

        const option = this?.querySelector("button");
        if (!option) {
            return;
        }

        const optionLanguage = this.getAttribute("data-locale") as Language;
        if (!optionLanguage) {
            return;
        }

        option.classList.toggle(
            cls.selected,
            optionLanguage === this.#language,
        );

        option.addEventListener("click", (e) => {
            e.preventDefault();

            updateDecoratorParams({ language: optionLanguage });
            window.postMessage({
                source: "decorator",
                event: "languageSelect",
                payload: optionLanguage,
            });
        });
    }
}

defineCustomElement("language-button", LanguageButton);

export class LanguageSelector extends HTMLElement {
    menu!: HTMLElement;
    container!: HTMLDivElement;
    #open = false;
    options: (HTMLAnchorElement | HTMLButtonElement)[] = [];
    #language?: Language;
    #handleInApp = false;

    set language(language: Language) {
        this.#language = language;
    }

    set availableLanguages(availableLanguages: AvailableLanguage[]) {
        this.#handleInApp = availableLanguages[0].handleInApp;
    }

    connectedCallback() {
        const menu = this?.querySelector("ul");
        if (!menu) {
            return;
        }

        this.menu = menu;

        const button = this.querySelector(
            `.${cls.button}`,
        ) as HTMLButtonElement;
        button.addEventListener("click", () => {
            this.open = !this.#open;
        });
        button.addEventListener("blur", this.onBlur);

        this.addEventListener("keyup", (e) => {
            if (e.key === "Escape") {
                this.open = false;
            }
        });

        window.addEventListener("paramsupdated", this.handleParamsUpdated);
        this.language = param("language");
        this.availableLanguages = param("availableLanguages");
    }

    disconnectedCallback() {
        window.removeEventListener("paramsupdated", this.handleParamsUpdated);
    }

    handleParamsUpdated = (
        event: CustomEvent<CustomEvents["paramsupdated"]>,
    ) => {
        if (event.detail.params.language) {
            this.language = event.detail.params.language;
        }
        if (event.detail.params.availableLanguages) {
            this.availableLanguages = event.detail.params.availableLanguages;
        }
    };

    onBlur = (e: FocusEvent) => {
        if (
            e.relatedTarget === null ||
            !this.contains(e.relatedTarget as Node)
        ) {
            this.open = false;
        }
    };

    set open(open: boolean) {
        this.#open = open;
        this.menu.classList.toggle(utils.hidden, !open);
    }
}

defineCustomElement("language-selector", LanguageSelector);
