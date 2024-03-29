import html from 'decorator-shared/html';

// @TODO: Should probably create a generic type for the className

export function NotificationsIcon({ className }: { className?: string }) {
    return html`<svg
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
        <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12.75 2.5a.75.75 0 0 0-1.5 0v1.273c-2.222.14-3.655.92-4.499 2.186-.887 1.33-1.001 3.04-1.001 4.541v3c0 .809-.424 1.92-.92 2.915a18.092 18.092 0 0 1-.936 1.641l-.014.022-.004.005v.001A.75.75 0 0 0 4.5 19.25h4.338a3.25 3.25 0 0 0 6.324 0H19.5a.75.75 0 0 0 .624-1.166l-.004-.006-.014-.022a15.581 15.581 0 0 1-.275-.442c-.18-.3-.42-.72-.66-1.2-.497-.994-.921-2.105-.921-2.914v-3c0-1.501-.114-3.21-1.001-4.541-.844-1.266-2.277-2.046-4.499-2.186V2.5ZM12 5.25c-2.345 0-3.436.694-4.001 1.541-.613.92-.749 2.21-.749 3.709v3c0 1.191-.576 2.58-1.08 3.585-.118.238-.236.461-.349.665H18.18a18.91 18.91 0 0 1-.35-.665c-.503-1.006-1.079-2.394-1.079-3.585v-3c0-1.499-.136-2.79-.749-3.709C15.436 5.944 14.345 5.25 12 5.25Zm-1.237 14.487a1.747 1.747 0 0 1-.344-.487h3.162a1.747 1.747 0 0 1-1.581 1 1.75 1.75 0 0 1-1.237-.513Z"
            fill="currentColor"
        ></path>
    </svg>`;
}

export function MessageIcon() {
    return html`<svg
        width="24px"
        height="24px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        focusable="false"
        aria-hidden="true"
        role="img"
    >
        <rect width="24" height="24" fill="#3380A5" rx="4" />
        <path
            fill="#fff"
            fill-rule="evenodd"
            d="M5.438 7.5c0-1.14.923-2.063 2.062-2.063h9c1.14 0 2.063.923 2.063 2.063v6.75c0 1.139-.924 2.062-2.063 2.062H9.906l-3.617 2.17A.563.563 0 0 1 5.438 18V7.5Z"
            clip-rule="evenodd"
        />
    </svg>`;
}

export function TaskIcon() {
    return html`<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
        <rect width="24" height="24" fill="#C77300" rx="4" />
        <path
            fill="#fff"
            fill-rule="evenodd"
            d="M6.188 5.625c0-.518.42-.938.937-.938h9.75c.518 0 .938.42.938.938v12.75c0 .518-.42.938-.938.938h-9.75a.937.937 0 0 1-.938-.938V5.625ZM11.438 15c0-.31.251-.563.562-.563h2.625a.562.562 0 1 1 0 1.126H12a.562.562 0 0 1-.563-.563ZM12 11.437a.562.562 0 1 0 0 1.126h2.625a.562.562 0 1 0 0-1.126H12Zm-2.242 1.126H9.75a.562.562 0 1 1 0-1.126h.008a.562.562 0 1 1 0 1.126Zm0 1.874H9.75a.562.562 0 1 0 0 1.126h.008a.562.562 0 1 0 0-1.126Zm2.43-6.187c0-.31.251-.563.562-.563h1.875a.562.562 0 1 1 0 1.125H12.75a.562.562 0 0 1-.563-.562Zm-.863-.412a.563.563 0 0 0-.9-.675l-.736.98-.291-.29a.563.563 0 0 0-.796.795l.75.75a.563.563 0 0 0 .848-.06l1.125-1.5Z"
            clip-rule="evenodd"
        />
    </svg>`;
}
