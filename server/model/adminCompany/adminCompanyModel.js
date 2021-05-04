//Importamos SEQUELIZE
const Sequelize = require('sequelize');
//Importamos la configuraciones de la BASE DE DATOS
const db = require('../../config/databases/configDataBase');
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});

//Importamos las constantes
const constants = require('../../service/adminCompany/constant');

///Creamos el MODELO de la Tabla LOGIN
const Company = db.define(
    'company',
    {
        idcompany : {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        identifiercom : {
            type : Sequelize.STRING,
        },
        namecom : {
            type : Sequelize.STRING,
        },
        nitcom : {
            type : Sequelize.STRING,
        },
        telephonecom : {
            type : Sequelize.STRING,
        },
        emailcom : {
            type : Sequelize.STRING,
        },
        coincom : {
            type : Sequelize.STRING,
        },
        citycom : {
            type : Sequelize.STRING,
        },
        placecom : {
            type : Sequelize.STRING,
        },
        directioncom : {
            type : Sequelize.STRING,
        },
        ofcom : {
            type : Sequelize.STRING,
        },
        directionimgcom : {
            type : Sequelize.STRING,
            defaultValue : constants.logoDefault
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
module.exports = Company;