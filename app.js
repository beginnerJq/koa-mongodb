const Koa = require('koa');
var Router = require('koa-router'); // 路由
const app = new Koa();
var router = new Router();
const render = require('koa-art-template'); // art 模板
const serve = require('koa-static'); // 静态资源
const bodyParser = require('koa-bodyparser'); // post数据解析
const {
    join
} = require('path');

let index = require('./routes/index.js'); //根路由

render(app, {
    root: join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});

app.use(bodyParser());

app.use(index);

app.use(serve(`${__dirname}/static`));

app
    .use(router.routes())
    .use(router.allowedMethods());
app.listen(3001, () => {
    console.log('Server Listener 3001...');
});