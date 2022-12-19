const blogService = require('../../services/blog.service');

const addblog = async(req, res)=>{
    const {title, description}=req.body;
    addblogdetail = {title,description};
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.addBlog(addblogdetail);
            res.status(201).json({
            message : "Add blog succesfully",
            status  : 201,
            method  : 'POST',
            blog    : blogdata,
        })
    }else {
        console.log("Only admin has the access");
        res.send('Only admin has the access');
        return;
    } 
    } catch (error) {
        res.status(500).json({message:"Something went wrong in adding blog (controller)", detail:error});
    }
}

const getAllBlog = async (req, res)=>{
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.getBlog();
        res.status(200).json({
            message : "Get all blog succesfully",
            status  : 200,
            method  : 'GET',
            blog    : blogdata,
        }) 
    }else{
        console.log("User is not admin");
        res.send('Only admin has the access');
        return;
    }
    } catch (error) {
        res.status(500).json({message:"Something went wrong in getting blog (controller)", detail:error});
    }
}
const getBlogById = async (req, res)=>{
    const id = req.params.id;
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.getBlogbyID(id);
        res.status(200).json({
            message : "Get blog by id succesfully",
            status  : 200,
            method  : 'POST',
            blog    : blogdata,
        }) 
        }else{
        console.log("User is not admin");
        res.send('Only admin has the access');
        return;
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong in getting blog by id (controller)", detail:error});
    }
}
const updateBlogById = async (req, res)=>{
    const {title, description}=req.body;
    const data = {title, description};
    const id = req.params.id;
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.updateBlogbyID(id, data);
        console.log(" blog data ", blogdata);
        if(blogdata != null){
        res.status(202).json({
            message : "Update blog by id succesfully",
            status  : 202,
            method  : 'PUT',
        })
    }else{
        res.status(500).send("cannot update with this id ...")
    }
    }else {
        console.log("Only admin has the access")
        res.send('Only admin has the access');
        return;
    }  
    } catch (error) {
        res.status(500).json({message:"Something went wrong in update blog by id (controller)", detail:error});
    }
}
const deleteBlogById = async(req, res)=>{
    const id = req.params.id;
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.deleteBlogbyID(id);
        if(blogdata != null){
        res.status(200).json({
            message  : "Delete blog by id succesfully",
            status   : 200,
            method   : 'DELETE',
        })
    }else{
        res.status(500).send("blog id doesn't exist..");
    } 
    }else {
        console.log("Only admin has the access")
        res.send('Only admin has the access');
        return;
    } 
    } catch (error) {
        res.status(500).json({message:"Something went wrong in delete blog by id (controller)", detail:error});
    }
}

const published = async(req, res)=>{
    const id = req.params.id;
    try {
        if(req.user.isAuthor == true){
            const publishtrue = await blogService.publishBlogbyID(id);
            res.status(202).json({
                message : "Update blog by id for published succesfully",
                status  : 202,
                method  : 'POST',
                result  : publishtrue,
            }) 
        }else {
            console.log("only admin has the access")
            return;
        } 
    } catch (error) {
        res.status(500).json({message:"something went wrong in getting blog", detail:error});
    }
}
const addcomment = async(req, res)=>{
    const userId = req.user._id;
    const id = req.params.id;
    const commentreq = req.body.comment;
    try {
         if(req.user){
            const comment = await blogService.commentBlogbyID(userId,id, commentreq);
                if(comment != null){
                res.status(201).json({
                    message  : "Add comment succesfully",
                    status   : 201,
                    method   : 'POST',
                    result   : comment
                })
            } else{
                res.status(400).send(`blog does not exist`);
            }
        }else{
            res.send("Plese login first then you comment on this blog..")
            return;
        }
    } catch (error) {
        res.status(500).json({message:"Something went wrong in add comment by blog id", detail:error});
    }
}
const getcomments = async(req, res)=>{
    const id = req.params.id;
    try {
        if(req.user){
        const getComment = await blogService.getcommentsbyblogid(id);
        if(getComment != null){
        res.status(200).json({
            message : "Get comment succesfully",
            status  : 200,
            method  : 'GET',
            result  : getComment
        })
    }else{
        res.status(500).send("comment id does not exist..");
    } 
    }else{
        res.send("Plese login first then you comment on this blog..")
        return;
    }
    } catch (error) {
        res.status(500).json({message:"Something went wrong in getting comment via blog id", detail:error});
    }
}

module.exports={
    addblog,
    getAllBlog,
    getBlogById,
    updateBlogById,
    deleteBlogById,
    addcomment,
    published,
    getcomments
}
