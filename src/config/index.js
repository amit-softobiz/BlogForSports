require('dotenv').config();

const config = {
    port: process.env.PORT,
    mongoUri: process.env.MONGO_DB_URL,
    jwtKey: process.env.JWT_KEY,
    adminSecret : process.env.ADMIN_CODE,
 }

module.exports = config;