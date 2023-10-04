import { LinkGroup } from 'decorator-shared/types';
import cls from 'decorator-shared/utilities.module.css';
import html from 'decorator-shared/html';

export type ComplexFooterProps = {
  texts: { to_top: string };
  links: LinkGroup[];
};

export function ComplexFooter({ texts, links }: ComplexFooterProps) {
  return html`
    <footer class="footer">
      <div class="footer-content ${cls.contentContainer}">
        <a class="to-top-link" href="#">
          <svg
            width="1em"
            height="1em"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            focusable="false"
            role="img"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M12.53 3.47a.75.75 0 0 0-1.06 0l-6.5 6.5a.75.75 0 1 0 1.06 1.06l5.22-5.22V20.5a.75.75 0 0 0 1.5 0V5.81l5.22 5.22a.75.75 0 1 0 1.06-1.06l-6.5-6.5Z"
              fill="currentColor"
            ></path>
          </svg>
          ${texts.to_top}
        </a>

        <div class="footer-links">
          <ul class="footer-link-list">
            ${links.map(
              ({ heading, children }) => html`
                <li class="footer-link-group">
                  ${heading &&
                  html`<h2 class="footer-link-heading">${heading}</h2>`}
                  <ul>
                    ${children.map(
                      ({ content, url }) => html`
                        <li class="footer-link-item">
                          <a class="footer-link" href="${url}">${content}</a>
                        </li>
                      `,
                    )}
                  </ul>
                </li>
              `,
            )}
          </ul>
        </div>

        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="64"
            height="20"
            fill="none"
          >
            <path
              fill="currentColor"
              fill-rule="evenodd"
              d="M63.48.52h-6.66s-.459 0-.621.406l-3.685 11.287L48.832.926c-.163-.405-.624-.405-.624-.405H35.404a.514.514 0 0 0-.51.507v3.833c0-3.04-3.233-4.34-5.127-4.34-4.24 0-7.078 2.794-7.962 7.043-.048-2.819-.282-3.829-1.041-4.863-.349-.507-.852-.932-1.4-1.285-1.13-.662-2.145-.895-4.324-.895h-2.56s-.462 0-.625.405L9.526 6.7V1.028A.512.512 0 0 0 9.02.521H3.097s-.457 0-.624.405L.053 6.93s-.242.6.31.6H2.64v11.44c0 .284.223.51.508.51h5.87a.509.509 0 0 0 .508-.51V7.53h2.289c1.313 0 1.59.036 2.101.274.308.117.585.352.737.623.31.583.387 1.283.387 3.348v7.195c0 .284.228.51.51.51h5.626s.636 0 .887-.63l1.247-3.083c1.658 2.324 4.387 3.712 7.779 3.712h.741s.64 0 .893-.628l2.172-5.381v5.5a.51.51 0 0 0 .51.51h5.743s.634 0 .888-.63c0 0 2.297-5.705 2.306-5.748h.004c.088-.475-.511-.475-.511-.475h-2.05V2.836l6.45 16.015c.251.628.886.628.886.628h6.786s.638 0 .89-.628l7.151-17.716c.247-.614-.469-.614-.469-.614ZM34.893 12.628h-3.858a2.784 2.784 0 1 1 0-5.57h1.079a2.788 2.788 0 0 1 2.78 2.787v2.783Z"
              clip-rule="evenodd"
            />
          </svg>
          <p>Arbeids- og velferdsetaten</p>
        </div>
      </div>
    </footer>
  `;
}
