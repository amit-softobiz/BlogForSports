const express        = require('express');
const router         = express.Router();
const blogController = require('../controllers/blog.controller');
const passport       = require('passport');
require('../../util.js/passport-jwt')(passport);
const authMiddleware = passport.authenticate('jwt', {session:false});

router.post('/',authMiddleware, blogController.addblog);
router.get('/',authMiddleware, blogController.getAllBlog);
router.post('/:id/comment',authMiddleware,blogController.addcomment);
router.get('/:id/comment',authMiddleware,blogController.getcomments)
router.delete('/:id',authMiddleware,blogController.deleteBlogById);
router.put('/:id',authMiddleware,blogController.updateBlogById);
router.get('/:id',authMiddleware,blogController.getBlogById);
router.post('/publish/:id',authMiddleware,blogController.published);

module.exports = router;