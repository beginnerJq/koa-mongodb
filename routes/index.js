const Router = require('koa-router');
const router = new Router();
const DB = require('../mongodb/index.js');


router.get('/', async ctx => {
    let result = await DB.find("books");
    await ctx.render('index', {
        result
    });
});
router.use('/insert', require('./insert/index.js')); // 增加
router.use('/update', require('./update/index.js')); // 修改
router.use('/remove', require('./remove/index.js')); // 删除

module.exports = router.routes();