import { Breadcrumb } from '../params';
import html from '../html';
import cls from './breadcrumbs.module.css';
import { ForwardChevron } from './icons';
import { HomeIcon } from './icons/home';
import { LenkeMedSporing } from 'decorator-shared/views/lenke-med-sporing-helpers';
import { isNavUrl } from '../utils';

const analyticsEventArgs = {
    category: 'dekorator-header',
    komponent: 'brødsmule',
} as const;

export type BreadcrumbsProps = {
    breadcrumbs: Breadcrumb[];
};

export const validateBreadcrumbs = (breadcrumbs: Breadcrumb[]) => {
    breadcrumbs.forEach((breadcrumb) => {
        if (!breadcrumb.title) {
            const error = 'breadcrumbs.title supports string';
            throw Error(error);
        }
        if (!breadcrumb.url) {
            const error = 'breadcrumbs.url supports string';
            throw Error(error);
        }
        if (!isNavUrl(breadcrumb.url)) {
            const error = `breadcrumbs.url supports only nav.no urls - failed to validate ${breadcrumb.url}`;
            throw Error(error);
        }
    });
};

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) => {
    validateBreadcrumbs(breadcrumbs);

    return breadcrumbs.length > 0
        ? html`
              <ol class="${cls.list}">
                  <li class="${cls.listItem}">
                      ${LenkeMedSporing({
                          href: '/',
                          analyticsEventArgs: {
                              ...analyticsEventArgs,
                              action: 'nav.no',
                          },
                          children: html`
                              ${HomeIcon({ className: cls.svg })}
                              <span class="${cls.span}">nav.no</span>
                          `,
                          className: cls.link,
                      })}
                      ${ForwardChevron()}
                  </li>
                  ${breadcrumbs.map(
                      ({ title, url, handleInApp }, index) => html`
                          <li class="${cls.listItem}">
                              ${index === breadcrumbs.length - 1
                                  ? title
                                  : html`
                                        <d-breadcrumb
                                            data-analytics-event-args="${JSON.stringify({
                                                ...analyticsEventArgs,
                                                label: '[redacted]',
                                                action: '[redacted]',
                                            })}"
                                            ${handleInApp && 'data-handle-in-app'}
                                            class="${cls.link}"
                                            href="${url}"
                                        >
                                            ${title}
                                        </d-breadcrumb>
                                    `}
                              ${index === breadcrumbs.length - 1 ? '' : ForwardChevron()}
                          </li>
                      `
                  )}
              </ol>
          `
        : null;
};
