import html from '../html';
import { DecoratorId } from '../types';

export const NavLogo = ({
  title,
  className,
  id,
}: {
  title?: string;
  className?: string;
  id: DecoratorId;
}) =>
  html`<svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="20"
    fill="none"
    viewBox="0 0 64 20"
    focusable="false"
    aria-labelledby="${id}"
    role="img"
    ${className && html`class="${className}"`}
  >
    <title id="${id}">${title || 'NAV logo'}</title>
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M63.4793 0.520905H56.8203C56.8203 0.520905 56.3613 0.520905 56.199 0.926432L52.5139 12.2133L48.8318 0.926432C48.6695 0.520905 48.2079 0.520905 48.2079 0.520905H35.4043C35.1271 0.520905 34.8948 0.752508 34.8948 1.02804V4.86102C34.8948 1.82046 31.6611 0.520905 29.7675 0.520905C25.5271 0.520905 22.6886 3.31523 21.8047 7.5635C21.7568 4.74522 21.5227 3.7354 20.7639 2.70117C20.4154 2.19448 19.9116 1.76854 19.3631 1.41626C18.2336 0.754282 17.2194 0.520905 15.0398 0.520905H12.4806C12.4806 0.520905 12.018 0.520905 11.8548 0.926432L9.52624 6.70009V1.02804C9.52624 0.752508 9.29564 0.520905 9.01892 0.520905H3.09697C3.09697 0.520905 2.63976 0.520905 2.47346 0.926432L0.0526208 6.92992C0.0526208 6.92992 -0.189065 7.53023 0.363486 7.53023H2.63976V18.9702C2.63976 19.2541 2.86327 19.4791 3.14841 19.4791H9.01892C9.29564 19.4791 9.52624 19.2541 9.52624 18.9702V7.53023H11.8145C13.1276 7.53023 13.4056 7.56616 13.9165 7.80442C14.2242 7.92067 14.5014 8.15582 14.6526 8.42691C14.9622 9.00991 15.0398 9.71005 15.0398 11.7745V18.9702C15.0398 19.2541 15.2677 19.4791 15.5493 19.4791H21.1759C21.1759 19.4791 21.8118 19.4791 22.0633 18.8508L23.3103 15.7672C24.9684 18.0908 27.6974 19.4791 31.089 19.4791H31.83C31.83 19.4791 32.4699 19.4791 32.7231 18.8508L34.8948 13.4698V18.9702C34.8948 19.2541 35.1271 19.4791 35.4043 19.4791H41.148C41.148 19.4791 41.7817 19.4791 42.0362 18.8508C42.0362 18.8508 44.3334 13.1446 44.3422 13.1016H44.3458C44.434 12.6268 43.8345 12.6268 43.8345 12.6268H41.7844V2.8356L48.2345 18.8508C48.4864 19.4791 49.1214 19.4791 49.1214 19.4791H55.9068C55.9068 19.4791 56.5453 19.4791 56.7972 18.8508L63.948 1.13496C64.1955 0.520905 63.4793 0.520905 63.4793 0.520905ZM34.8941 12.6268H31.036C29.5003 12.6268 28.251 11.3827 28.251 9.84442C28.251 8.30883 29.5003 7.05675 31.036 7.05675H32.1149C33.6466 7.05675 34.8941 8.30883 34.8941 9.84442V12.6268Z"
      fill="currentColor"
    />
  </svg>`;
