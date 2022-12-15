const express        = require('express');
const router         = express.Router();
const userviewController = require('../controllers/user.view.controller');
const passport       = require('passport');
const authMiddleware = passport.authenticate('jwt', {session:false});


router.post('/',);
router.get('/',userviewController.getviewblog);
router.delete('/:id',);
router.put('/:id',);
router.get('/:id',);


module.exports = router;