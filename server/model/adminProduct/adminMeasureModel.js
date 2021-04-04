//Importamos SEQUELIZE
const Sequelize = require('sequelize');
//Importamos la configuraciones de la BASE DE DATOS
const db = require('../../config/databases/configDataBase');
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});

//Importamos las constantes
// const constants = require('../../service/adminCompany/constant');
const constants = require('../../service/adminProduct/constant');

///Creamos el MODELO de la Tabla LOGIN
const Measure = db.define(
    'measure',
    {
        idmeasure : {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        identifierbus : {
            type : Sequelize.STRING,
        },
        unitmeasure : {
            type : Sequelize.STRING,
            default : constants.unitDefault
        },
        descriptionmeasure : {
            type : Sequelize.STRING,
            defaultValue : constants.unitDefault
        },
       
        
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
module.exports = Measure;