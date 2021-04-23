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
const Product = db.define(
    'product',
    {
        idproduct : {
            type: Sequelize.INTEGER,
            primaryKey : true,
            autoIncrement : true
        },
        identifierbus : {
            type : Sequelize.STRING,
        },
        identifierpro: {   
            type : Sequelize.STRING,
        },
        // codepro : {
        //     type : Sequelize.STRING,
        // },
        shortdescriptionpro : {
            type : Sequelize.STRING,
        },
        longdescriptionpro : {
            type : Sequelize.TEXT,
        },
        unitmeasurepro : {
            type : Sequelize.STRING,
        },
        pricepro : {
            type : Sequelize.STRING,
        },
        // directionimagepro : {
        //     type : Sequelize.STRING,
        //     defaultValue : constants.productDefault
        // },
        // conditionpro : {
        //     type : Sequelize.STRING,
        // },
        // dateentrypro : {
        //     type : Sequelize.STRING,
        // },
    }, {
        charset: 'utf8',
        collate: 'utf8_unicode_ci'
    }
)
module.exports = Product;