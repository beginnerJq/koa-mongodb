const Router = require('koa-router');
const router = new Router();
const DB = require('../../mongodb/index.js');

let reqId;
router.get('/', async ctx => {
    reqId = DB.getObjectId(ctx.request.query._id);
    let result = await DB.find("books", {
        "_id": reqId
    });
    await ctx.render("update/index", {
        result
    });
});
router.post('/doupdate', async ctx => {
    await DB.update("books", {
            "_id": reqId
        }, ctx.request.body)
        .then(() => {
            ctx.body = "<h1>数据库修改成功</h1><a href='/'>点击返回首页</a>";
        })
        .catch(() => {
            ctx.body = "<h1>数据库修改失败</h1>";
        });
});
module.exports = router.routes();