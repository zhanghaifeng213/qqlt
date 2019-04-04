const router = require('koa-router')()
const model = require('../server/mode')
const utils = require('utility')
const User = model.getModels('user')
const Chat = model.getModels('chat')
const _filter = {'pwd': 0, '__v': 0}


// 查询所有用户列表
router.get('/list', async (ctx) => {
    try {
        const {type} = ctx.query;
        let doc =await User.find({type});
        if (doc.length) {
            ctx.body = {
                code: 0,
                data: doc
            }
        } else {
            ctx.body = {
                code: 1,
                msg: '用户不存在',
                data:[]
            }
        }
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: '数据库错误'
        }
    }

})

// 清除所有用户信息，调试用
router.get('/clear', async (ctx) => {
    try {
        let doc = User.remove({});
        if (doc) {
            ctx.body = {doc}
        }
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: '数据库错误'
        }
    }

})


// 清除所有聊天记录，调使用
router.get('chat-clear', async (ctx) => {
    try {
        let doc = await Chat.remove({});
        ctx.body = {doc}
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: '数据库错误'
        }
    }

})


// 注册

router.post('/register', async (ctx) => {
    try {
        const {user, pwd, type} = ctx.request.body;
        let doc = await User.findOne({user});
        if (doc) {
            ctx.body = {code: 1, msg: '用户名重复'}
        } else {
            const UserModel = new User({user, pwd: md5Pwd(pwd), type});
            let UserDoc = await UserModel.save();
            const {_id} = UserDoc;
            ctx.session['react-chat'] = _id;
            ctx.body = {code: 0, data: {user, type, _id}}
        }
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: '数据库错误'
        }
    }
})

// 用户登录
router.post('/login', async (ctx) => {
    try {
        const {user, pwd} = ctx.request.body;
        let userMode = await User.findOne({user, pwd: md5Pwd(pwd)}, _filter);
        if (userMode) {
            ctx.session['react-chat'] =userMode._id;
            ctx.body = {code: 0, data: userMode}
        } else {
            ctx.body = {code: 1, msg: '用户名或密码错误'}
        }
    } catch (err) {
        ctx.body = {code: 1, msg: '数据库错误'}
    }


})

// 获取用户信息
router.get('/info', async (ctx) => {
    try {
        const userid = ctx.session['react-chat'];
        if (!userid) {
            ctx.body = {code: 0}
        } else {
            let doc = await  User.findOne({_id: userid}, _filter);
            if (doc) {
                ctx.body = {code: 0, data: doc}
            } else {
                ctx.body = {}
            }
        }
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: '数据库错误'
        }
    }
})

// 完善用户信息
router.post('/update', async (ctx) => {
    try {
        const userId = ctx.session['react-chat'];
        if (!userId) {
            ctx.body = {code: 1, msg: '请重新登录'}
        } else {
            const {body} = ctx.request;
            let doc = await  User.findByIdAndUpdate(userId, body);
            if (doc) {
                const data = Object.assign({}, {
                    user: doc.user,
                    type: doc.type
                }, body)
                ctx.body = {code: 0, data}
            }
        }
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: '数据库错误'
        }
    }

})

// 获取聊天信息
router.get('/getMsgList', async (ctx) => {
    try {
        const user = ctx.session['react-chat'];
        let doc = await User.find({})
        let users = {};
        doc.forEach(item => {
            users[item._id] = {name: item.user, avatar: item.avatar}
        })
        let chatDoc = await Chat.find({'$or': [{'from': user}, {'to': user}]});
        ctx.body = {code: 0, msgs: chatDoc, users}
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: '数据库错误'
        }
    }

})


// 修改信息未读状态
router.post('/readMsg', async (ctx) => {
    try {
        const user = ctx.session['react-chat'];
        const {from} = ctx.request.body;
        let doc = await Chat.update({from, to: user}, {'$set': {read: true}}, {'multi': true})
        ctx.body = {code: 0, num: doc.nModified}
    } catch (err) {
        ctx.body = {
            code: 1,
            msg: '数据库错误'
        }
    }

})


// 密码加密
function md5Pwd(pwd) {
    const salt = "react-chat-sfaf8h143n3knjaf"
    return utils.md5(utils.md5(pwd + salt))
}

module.exports = router
