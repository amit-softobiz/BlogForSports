const express             = require('express');
const path                = require('path');
const srcRoute            = require('./api/app');
const config              = require('./config/index');
const mongoconnection     = require('./loaders/mongoose');

const app = express();
const PORT=config.port;
mongoconnection.connect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(srcRoute);

app.listen(PORT,()=>{
  console.log(`server is listening on ${PORT}...`);
})
