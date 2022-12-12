const User = require('../models/user.schema');
const {hash, compare } = require('../helpers/hash');
const mongoose = require("mongoose");
const {jwtsign} = require('../util.js/jwt');
const config = require('../config/index');

const signup = async(userDetail)=>{
    console.log("===============================");
    const user = new User({
        _id       : new mongoose.Types.ObjectId(),
        username  : userDetail.username,
        email     : userDetail.email,
        password  : await hash(userDetail.password)
    });
    try {
        await user.save(user);
        return user;
    } catch (error) {
        return Error("signup have not completed something went wrong");
    }
}

const login = async(userID, password)=>{
    try {
        const user = await User.findById(userID);
        const hash = user.password;
        const comparePass = await compare(password, hash);
        if(comparePass){
            const token = await jwtsign(user.email, userID, config.jwtKey);
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