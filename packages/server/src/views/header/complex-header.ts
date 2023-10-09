import html from 'decorator-shared/html';
import {
  AvailableLanguage,
  Breadcrumb,
  UtilsBackground,
} from 'decorator-shared/params';
import { Node, Texts } from 'decorator-shared/types';
import cls from 'decorator-shared/utilities.module.css';
import { Breadcrumbs } from 'decorator-shared/views/breadcrumbs';
import { HeaderMenuLinks } from 'decorator-shared/views/header/header-menu-links';
import { ComplexHeaderNavbarItems } from 'decorator-shared/views/header/navbar-items/complex-header-navbar-items';
import { BackChevron } from 'decorator-shared/views/icons/back-chevron';
import LanguageSelector from 'decorator-shared/views/language-selector';

const utilsBackgroundClasses = {
  white: 'decorator-utils-container_white',
  gray: 'decorator-utils-container_gray',
  transparent: 'decorator-utils-container_transparent',
  '': '',
};

export type ComplexHeaderProps = {
  isNorwegian: boolean;
  mainMenu?: Node[];
  texts: Texts;
  headerMenuLinks?: Node[];
  innlogget: boolean;
  breadcrumbs: Breadcrumb[];
  utilsBackground: UtilsBackground;
  availableLanguages: AvailableLanguage[];
  myPageMenu?: Node[];
};

export function ComplexHeader({
  isNorwegian,
  mainMenu,
  headerMenuLinks,
  texts,
  innlogget,
  breadcrumbs,
  utilsBackground,
  availableLanguages,
  myPageMenu,
}: ComplexHeaderProps) {
  return html`
      <div
        id="menu-background"
      ></div>
      <header
        class="siteheader"
      >
        <div
          class="hovedmeny-wrapper ${cls.contentContainer}"
        >
          <div class="hovedmeny-content">
            <a href="https://www.nav.no/"><img src="/public/ikoner/meny/nav-logo-red.svg" alt="NAV" /></a>
            <div
              id="arbeidsflate"
            >
              ${
                isNorwegian &&
                mainMenu.map(
                  ({ displayName, isActive }) => html`
                    <button
                      class="context-link ${isActive ? 'lenkeActive' : ''}"
                      href="?context=${displayName.toLowerCase()}"
                      data-context="${displayName.toLowerCase()}"
                    >
                      ${displayName}
                    </button>
                  `,
                )
              }
            </div>
          </div>
          ${ComplexHeaderNavbarItems({
            innlogget,
            texts,
            myPageMenu,
          })}
        <div
          id="menu" class="${cls.contentContainer}"
        >
         <div class="menu-top">
            <h2>
              Hva kan vi hjelpe deg med?
            </h2>
            <a
              class="link"
              href="#"
              >Til forsiden</a
            >
          </div>
            <div id="sub-menu-content">
            <div id="mobil-lukk">
            ${BackChevron()}
            <span>Tilbake til oversikt</span>
            </div>
            <ul></ul>
            </div>
            <div id="menu-content">
            <div id="inline-search">
                <inline-search></inline-search>
            </div>
            <decorator-loader id="search-loader"></decorator-loader>
            <div id="header-menu-links">
            ${HeaderMenuLinks({
              headerMenuLinks,
            })}
            </div>
          </div>
        </div>
      </header>
      <div class="decorator-utils-container ${
        utilsBackgroundClasses[utilsBackground]
      }">
        ${Breadcrumbs({ breadcrumbs })}
        ${LanguageSelector({ availableLanguages })}
      </div>
  `;
}
