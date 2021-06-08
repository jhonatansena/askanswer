const Sequelize = require('sequelize'); 
require('dotenv/config');


const connection = new Sequelize(process.env.DATA_BASE,
     process.env.USERNAME, process.env.PASSWORD,{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;