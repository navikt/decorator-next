import { Params, formatParams } from 'decorator-shared/params';
import html from 'decorator-shared/html';

export function DecoratorEnv({
  origin,
  env,
}: {
  origin: string;
  env: Partial<Params>;
}) {
  return html`
    <div
      id="decorator-env"
      data-src="${origin}?${formatParams(env).toString()}"
    ></div>
    <script type="application/json" id="decorator-params">
      ${JSON.stringify(env)}
    </script>
  `;
}