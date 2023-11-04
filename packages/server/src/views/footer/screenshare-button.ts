import Monitor from '@navikt/aksel-icons/svg/Monitor.svg';
import cls from 'decorator-client/src/styles/screenshare-button.module.css';
import html, { svgIcon } from 'decorator-shared/html';

export const ScreenshareButton = (text: string) =>
  html`<button is="screenshare-button" class="${cls.screenshareButton}">
    ${text} ${svgIcon(Monitor)}
  </button>`;
