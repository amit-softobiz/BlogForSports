const mongoose = require("mongoose");
const Schema   = mongoose.Schema;
const Blog     = require("./blog.schema");

const commentSchema = new Schema({
    comment:{
        type:String,
      
    },
    blogID:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Blog'
    },
    userId:{
            type:String
        }
})

module.exports = mongoose.model("Comment", commentSchema);