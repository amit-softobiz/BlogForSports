const mongoose    = require('mongoose');
const config      = require('../config/index');
mongoose.set('strictQuery', false);   
module.exports.connect = () => {
    const connection = mongoose.connect(config.mongoUri,{ useNewUrlParser: true, useUnifiedTopology: true });
    let db = mongoose.connection;
    db.on('open', () => {
        console.log('MongoDb connected...');
    })
    if (!db.error) {
        console.log("mongodb error ....");
    }
    return connection;
}