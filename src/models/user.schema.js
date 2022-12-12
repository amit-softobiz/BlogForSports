const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
    },
    email:{
        type:String,
    },
    password:{
        type:String,
    },
    isAuthor:{
        type:Boolean,
        default:false
    }
 })

module.exports = mongoose.model("user", userSchema);