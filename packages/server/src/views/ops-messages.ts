import ExclamationmarkTriangle from '@navikt/aksel-icons/svg/ExclamationmarkTriangleFill.svg';
import InformationSquareFill from '@navikt/aksel-icons/svg/InformationSquareFill.svg';
import cls from 'decorator-client/src/styles/ops-messages.module.css';
import html, { svgIcon } from 'decorator-shared/html';
import { OpsMessage } from 'decorator-shared/types';

export type OpsMessagesProps = {
  opsMessages: OpsMessage[];
};

export const OpsMessages = ({ opsMessages }: OpsMessagesProps) => html`
  ${opsMessages.map(
    ({ heading, url, type }) =>
      html`<a
        is="lenke-med-sporing"
        data-analytics-event-args="${JSON.stringify({
          category: 'dekorator-header',
          action: 'driftsmeldinger',
        })}"
        href="${url}"
        class="${cls.opsMessage}"
      >
        ${svgIcon(
          type === 'prodstatus'
            ? ExclamationmarkTriangle
            : InformationSquareFill,
        )}
        <span>${heading}</span>
      </a>`,
  )}
`;
