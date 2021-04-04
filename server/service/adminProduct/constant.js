//Declaramos las constantes de direcciones necesarias
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});
//Direccion GLOBAL DE IMAGENES
//Invocamos las variables de entorno
const IP_SERVER = process.env.IP_SERVER;
const PORT_SERVER = process.env.PORT_SERVER;

//Direccion GLOBAL DE IMAGENES
const direction_basic = `http://${IP_SERVER}:${PORT_SERVER}`;

///================================================LOGIN CONTROLLER
/** DIRECCION DE  imagen de AVATAR DEFAULT*/
module.exports.unitDefault    = `Ninguno`;
/** DIRECCION DE  imagen de AVATAR DEFAULT*/
module.exports.productDefault    = `${direction_basic}/state/img/product/no-product.jpg`;
/** DIRECCION DE  imagen de AVATAR CAMBIADO */
module.exports.productNew        = `${direction_basic}/state/img/product/`;