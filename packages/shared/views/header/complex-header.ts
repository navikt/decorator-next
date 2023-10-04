import html from 'decorator-shared/html';
import cls from 'decorator-shared/utilities.module.css';
import { Breadcrumbs } from 'decorator-shared/views/breadcrumbs';
import { HeaderMenuLinkCols, HeaderMenuLinks } from './header-menu-links';
import LanguageSelector from 'decorator-shared/views/language-selector';
import { BackChevron } from 'decorator-shared/views/icons/back-chevron';
import { HeaderProps, utilsBackgroundClasses } from './index';
import { ComplexHeaderNavbarItems } from './navbar-items/complex-header-navbar-items';

import classes from 'decorator-client/src/styles/header.module.css';
import clsx from 'clsx';
import { HeaderContextLenke } from './lenke';

export function ComplexHeader({
  isNorwegian,
  contextLinks,
  headerMenuLinks,
  texts,
  innlogget,
  breadcrumbs,
  utilsBackground,
  context: activeContext,
  availableLanguages,
  myPageMenu,
}: HeaderProps) {
  return html`
    <div id="header-withmenu">
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
            <img src="/public/ikoner/meny/nav-logo-red.svg" alt="NAV" />
            <div
              id="arbeidsflate"
            >

              ${
                isNorwegian &&
                contextLinks?.map((link) =>
                  HeaderContextLenke({
                    link: link,
                    text: texts[link.lenkeTekstId],
                    activeContext: activeContext,
                    classNameOverride: clsx([
                      classes.headerContextLink,
                      {
                        [classes.lenkeActive]: link.context === activeContext,
                      },
                    ]),
                    containerClassName: classes.headerContextLinkContainer,
                    attrs: [['data-context', link.context.toLowerCase()]],
                  }),
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
              cols: headerMenuLinks.length as HeaderMenuLinkCols,
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
    </div>
  `;
}

// ${
//         isNorwegian &&
//         contextLinks?.map(
//           ({ context, lenkeTekstId, url }) => html`
//             <button
//               class="${clsx([
//                 classes.headerContextLink,
//               ], {
//               [classes.lenkeActive]: context === activeContext,
//               })}"
//               href="${url}"
//               data-context="${context.toLowerCase()}"
//             >
//               ${texts[lenkeTekstId]}
//             </button>
//           `,
//         )
//       }
