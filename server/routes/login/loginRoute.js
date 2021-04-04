//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const loginController = require('../../controller/login/loginController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');

//=====================================
module.exports = () => {
    //ROUTAS DE LOGIN
    router.post('/login', loginController.loginEntry);
    router.post('/login-read', auth, loginController.readLogin);
    // 
    return router;
}

