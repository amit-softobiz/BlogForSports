const BlogSchema               = require('../models/blog.schema');


const getBlog = async()=>{
    try {
        const publishdata = await BlogSchema.find({isPublished:true});
        return publishdata;
    } catch (error) {
        return Error("cannot get blog by id some error in get blog service");
    }
}


module.exports={
    getBlog
}