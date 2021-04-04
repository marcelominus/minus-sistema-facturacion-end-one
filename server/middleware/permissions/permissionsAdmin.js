//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});
//
const LoginModel = require('../../model/login/loginModel');
//------------------------------------------
module.exports = function (req, res, next) {

  try {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const role = req.user.role;
    if( role === 'admin-all'){
        // next();
        res.json({ response : 'validate'});
    }else{
        res.json({ response : 'no-permits'});
    }
  } catch (error) {
    return res.json({ response: "token-fail" });
  }
};
