//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const adminAllUserController = require('../../controller/adminUser/adminAllUserController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');

//=====================================
module.exports = () => {
    //ROUTAS DE LOGIN
    router.post('/admin-all-create', auth, adminAllUserController.createUserAll);
    router.post('/admin-all-read', auth, adminAllUserController.readUserAll);
    router.post('/admin-all-update', auth, adminAllUserController.updateUserAll);
    router.post('/admin-all-delete', auth, adminAllUserController.deleteUserAll);

    // 
    return router;
}

