const Router = require('koa-router');
const router = new Router();
const DB = require('../../mongodb/index.js');

router.get('/', async ctx => {
    await ctx.render("insert/index");
});
router.post('/doinsert', async ctx => {
    let reqBody = ctx.request.body
    await DB.insert("books", reqBody)
        .then(() => {
            ctx.body = "<h1>插入数据库成功</h1><a href='/'>点击返回首页</a>";
        })
        .catch(() => {
            ctx.body = "<h1>插入数据库失败</h1>";
        });
});
module.exports = router.routes();