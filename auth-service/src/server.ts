import koa from 'koa';
import koaBodyparser from 'koa-bodyparser';
import koaJson from 'koa-json';
import koaLogger from 'koa-logger';

const server = new koa();

server.use(koaBodyparser());
server.use(koaJson());
server.use(koaLogger());

export { server };
