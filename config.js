require('dotenv').config(); 
const env = process.env.NODE_ENV || 'development'; 

module.exports = {
    DATABASE_URL: 'postgres://coxaffrf:7Dli2nfv3MbIojjet7iXTuzq30RxpyUf@stampy.db.elephantsql.com:5432/coxaffrf', 
    PORT: process.env.PORT || 8080, 
    SEQUELIZE_OPTIONS: {logging: env === 'test' ? false : console.log}, 
    JWT_SECRET: process.env.JWT_SECRET, 
    JWT_EXPIRY: '7d', 
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000' 
}


