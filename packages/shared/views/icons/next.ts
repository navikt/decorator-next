import html from '../../html';

export const Next = ({ className }: { className?: string }) => {
    return html`
        <svg
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            aria-hidden="true"
            role="img"
            class="${className}"
        >
            <path d="m17.414 12-7.707 7.707-1.414-1.414L14.586 12 8.293 5.707l1.414-1.414L17.414 12Z" fill="currentColor" />
        </svg>
    `;
};
