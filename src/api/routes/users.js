const express        = require('express');
const router         = express.Router();
const passport       = require('passport');
const userController = require('../controllers/user.controller');
require('../../util.js/passport-jwt')(passport);

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.get ('/ghost',passport.authenticate('jwt', {session:false}),(req, res)=>{
    console.log(req.user);
    res.send("you are on the ghost house go back");
})

module.exports = router;
