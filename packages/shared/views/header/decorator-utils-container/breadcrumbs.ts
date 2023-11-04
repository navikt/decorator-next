import { Breadcrumb } from '../../../params';
import html, { svgIcon } from '../../../html';
import cls from './breadcrumbs.module.css';
import { ForwardChevron } from '../../icons';
import { LenkeMedSporing } from 'decorator-shared/views/lenke-med-sporing-helpers';
import House from '@navikt/aksel-icons/svg/House.svg';

const analyticsEventArgs = {
  category: 'dekorator-header',
  komponent: 'brødsmule',
} as const;

export type BreadcrumbsProps = { breadcrumbs: Breadcrumb[] };

export const Breadcrumbs = ({ breadcrumbs }: BreadcrumbsProps) =>
  breadcrumbs.length > 0
    ? html`
        <nav id="breadcrumbs-wrapper">
          <ol class="${cls.list}">
            <li class="${cls.listItem}">
              ${LenkeMedSporing({
                href: '/',
                analyticsEventArgs: {
                  ...analyticsEventArgs,
                  action: 'nav.no',
                },
                children: html`
                  ${svgIcon(House, cls.svg)}
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
                    : LenkeMedSporing({
                        href: url as string,
                        analyticsEventArgs: {
                          ...analyticsEventArgs,
                          label: '[redacted]',
                          action: '[redacted]',
                        },
                        children: title,
                        dataHandleInApp: handleInApp,
                        className: cls.link,
                      })}
                  ${index === breadcrumbs.length - 1 || ForwardChevron()}
                </li>
              `,
            )}
          </ol>
        </nav>
      `
    : null;
