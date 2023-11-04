import XMark from '@navikt/aksel-icons/svg/XMark.svg';
import cls from 'decorator-client/src/styles/search-form.module.css';
import html, { svgIcon } from 'decorator-shared/html';
import { Texts } from 'decorator-shared/types';
import { SearchIcon } from 'decorator-shared/views/icons/search';

export type SearchFormProps = {
  texts: Texts;
};

export const SearchForm = ({ texts }: SearchFormProps) => {
  const id = `search-${Math.random()}`;

  return html`<form class="${cls.searchForm}">
    <label class="${cls.label}" for="${id}">${texts.search_nav_no}</label>
    <div class="${cls.searchWrapper}">
      <search-input class="${cls.searchWrapperInner}">
        <input
          class="${cls.searchInput}"
          type="text"
          name="search"
          id="${id}"
        />
        <button type="button" class="${cls.clear}">${svgIcon(XMark)}</button>
      </search-input>
      <button class="${cls.submit}">${SearchIcon({})}</button>
    </div>
  </form>`;
};
