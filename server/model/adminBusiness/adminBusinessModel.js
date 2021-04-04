//Importamos SEQUELIZE
const Sequelize = require('sequelize');
//Importamos la configuraciones de la BASE DE DATOS
const db = require('../../config/databases/configDataBase');
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});

//Importamos las constantes

///Creamos el MODELO de la Tabla LOGIN
const Login = db.define(
    'business',
    {
        idbusiness : {
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
        namebus : {
            type : Sequelize.STRING,
        },
        ofbus : {
            type : Sequelize.STRING,
        },
        citybus : {
            type : Sequelize.STRING,
        },
        placebus : {
            type : Sequelize.STRING,
        },
        directionbus : {
            type : Sequelize.STRING,
        },
        economicactivitybus : {
            type : Sequelize.STRING,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
module.exports = Login;