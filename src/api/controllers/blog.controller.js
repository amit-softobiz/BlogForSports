const blogService = require('../../services/blog.service');

const addblog = async(req, res)=>{
    const {title, description}=req.body;
    addblogdetail = {title,description};
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.addBlog(addblogdetail);
            res.status(201).json({
            message: "add blog succesfully",
            status: 201,
            method: 'POST',
            blog: blogdata,
        })
    }else {
        console.log("only admin has the access")
        return;
    } 
    } catch (error) {
        res.status(500).json({message:"something went wrong in adding blog", detail:error});
    }
}

const getAllBlog = async (req, res)=>{
    console.log(req.user);
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.getBlog();
        res.status(201).json({
            message: "get all blog succesfully",
            status: 201,
            method: 'GET',
            blog: blogdata,
        }) 
    }else{
        console.log("user is not admin");
    }
    } catch (error) {
        res.status(500).json({message:"something went wrong in getting blog", detail:error});
    }
}
const getBlogById = async (req, res)=>{
    const id = req.params.id;
    try {
        const blogdata = await blogService.getBlogbyID(id);
        res.status(201).json({
            message: "get all blog succesfully",
            status: 201,
            method: 'post',
            blog: blogdata,
        }) 
    } catch (error) {
        res.status(500).json({message:"something went wrong in getting blog", detail:error});
    }
}
updateBlogById = async (req, res)=>{
    const {title, description}=req.body;
    const data = {title, description};
    const id = req.params.id;
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.updateBlogbyID(id, data);
        res.status(201).json({
            message: "update by id blog succesfully",
            status: 201,
            method: 'post',
            blog: blogdata,
        })
    }else {
        console.log("only admin has the access")
        return;
    }  
    } catch (error) {
        res.status(500).json({message:"something went wrong in getting blog", detail:error});
    }
}
const deleteBlogById = async(req, res)=>{
    const id = req.params.id;
    try {
        if(req.user.isAuthor == true){
        const blogdata = await blogService.deleteBlogbyID(id);
        res.status(201).json({
            message: "delete by id blog succesfully",
            status: 201,
            method: 'post',
            blog: blogdata,
        }) 
    }else {
        console.log("only admin has the access")
        return;
    } 
    } catch (error) {
        res.status(500).json({message:"something went wrong in getting blog", detail:error});
    }
}

const published = async(req, res)=>{
    const id = req.params.id;
    try {
        if(req.user.isAuthor == true){
            const publishtrue = await blogService.publishBlogbyID(id);
            res.status(201).json({
                message: "update blog by id for published succesfully",
                status: 201,
                method: 'post',
                result: publishtrue,
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
    const id = req.params.id;
    const commentreq = req.body.comment;
    try {
            const comment = await blogService.commentBlogbyID(id, commentreq);
            res.status(201).json({
                message: "add comment succesfully",
                status: 201,
                method: 'post',
                result: comment
            }) 
    } catch (error) {
        res.status(500).json({message:"something went wrong in getting blog", detail:error});
    }
}
const getcomments = async(req, res)=>{
    const id = req.params.id;
    try {
        const getComment = await blogService.getcommentsbyblogid(id);
        res.status(201).json({
            message: "get comment succesfully",
            status: 201,
            method: 'get',
            result: getComment
        }) 
    } catch (error) {
        res.status(500).json({message:"something went wrong in getting comment via blog id", detail:error});
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
