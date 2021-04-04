//Importamos SEQUELIZE
const Sequelize = require('sequelize');
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});

//================================================
//Extraemos las variables globales de usuario
const DATA_BASE         = process.env.DATA_BASE;
const USER_DATA_BASE    = process.env.USER_DATA_BASE;
const PASS_DATA_BASE    = process.env.PASS_DATA_BASE;
const HOST_DATA_BASE    = process.env.HOST_DATA_BASE;
const PORT_DATA_BASE    = process.env.PORT_DATA_BASE;

const sequelize = new Sequelize(DATA_BASE, USER_DATA_BASE,PASS_DATA_BASE,{
    host: HOST_DATA_BASE,
    dialect: "mysql",
    port: PORT_DATA_BASE,
    operatorsAliases: false,
    define: {
      timestamps: false,
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
});

//Exportamos el modulo de DB
module.exports = sequelize;
