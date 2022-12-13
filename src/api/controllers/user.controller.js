const authService = require("../../services/auth.sevice");

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

const login =async(req, res)=>{
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
module.exports={
    signUp,
    login
}

