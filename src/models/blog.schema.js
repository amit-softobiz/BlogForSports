const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const blogSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    isPublished:{
        type:Boolean,
        default:false
    }
 })

module.exports = mongoose.model("Blog", blogSchema);