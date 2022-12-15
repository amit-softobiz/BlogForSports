const BlogSchema               = require('../models/blog.schema');
const Comment                  = require('../models/comment.schema');
const addBlog = async(addblogdetail)=>{
    const blog = new BlogSchema({
        title           : addblogdetail.title,
        description     : addblogdetail.description,
    });
    try {
        await blog.save();
        return blog;
    } catch (error) {
        return Error("blog is not added some thing is wrong in blog service app");
    }
}
const getBlog = async()=>{
    try {
        const blog = await BlogSchema.find({});
        return blog;
    } catch (error) {
        return Error("cannot get all blog some error in get blog service");
    }
}

const getBlogbyID = async(id)=>{
    try {
        const blog = await BlogSchema.find({_id:id});
        return blog;
    } catch (error) {
        return Error("cannot get blog by id some error in get blog service");
    }   
}
const updateBlogbyID = async (id,data)=>{
    try {
        const blog = await BlogSchema.findByIdAndUpdate({_id:id},{"title":data.title, "description":data.description});
        return blog;
    } catch (error) {
        return Error("cannot get blog by id some error in get blog service");
    } 
}
const deleteBlogbyID = async (id)=>{
    try {
        const blog = await BlogSchema.findByIdAndDelete({_id:id},(err, data)=>{
            if(err){
                console.log("err", err);
            }else{
                console.log("Deleted : ", data);
            }

        });
        return blog;
    } catch (error) {
        return Error("cannot get blog by id some error in get blog service");
    } 
}
const publishBlogbyID = async (id)=>{
    try {
        const blog = await BlogSchema.findByIdAndUpdate({_id:id},{"isPublished":true},(err, data)=>{
            if(err){
                console.log("err", err);
            }else{
                console.log("Deleted : ", data);
            }
        });
        return blog;
    } catch (error) {
        return Error("cannot be published some thing went wrong");
    } 
}

const commentBlogbyID=async(_id, comments)=>{
    try {
        console.log(_id, comments);
        const commentss = new Comment({comment:comments,blogID:_id});
        await commentss.save();
        const blog = await BlogSchema.findByIdAndUpdate({_id},{$push:{comment:commentss}});
        // console.log("comment ", commentss);
        // console.log("blog ", blog); 
        // const saveComment = blog.comment.push(comments);
        // console.log("save comment ", saveComment);
       await blog.save(
           (err, data)=>{
            if(err){
                console.log("err", err);
            }else{
                console.log("done ", data);
            }
        })
        return data;
    } catch (error) {
        return Error("cannot be comment thing went wrong");
    }
}




module.exports={
    addBlog,
    getBlog,
    getBlogbyID,
    updateBlogbyID,
    deleteBlogbyID,
    publishBlogbyID,
    commentBlogbyID
}