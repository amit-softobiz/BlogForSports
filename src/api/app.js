const express     = require("express");
const indexRouter = require('./routes/index');
const userRouter  = require('./routes/users');
const blogRouter  = require('./routes/blog');
const app = express();

app.use(indexRouter);
app.use(userRouter);
app.use('/blog', blogRouter);

module.exports=app;