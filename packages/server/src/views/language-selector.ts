import { AvailableLanguage } from "./../../../shared/params";
import clsx from "clsx";
import cls from "decorator-client/src/styles/language-selector.module.css";
import utils from "decorator-client/src/styles/utils.module.css";
import { ChevronDownIcon, GlobeIcon } from "decorator-icons";
import html from "decorator-shared/html";
import { AvailableLanguage } from "decorator-shared/params";
import i18n from "../i18n";

export type LanguageSelectorProps = {
    availableLanguages: AvailableLanguage[];
};

const optionTextContent = {
    nb: "Norsk (bokmål)",
    nn: "Norsk (nynorsk)",
    en: "English",
    se: "Sámegiel (samisk)",
    pl: "Polski (polsk)",
    uk: "Українська (ukrainsk)",
    ru: "Русский (russisk)",
};

const LanguageOption = ({ handleInApp, locale, url }: AvailableLanguage) =>
    !handleInApp
        ? html` <language-button data-locale="${locale}"
              ><button class="${cls.option}">
                  ${optionTextContent[locale]}
              </button></language-button
          >`
        : html` <language-option
              ><a class="${cls.option}" href="${url}"
                  >${optionTextContent[locale]}</a
              ></language-option
          >`;

export const LanguageSelector = ({
    availableLanguages,
}: LanguageSelectorProps) => html`
    <language-selector>
        <nav
            class="${clsx(cls.languageSelector, {
                [utils.hidden]: availableLanguages.length === 0,
            })}"
            aria-label="${i18n("language_selector")}"
        >
            <button type="button" class="${cls.button}">
                ${GlobeIcon({ className: utils.icon })}
                <span class="${cls.label}">
                    <span lang="nb">Språk</span>/<span lang="en">Language</span>
                </span>
                ${ChevronDownIcon({ className: utils.icon })}
            </button>
            ${availableLanguages &&
            html`<ul class="${clsx(cls.menu, utils.hidden)}">
                ${availableLanguages.map(
                    (language) => html`<li>${LanguageOption(language)}</li>`,
                )}
            </ul>`}
        </nav>
    </language-selector>
`;
