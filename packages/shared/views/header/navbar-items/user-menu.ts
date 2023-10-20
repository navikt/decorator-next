import { LinkGroup, Texts } from '../../../types';
import html from 'decorator-shared/html';
import cls from './logged-in-menu.module.css';

export type UserMenuProps = {
  name: string;
  links: LinkGroup[];
  texts: Texts;
};

export const UserMenu = ({ name, texts }: UserMenuProps) => html`
  <div class="${cls.userMenu}">
    <div class="${cls.userMenuHeader}">
      <div>
        <h2 class="${cls.myPageMenuHeading}">${texts.my_page}</h2>
        <a class="${cls.link}" href="#">${texts.to_my_page}</a>
      </div>
      <div>${texts.logged_in}: ${name}</div>
    </div>
    <div>
      Menypunkt med hengelås sender deg til ny innlogging. Disse tjenestene
      krever BankID, Buypass eller Commfides.
    </div>
    HeaderMenuLinks({ headerMenuLinks: links })
  </div>
`;
