import { plugin } from 'bun';
import postcss from 'postcss';
import { cssModulesScopedNameOption } from '../shared/css-modules-config';

export async function getPostcssTokens(path: string) {
    const val = await postcss([
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        require('postcss-modules')({
            getJSON: () => {
            },
            ...cssModulesScopedNameOption,
        }),
    ]).process(await Bun.file(path).text(), { from: path });

    return val.messages.find(({ type, plugin }) => type === 'export' && plugin === 'postcss-modules')?.exportTokens;
}

plugin({
    name: 'css-modules',
    setup(build) {
        build.onLoad({ filter: /\.module\.css$/ }, async ({ path }) => {
            return {
                exports: {
                    default: await getPostcssTokens(path),
                },
                loader: 'object',
            };
        });
    },
});
