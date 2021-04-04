//Importamos SEQUELIZE
const Sequelize = require('sequelize');
//Importamos la configuraciones de la BASE DE DATOS
const db = require('../../config/databases/configDataBase');
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});

//Importamos las constantes

///Creamos el MODELO de la Tabla LOGIN
const Dosage = db.define(
    'dosage',
    {
        iddosage : {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        identifierbus : {
            type : Sequelize.STRING,
        },
        identifierdos : {
            type : Sequelize.STRING,
        },
        datestartdos : {
            type : Sequelize.STRING,
        },
        dateenddos: {
            type : Sequelize.STRING,
        },
        sfcdos : {
            type : Sequelize.STRING,
        },
        numberauthorizationdos : {
            type : Sequelize.STRING,
        },
        numbernotestartdos : {
            type : Sequelize.STRING,
        },
        dosagedos : {
            type : Sequelize.TEXT,
        },
        legenddos : {
            type : Sequelize.TEXT,
        },
        conditiondos : {
            type : Sequelize.STRING,
        },
        dayremaindos : {
            type : Sequelize.STRING,
        }
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
module.exports = Dosage;