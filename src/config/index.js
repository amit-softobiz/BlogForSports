require('dotenv').config();

const config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_DB_URL,
 }

module.exports = config;