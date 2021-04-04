//Importamos la libreria de JSON WEB TOKEN
const jwt = require("jsonwebtoken");
//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});
//------------------------------------------
module.exports = function (req, res, next) {
  //Leemos la CONSTATE SECRETA
  const SECRET = process.env.SECRET;

  //Leer el token del header
  const token = req.header("x-auth-token");

  //Veriica si se envio TOKEN 
  if (!token) {
    return res.json({ response: "token-empty" });
  }

  try {
    //Realiza la comparacion del TOKEN sacando su palabra secreta codificada
    //Y la compara con la guardada en el SERVIDOR
    const encryption = jwt.verify(token, SECRET);
    
    //Crea la palabra REQ.USUARIO para poder usar mas adelante
    req.user = encryption.user;

    //Pasa al siguiente
    next();
  } catch (error) {
    return res.json({ response: "token-fail" });
  }
};
