import clsx from 'clsx';
import cls from 'decorator-client/src/views/decorator-utils.module.css';
import html from 'decorator-shared/html';
import {
  AvailableLanguage,
  Breadcrumb,
  UtilsBackground,
} from 'decorator-shared/params';
import utilsCls from 'decorator-shared/utilities.module.css';
import { Breadcrumbs } from 'decorator-shared/views/header/decorator-utils-container/breadcrumbs';
import { LanguageSelector } from './language-selector';

export type DecoratorUtilsProps = {
  breadcrumbs: Breadcrumb[];
  availableLanguages: AvailableLanguage[];
  utilsBackground: UtilsBackground;
};

export const DecoratorUtils = ({
  breadcrumbs,
  availableLanguages,
  utilsBackground,
}: DecoratorUtilsProps) =>
  html`<decorator-utils
    class="${clsx(utilsCls.contentContainer, cls.decoratorUtils, {
      [cls.white]: utilsBackground === 'white',
      [cls.gray]: utilsBackground === 'gray',
    })}"
  >
    <nav is="d-breadcrumbs">${Breadcrumbs({ breadcrumbs })}</nav>
    ${LanguageSelector({ availableLanguages })}
  </decorator-utils>`;
