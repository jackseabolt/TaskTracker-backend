require('dotenv').config(); 
const env = process.env.NODE_ENV || 'development'; 

module.exports = {
    DATABASE_URL: process.env.DATABASE_URL, 
    PORT: process.env.PORT || 8080, 
    SEQUELIZE_OPTIONS: {logging: env === 'test' ? false : console.log}, 
    JWT_SECRET: process.env.JWT_SECRET, 
    JWT_EXPIRY: '7d', 
    CLIENT_ORIGIN: process.env.CLIENT_ORIGIN || 'http://localhost:3000' 
}

