//Importamos SEQUELIZE
const Sequelize = require('sequelize');
//Importamos la configuraciones de la BASE DE DATOS
const db = require('../../config/databases/configDataBase');
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});

//Importamos las constantes

///Creamos el MODELO de la Tabla LOGIN
const Bill = db.define(
    'bill',
    {
        idbill : {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        identifierbill : {
            type : Sequelize.STRING,
        },
        identifierbus : {
            type : Sequelize.STRING,
        },
        identifierdos : {
            type : Sequelize.STRING,
        },
        numberbill : {
            type : Sequelize.STRING,
        },
        nitbill : {
            type : Sequelize.STRING,
        },
        reasonbill : {
            type : Sequelize.STRING,
        },
        datepresentbill : {
            type : Sequelize.DATE,
        },
        paymenttypebill : {
            type : Sequelize.STRING,
        },
        productsbill : {
            type : Sequelize.TEXT,
        },
        totalbill : {
            type : Sequelize.STRING,
        },
        controlcodebill : {
            type : Sequelize.STRING,
        },
        conditionbill : {   //anulada o valida
            type : Sequelize.STRING,
            defaultValue : 'valid'
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
module.exports = Bill;