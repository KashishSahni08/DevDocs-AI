const {Schema, model} = require('../connection');

const userSchema = new Schema({
    name: String,
    email: {type:String, unique:true, required:true},
    password: {type:String},
    picture: String,
    provider: {type: String, default: "local"},
    createdAt:{type:Date, default:Date.now}

});

module.exports = model('user', userSchema);