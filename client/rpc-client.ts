import {
  CustomRequestHandler,
  type AppRouter,
  type FetchRpcRouter,
  GetEndpoint,
  RouterPaths,
  DefaultRequest,
} from '@/server/fetch-RPC';

type ExtractRequestType<
  TRouter extends FetchRpcRouter,
  TEndpointPath extends RouterPaths<TRouter>,
> = GetEndpoint<TRouter, TEndpointPath>['handler'] extends CustomRequestHandler<
  any,
  any,
  any,
  infer TRequest
>
  ? TRequest
  : never;

type MakeOptions<
  TRouter extends FetchRpcRouter,
  TEndpointPath extends RouterPaths<TRouter>,
> = {
  query: Parameters<
    GetEndpoint<TRouter, TEndpointPath>['handler']
  > extends DefaultRequest
    ? undefined
    : ExtractRequestType<TRouter, TEndpointPath>;
};

export function createFetchRpcClient<TRouter extends FetchRpcRouter<any>>() {
  return async <
    TEndpointPath extends RouterPaths<TRouter>,
    TOptions extends MakeOptions<TRouter, TEndpointPath>,
  >(
    endpointPath: TEndpointPath,
    options: TOptions,
  ) => {
    const urlSearchParams = new URLSearchParams(options?.query as any);
    const response = await fetch(
      'http://localhost:4000' + endpointPath + '?' + urlSearchParams.toString(),
    );
    const data = await response.json();
    return data as ReturnType<
      Extract<
        TRouter['endpoints'][number],
        {
          path: TEndpointPath;
        }
      >['handler']
    >;
  };
}

export const api = createFetchRpcClient<AppRouter>();
