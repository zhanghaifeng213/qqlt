const router = require('koa-router')();
const users = require("./users");
router.use('/user', users.routes(), users.allowedMethods())
module.exports = router
