import cls from "decorator-client/src/styles/screenshare-button.module.css";
import utils from "decorator-client/src/styles/utils.module.css";
import html, { Template } from "decorator-shared/html";

export const ScreenshareButton = (text: Template) => html`
    <screenshare-button>
        <button class="${cls.screenshareButton}">
            ${text}
            <svg
                class="${utils.icon}"
                width="1em"
                height="1em"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                focusable="false"
                aria-hidden="true"
                role="img"
            >
                <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2.25 4.5c0-.69.56-1.25 1.25-1.25h17c.69 0 1.25.56 1.25 1.25v11c0 .69-.56 1.25-1.25 1.25h-7.75v2.5H19a.75.75 0 0 1 0 1.5H6a.75.75 0 0 1 0-1.5h5.25v-2.5H3.5c-.69 0-1.25-.56-1.25-1.25v-11Zm1.5.25v10.5h16.5V4.75H3.75Z"
                    fill="currentColor"
                ></path>
            </svg>
        </button>
    </screenshare-button>
`;
