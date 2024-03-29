import html from 'decorator-shared/html';
import debounce from 'lodash.debounce';
import cls from '../styles/search-form.module.css';

class SearchMenu extends HTMLElement {
    form: HTMLFormElement | null = null;
    input: HTMLInputElement | null = null;
    parentDropdown: HTMLInputElement | null = null;
    hits: HTMLElement;

    constructor() {
        super();
        this.hits = document.createElement('div');
    }

    clearSearch = () => {
        this.hits.remove();
        if (this.input) {
            this.input.value = '';
        }
    };

    focus = () => this.input?.focus();

    connectedCallback() {
        this.form = this.querySelector(`.${cls.searchForm}`);
        this.input = this.querySelector(`.${cls.searchInput}`);
        this.parentDropdown = this.closest('dropdown-menu');

        if (this.getAttribute('data-auto-focus') !== null) {
            this.parentDropdown?.addEventListener('menuopened', this.focus);
        }

        this.parentDropdown?.addEventListener('menuclosed', this.clearSearch);

        this.addEventListener('clearsearch', this.clearSearch);

        this.form?.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.assign(`${window.location.origin}/sok?ord=${this.input?.value}`);
        });

        const fetchSearch = (query: string) => {
            const url = `${window.__DECORATOR_DATA__.env.APP_URL}/api/search?${Object.entries({
                language: window.__DECORATOR_DATA__.params.language,
                q: query,
            })
                .map(([key, value]) => `${key}=${value}`)
                .join('&')}`;

            window.analyticsEvent({
                eventName: 'søk',
                destination: url,
                category: 'dekorator-header',
                label: query,
                action: 'søk-dynamisk',
            });

            return fetch(url)
                .then((res) => res.text())
                .then((text) => {
                    if (this.input?.value === query) {
                        this.hits.innerHTML = text;
                    }
                });
        };

        const fetchSearchDebounced = debounce(fetchSearch, 500);

        this.input?.addEventListener('input', (e) => {
            const { value } = e.target as HTMLInputElement;
            if (value.length > 2) {
                this.append(this.hits);
                this.hits.innerHTML = html`<decorator-loader title="${window.__DECORATOR_DATA__.texts.loading_preview}" />`.render();

                fetchSearchDebounced(value);
            } else {
                this.hits.remove();
            }
        });
    }

    disconnectedCallback() {
        if (this.getAttribute('data-auto-focus') !== null) {
            this.parentDropdown?.removeEventListener('menuopened', this.focus);
        }

        this.parentDropdown?.removeEventListener('menuclosed', this.clearSearch);
    }
}

customElements.define('search-menu', SearchMenu);
