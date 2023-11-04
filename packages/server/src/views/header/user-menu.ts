import Bagde from '@navikt/aksel-icons/svg/Bagde.svg';
import Leave from '@navikt/aksel-icons/svg/Leave.svg';
import PadlockLocked from '@navikt/aksel-icons/svg/PadlockLocked.svg';
import PersonCircle from '@navikt/aksel-icons/svg/PersonCircle.svg';
import cls from 'decorator-client/src/styles/user-menu.module.css';
import html, { svgIcon } from 'decorator-shared/html';
import { LoginLevel } from 'decorator-shared/params';
import { Texts } from 'decorator-shared/types';
import { Alert } from 'decorator-shared/views/alert';
import { Notification, Notifications } from '../notifications/notifications';

export type UserMenuProps = {
  texts: Texts;
  name?: string;
  notifications?: Notification[];
  level: LoginLevel;
};

export const UserMenu = ({
  texts,
  name,
  level,
  notifications,
}: UserMenuProps) =>
  html`<div class="${cls.userMenu}">
    <div class="${cls.menuItems}">
      <div class="${cls.menuHeader}">
        <div class="${cls.loggedIn}">${texts.logged_in}</div>
        <div class="${cls.name}">${name}</div>
        ${level !== 'Level4' &&
        Alert({
          className: cls.alert,
          variant: 'info',
          content: html`
            <div>
              ${texts.security_level_info}
              <a href="#TODO">Logg inn med BankID, Buypass, eller Commfides</a>
            </div>
          `,
        })}
      </div>
      <a href="#TODO" class="${cls.menuItem}">
        ${svgIcon(PersonCircle, cls.menuItemIcon)}
        <span>Min side</span>
      </a>
      <a href="#TODO" class="${cls.menuItem}">
        ${svgIcon(level === 'Level4' ? Bagde : PadlockLocked)}
        <span>Personopplysninger</span>
      </a>
    </div>
    <div class="${cls.notifications}">
      ${Notifications({ texts, notifications })}
    </div>
    <a href="#TODO" class="${cls.menuItem} ${cls.logout}">
      ${svgIcon(Leave)}
      <span>Logg ut</span>
    </a>
  </div>`;
