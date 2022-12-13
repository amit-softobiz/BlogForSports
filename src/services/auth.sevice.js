const User = require('../models/user.schema');
const {hash, compare } = require('../helpers/hash');
const mongoose = require("mongoose");
const {jwtSign} = require('../util.js/jwt');
const config = require('../config/index');

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
        const comparePass = await compare(password, hash);
        if(comparePass){
            const token = await jwtSign(userEmail, user.username, config.jwtKey);
            return {user, token};
        }else{
            console.log('user id not there plese sign up ', user._id);
        }
    } catch (error) {
        throw Error('error in login');
    }
}

module.exports={
    signup,
    login
}