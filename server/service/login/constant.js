//Declaramos las constantes de direcciones necesarias
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});
//Invocamos las variables de entorno
const IP_SERVER = process.env.IP_SERVER;
const PORT_SERVER = process.env.PORT_SERVER;

//Direccion GLOBAL DE IMAGENES
const direccion_basica = `http://${IP_SERVER}:${PORT_SERVER}`;

///================================================LOGIN CONTROLLER
/** DIRECCION DE  imagen de AVATAR DEFAULT*/
module.exports.directionAvatarAdminAll     = `${direccion_basica}/state/img/avatar/admin-all.jpg`;
/** DIRECCION DE  imagen de AVATAR CAMBIADO */
module.exports.directionAvatarAdmin        = `${direccion_basica}/state/img/avatar/admin.jpg`;
/** DIRECCION DE  imagen de AVATAR CAMBIADO */
module.exports.directionAvatarUser         = `${direccion_basica}/state/img/avatar/user.jpg`;
//================================================
module.exports.identifierbusAdmin = 'administration-all';
module.exports.identifiercomAdmin = 'administration-all';
module.exports.identifierRole = 'user';

