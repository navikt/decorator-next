import cors from 'cors';
import express, { Application, Response } from 'express';
import { ParsedQs } from 'qs';

// Request handdler only have request
export type DefaultRequest = express.Request<any, any, any, ParsedQs>;

export type CustomRequestHandler<ResBody, Query = ParsedQs> = (
  req: express.Request<any, ResBody, any, Query>,
) => ResBody;

type Endpoint<
  TQuery extends ParsedQs,
  TResBody,
  THandler extends CustomRequestHandler<TResBody, TQuery>,
  TPath extends string,
> = {
  method: 'get' | 'post' | 'put' | 'delete';
  path: TPath;
  handler: THandler;
};

function sendResponse<T>(res: Response, body: T): T {
  res.send(body);
  return body;
}

export class FetchRpcRouter<
  TEndpoints extends Array<Endpoint<any, any, any, any>> = [],
> {
  public endpoints: TEndpoints;
  expressApp: Application;

  constructor(public exprsesApp: Application) {
    this.endpoints = [] as any;
    this.expressApp = exprsesApp;
  }

  handleEndpoint<
    TPath extends string,
    TQuery extends ParsedQs,
    TResBody,
    THandler extends CustomRequestHandler<TResBody, TQuery>,
  >(
    path: TPath,
    endpoint: Omit<Endpoint<TQuery, TResBody, THandler, TPath>, 'path'>,
  ) {
    this.endpoints.push({
      ...endpoint,
      path,
    });
    return this as any as FetchRpcRouter<
      [...TEndpoints, Endpoint<TQuery, TResBody, THandler, TPath>]
    >;
  }

  route<TPath extends string>(path: TPath) {
    return {
      withQuery: <TQuery extends ParsedQs = ParsedQs>() => {
        return {
          handle: <
            ResBody = any,
            // TQuery extends ParsedQs,
            THandler extends CustomRequestHandler<
              ResBody,
              TQuery
            > = CustomRequestHandler<ResBody, TQuery>,
          >(
            // Omit here to remove the path
            endpoint: Omit<Endpoint<TQuery, ResBody, THandler, TPath>, 'path'>,
          ) => {
            return this.handleEndpoint(path, endpoint);
          },
        };
      },
    };

    // Write for where query is defined
  }
  // Use overload to preserve inference

  start(port: number) {
    for (const endpoint of this.endpoints) {
      console.log(endpoint.method, endpoint.path);
      this.expressApp[endpoint.method](endpoint.path, (req, res) => {
        const response = endpoint.handler(req, res, () => {});

        if (response instanceof Promise) {
          response.then((body) => sendResponse(res, body));
        } else {
          sendResponse(res, response);
        }
      });
    }
    console.log('Listening on http://localhost:' + port);

    this.expressApp.listen(port);
  }
}

// Test router

const app = express();
app.use(cors());

const router = new FetchRpcRouter(app);

const myRouter = router
  .route('/api/auth/test')
  .withQuery<{
    id: string;
  }>()
  .handle({
    method: 'get',
    handler: () => {
      // res.send('Hello World')
      return {
        hello: 123,
      };
    },
  })
  .route('/hello')
  .withQuery<any>()
  .handle({
    method: 'get',
    handler: () => {
      return {
        hello: 'world' as const,
      };
    },
  });

router.start(4000);

export type GetEndpoint<
  TRouter extends FetchRpcRouter<any>,
  TEndpointPath extends TRouter['endpoints'][number]['path'],
> = Extract<
  TRouter['endpoints'][number],
  {
    path: TEndpointPath;
  }
>;

// export type RouterPaths<TRouter extends FetchRpcRouter> =
//   TRouter['endpoints'][number]['path'];
//
// export type RouterPathsWithQuery<TRouter extends FetchRpcRouter<any>> = Exclude<
//   TRouter['endpoints'][number],
//   {
//     handler: CustomRequestHandler<any, ParsedQs>;
//   }
// >;
//
// export type RouterPathsWithoutQuery<TRouter extends FetchRpcRouter<any>> =
//   Extract<
//     TRouter['endpoints'][number],
//     {
//       handler: CustomRequestHandler<any, ParsedQs>;
//     }
//   >;

// Hello handler

export type AppRouter = typeof myRouter;

export type HelloEndpoint = GetEndpoint<AppRouter, '/hello'>;
export type AuthEdnpoint = GetEndpoint<AppRouter, '/api/auth/test'>;

export type test = ReturnType<AuthEdnpoint['handler']>;
