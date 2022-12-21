const userviewservice = require('../../services/user.view.service')
const getviewblog = async(req, res)=>{
        try {
            const blogdata = await userviewservice.getBlog();
            res.status(201).json({
                message: "get all blog succesfully",
                status: 201,
                method: 'GET',
                blog: blogdata,
            }) 
        } catch (error) {
            res.status(500).json({message:"something went wrong in getting blog", detail:error});
        }
}

module.exports= {
    getviewblog
}