//引入mongoose
const mongoose = require('mongoose')
// 链接mongoose数据库
const connect = () => {
    mongoose.connect('mongodb://47.94.174.190:27017/node', { useNewUrlParser: true, useUnifiedTopology: true }).then(r => {
        console.log('mongodb is connecting');
    }).catch(e => {
        console.log("mongodb error");
    })
}

const createModel = (table, schema) => {
    return mongoose.model(table, mongoose.Schema(schema), table);
}
//增
const add = (model, data) => {
    return new Promise((resolve, reject) => {
        new model(data).save((err) => {
            if (err) {
                reject('添加失败')
            } else {
                resolve('增加成功');
            }
        })
    })
}
//删
const shift = (model, data) => {
    model.deleteOne(data, (err) => {
        if (err) {
            return console.log(err)
        }
        console.log('删除成功');
    })
}
//改
const update = (model, data, newData) => {
    model.updateOne(data, newData, (err) => {
        if (err) {
            return console.log(err)
        }
        console.log('更新成功');
    })
}
//查
const find = async (model, data, page, size) => {
    let r = await model.find(data).skip((page - 1) * size).limit(size);
    console.log(r);
}


module.exports = { connect, createModel, add, shift, find, update }
// //定义Schama
// let UserSchema = mongoose.Schema({
//     name: String,
//     age: Number,
//     skill: String
// });
// // 定义model
// let UserModel = mongoose.model('test', UserSchema);

// //查找数据

// UserModel.find({}, (err, res) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log(res)
// })


// //增加数据的实现

// var newUser = new UserModel({
//     name: 'song',
//     age: 18,
//     skill: 'code'
// })
// newUser.save((err) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log('success');
// })

// //更新数据

// Users.update({ 'name': 'song' }, { 'name': 'zhang' }, (err) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log('success');
// })

// //删除数据

// Users.deleteOne({ 'name': 'zhang' }, (err) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log('success');
// })

// let yzm = createModel('yzm',{item:String,time:String})

// var newyzm = new yzm({
//     item: 'song',
//     time: '18093932'
// })
// newyzm.save((err) => {
//     if (err) {
//         return console.log(err)
//     }
//     console.log('success');
// })


