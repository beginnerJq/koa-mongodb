const Router = require('koa-router');
const router = new Router();
const DB = require('../../mongodb/index.js');

let reqId;
router.get('/', async ctx => {
    reqId = DB.getObjectId(ctx.request.query._id);
    let result = await DB.remove("books", {
        "_id": reqId
    });
    result ? ctx.redirect('/') : ctx.body = "<h1>删除失败</h1>";
});

module.exports = router.routes();