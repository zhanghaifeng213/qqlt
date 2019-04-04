const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/aa',{useNewUrlParser:true})
const con = mongoose.connection;
con.on('error', console.error.bind(console, '连接数据库失败'));
con.once('open',()=>{

})

const models = {
    user: {
        user: { type: String, require: true },
        pwd: { type: String, require: true },
        type: { type: String, require: true }, // genius/boss
        avatar: { type: String }, // 头像
        desc: { type: String }, // 个人简介/职位简介
        title: { type: String }, // 职位名称
        company: { type: String }, // 公司名称
        money: { type: String } // 薪酬
    },
    chat: {
        chatId: { type: String, require: true }, // 聊天Id
        from: { type: String, require: true }, // 发送人
        to: { type: String, require: true }, // 接收人
        read: { type: Boolean, default: false }, // 是否已读
        content: { type: String, require: true, default: "" }, // 聊天内容
        create_time: { type: Number, default: new Date().getTime() }
    },
}

for (let m in models) {
    mongoose.model(m, new mongoose.Schema(models[m]))
}

module.exports = {
    getModels: (name) => {
        return mongoose.model(name)
    }
}




