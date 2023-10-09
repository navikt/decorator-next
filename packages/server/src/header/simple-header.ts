import type {
  AvailableLanguage,
  Breadcrumb,
  UtilsBackground,
} from 'decorator-shared/params';
import html from 'decorator-shared/html';
import cls from 'decorator-shared/utilities.module.css';
import { Texts } from 'decorator-shared/types';
import { Breadcrumbs } from 'decorator-shared/views/breadcrumbs';
import LanguageSelector from 'decorator-shared/views/language-selector';
import { utilsBackgroundClasses } from '.';
import { SimpleHeaderNavbarItems } from 'decorator-shared/views/header/navbar-items/simple-header-navbar-items';

export function SimpleHeader({
  availableLanguages,
  breadcrumbs,
  utilsBackground,
  innlogget,
  texts,
}: {
  texts: Texts;
  innlogget: boolean;
  availableLanguages: AvailableLanguage[];
  breadcrumbs: Breadcrumb[];
  utilsBackground: UtilsBackground;
}) {
  return html`
    <div id="menu-background"></div>
    <header class="siteheader">
      <div class="hovedmeny-wrapper ${cls.contentContainer}">
        <div class="hovedmeny-content">
          <a href="https://www.nav.no/"
            ><img src="/public/ikoner/meny/nav-logo-black.svg" alt="NAV"
          /></a>
        </div>
        ${SimpleHeaderNavbarItems({
          innlogget,
          texts,
          name: '',
        })}
      </div>
    </header>
    <div
      class="decorator-utils-container ${utilsBackgroundClasses[
        utilsBackground
      ]}"
    >
      <!-- ${Breadcrumbs({ breadcrumbs })} -->
      ${LanguageSelector({ availableLanguages })}
    </div>
  `;
}
