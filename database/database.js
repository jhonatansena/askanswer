// const { Sequelize } = require('sequelize');
const Sequelize = require('sequelize'); 

const connection = new Sequelize('askanswe', 'root', 'root',{
    host: 'localhost',
    dialect: 'mysql',
    logging: false
});

module.exports = connection;