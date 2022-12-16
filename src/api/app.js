const express     = require("express");
const indexRouter = require('./routes/index');
const userRouter  = require('./routes/users');
const blogRouter  = require('./routes/blog');
const viewRouter  = require('./routes/user.view.router');
const app = express();

app.use(indexRouter);
app.use(userRouter);
app.use(viewRouter);
app.use('/blog', blogRouter);


module.exports=app;