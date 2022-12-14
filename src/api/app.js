const express     = require("express");
const indexRouter = require('./routes/index');
const userRouter  = require('./routes/users');

const app = express();

app.use(indexRouter);
app.use(userRouter);

module.exports=app;