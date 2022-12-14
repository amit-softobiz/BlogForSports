const jwt = require('jsonwebtoken');

const jwtSign =(userEmail, username, secretKey)=>{
    const payload = {
        username:username.username,
        mail:userEmail
    };
    const options = {
        expiresIn:"1d"
    }
    try {
        const jwtToken = jwt.sign(payload, secretKey, {expiresIn: '1h'});
        return jwtToken;
    } catch (error) { 
        return error;
    }
}

// const jwtVerify = (token,secretKey)=>{
//     jwt.verify(token, secretKey, (error, user) =>{
//         if(error){
//             throw error
//         }else {
//             return user
//         }
//     })
// }



module.exports= {
    jwtSign,
    // jwtVerify
}