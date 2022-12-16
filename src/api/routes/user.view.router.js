const express        = require('express');
const router         = express.Router();
const userviewController = require('../controllers/user.view.controller');
const passport       = require('passport');
require('../../util.js/passport-jwt')(passport);
const authMiddleware = passport.authenticate('jwt', {session:false});

router.get('/blogpage',authMiddleware,userviewController.getviewblog);


module.exports = router;