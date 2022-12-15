const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Comment = require('./comment.schema');

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
    },
    comment:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Comment'
    }]
 })

module.exports = mongoose.model("Blog", blogSchema);