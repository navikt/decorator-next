import { UtilsBackground } from 'decorator-shared/params';
import { Breadcrumbs } from 'decorator-shared/views/breadcrumbs';
import cls from '../styles/decorator-utils.module.css';

import { LanguageSelector } from './language-selector';

class DecoratorUtils extends HTMLElement {
  languageSelector: LanguageSelector;
  breadbrumbs: HTMLElement;

  constructor() {
    super();

    this.languageSelector = this.querySelector(
      'language-selector',
    ) as LanguageSelector;
    console.log('----START----')
    console.log(this.languageSelector)
    console.log('----END----')
    this.breadbrumbs = this.querySelector(
      'nav[is="d-breadcrumbs"]',
    ) as HTMLElement;
  }

  update = () => {
    const { availableLanguages, language, breadcrumbs, utilsBackground } =
      window.__DECORATOR_DATA__.params;

    this.classList.toggle(
      cls.hidden,
      availableLanguages.length === 0 && breadcrumbs.length === 0,
    );
    this.utilsBackground = utilsBackground;

    this.languageSelector.availableLanguages = availableLanguages;
    this.languageSelector.language = language;
    this.breadbrumbs.innerHTML = Breadcrumbs({ breadcrumbs })?.render() ?? '';
  };

  set utilsBackground(utilsBackground: UtilsBackground) {
    this.classList.toggle(cls.white, utilsBackground === 'white');
    this.classList.toggle(cls.gray, utilsBackground === 'gray');
  }

  connectedCallback() {
    window.addEventListener('paramsupdated', this.update);
    setTimeout(this.update, 0);
  }

  disconnectedCallback() {
    window.removeEventListener('paramsupdated', this.update);
  }
}

customElements.define('decorator-utils', DecoratorUtils);
