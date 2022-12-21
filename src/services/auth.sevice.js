const User               = require('../models/user.schema');
const {hash, compare }   = require('../helpers/hash');
const mongoose           = require("mongoose");
const {jwtSign}          = require('../util.js/jwt');
const config             = require('../config/index');

const signup = async(userDetail)=>{
    const user = new User({
        _id       : new mongoose.Types.ObjectId(),
        username  : userDetail.username,
        email     : userDetail.email,
        password  : await hash(userDetail.password)
    });
    try {
        await user.save();
        return user;
    } catch (error) {
        return Error("signup have not completed something went wrong");
    }
}

const login = async(userEmail, password)=>{
    try {
        const user = await User.findOne({email:userEmail});
        const hash = user.password;
        const payload={
            _id:user._id,
            username:user.username,
            email:user.email
        }
        const comparePass = await compare(password, hash);
        if(comparePass){
            const token = await jwtSign(payload, config.jwtKey);
            return {user, token};
        }else{
            console.log('user id not there plese sign up ', user._id);
        }
    } catch (error) {
        throw Error('error in login');
    }
}
const adminpost = async(_id, reqbodycode)=>{
    const adminSecret = config.adminSecret;
    try {
        if(reqbodycode == adminSecret){
        const user = await User.findByIdAndUpdate(_id,{isAuthor:true});
        return user
        }
        else{
            console.log("code is wrong");
        }
    } catch (error) {
        throw Error('admin post error');
    }

}

module.exports={
    signup,
    login,
    adminpost
}