const dotenv = require('dotenv')

dotenv.config()

module.exports = {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB,
    host: process.env.HOST,
    port: process.env.DB_PORT,
    dialect: process.env.DIALECT,
    logging: false,
}
