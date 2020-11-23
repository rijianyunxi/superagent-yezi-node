const mongoose = require('mongoose')

const { connect, createModel, add, shift, find, update } = require('./index')

connect();

let model = createModel('star', {
    one: String,
    two: String
});
// add(model, {
//     "one": "0",
//     "two": "1"
// })
// shift(model,{"one":"hello"})

find(model,{},0,0)

// update(model, { "one": "0" }, { "two": "999999" })

// for (let i = 21, len = 40; i < len; i++) {
//     add(model, {
//         "one": i.toString(),
//         "two": (i + 1).toString()
//     })
// }