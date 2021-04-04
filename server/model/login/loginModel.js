//Importamos SEQUELIZE
const Sequelize = require('sequelize');
//Importamos la configuraciones de la BASE DE DATOS
const db = require('../../config/databases/configDataBase');
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});

///Creamos el MODELO de la Tabla LOGIN
const Login = db.define(
    'login',
    {
        idlogin : {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        identifiercom : {
            type : Sequelize.STRING,
        },
        identifierbus : {
            type : Sequelize.STRING,
        },
        identifier : {
            type : Sequelize.STRING,
        },
        name : {
            type : Sequelize.STRING,
        },
        surname : {
            type : Sequelize.STRING,
        },
        user : {
            type : Sequelize.STRING,
        },
        email : {
            type : Sequelize.STRING,
        },
        ci : {
            type : Sequelize.STRING,
        },
        password : {
            type : Sequelize.STRING,
        },
        role : {
            type : Sequelize.STRING,
        },
        avatar : {
            type : Sequelize.STRING,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
module.exports = Login;