// flow-typed signature: 34d599610efb09c81535b2d52f406432
// flow-typed version: ecc184c4dc/next-routes_v1.x.x/flow_>=v0.47.x


declare module 'next-routes' {
  import type { $Application, Middleware } from 'express';
  import type { Link as NextLink, Router as NextRouter } from 'next';

  declare type RoutesOpt = {
    Link: NextLink,
    Router: NextRouter
  }

  declare type Route = {
    name: string,
    pattern: string,
    page: string
  }

  declare interface Routes {
    Link: NextLink,
    Router: NextRouter,
    add(route: Route | string): Routes,
    add(pattern: string, page: string): Routes,
    add(name: string, pattern: string, page: string): Routes,
    getRequestHandler(app: $Application, customHandler: any => any): Middleware,
    pushRoute(route: string, params?: { [name: string]: string }, options?: any): void,
    replaceRoute(route: string, params?: { [name: string]: string }, options?: any): void,
    prefetchRoute(route: string, params?: { [name: string]: string }, options?: any): void
  }



  declare module.exports: (opt?: RoutesOpt) => Routes;
}
