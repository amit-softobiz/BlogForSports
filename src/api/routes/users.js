const express        = require('express');
const router         = express.Router();
const passport       = require('passport');
const userController = require('../controllers/user.controller');
require('../../util.js/passport-jwt')(passport);

const authMiddleware = passport.authenticate('jwt', {session:false});

router.post('/signup', userController.signUp);
router.post('/login', userController.login);
router.put('/admin',authMiddleware,userController.isAdmin);
router.get ('/ghost',authMiddleware,(req, res)=>{
    console.log(req.user);
    res.send("you are on the ghost house go back");
})

module.exports = router;
