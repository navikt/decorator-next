import html from '../../html';

export const GlobeIcon = ({ className }: { className?: string } = {}) =>
  html`<svg
    width="1em"
    height="1em"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    focusable="false"
    role="img"
    ${className && html`class="${className}"`}
  >
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      d="M8.99 4.316A8.28 8.28 0 0 0 4.65 8.25h3.719a41.38 41.38 0 0 1 .62-3.934Zm1.63-.451a41.145 41.145 0 0 0-.742 4.385h4.245a41.142 41.142 0 0 0-.743-4.385 8.305 8.305 0 0 0-2.76 0ZM8.24 9.75H4.06A8.256 8.256 0 0 0 3.75 12c0 .78.108 1.535.31 2.25h4.18a34.49 34.49 0 0 1 0-4.5Zm1.503 4.5a33.017 33.017 0 0 1 0-4.5h4.514c.103 1.51.103 2.997 0 4.5H9.744Zm-1.375 1.5H4.65a8.28 8.28 0 0 0 4.34 3.933 41.32 41.32 0 0 1-.622-3.933Zm2.252 4.385a41.096 41.096 0 0 1-.743-4.385h4.246a41.106 41.106 0 0 1-.743 4.385 8.315 8.315 0 0 1-2.76 0Zm5.141-5.885c.098-1.502.098-2.99 0-4.5h4.178c.203.715.311 1.47.311 2.25a8.26 8.26 0 0 1-.31 2.25H15.76Zm-.75-9.933a8.28 8.28 0 0 1 4.34 3.933h-3.72a41.395 41.395 0 0 0-.62-3.933Zm.62 11.433h3.72a8.28 8.28 0 0 1-4.34 3.933c.276-1.344.483-2.648.62-3.933ZM2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Z"
      fill="currentColor"
    ></path>
  </svg>`;
