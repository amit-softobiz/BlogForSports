const authService = require("../../services/auth.sevice");
const mongoose = require('mongoose');
const signUp=async(req, res)=>{
    userDetail={
        username : req.body.username,
        email    : req.body.email,
        password : req.body.password
    };
    try{
        const user = await authService.signup(userDetail);
        res.status(201).json({
            message: "succesfull",
            status: 201,
            method: 'POST',
            user: user,
        })
    }catch(err){
        console.log(err.msg);
        res.status(500).json({message:"Sign up have some error..", detail:err});
    }
}

const login = async(req, res)=>{
    const userEmail    = req.body.email;
    const userPassword = req.body.password;
    try {
        const result = await authService.login(userEmail, userPassword);
        res.status(201).json({
            message:'successfull',
            status:201,
            method:'POST',
            userData:{
                mail:result.user.email,
                token:result.token,
            }
        })
    }catch (error) {
        res.status(500).json({message:'login problem', detail:error})
    }
}
const isAdmin = async(req, res)=>{

    const _id =  mongoose.Types.ObjectId(req.user._id);
    const reqbody = req.body.secret;
    
    try {
        const result = await authService.adminpost(_id,reqbody);
        res.status(201).json({
            message:'admin post successfully',
            status:201,
            method:'POST',
            result:result
         })
    }catch (error) {
        res.status(500).json({message:'is admin not working', detail:error})
    }

}
module.exports={
    signUp,
    login,
    isAdmin
}

