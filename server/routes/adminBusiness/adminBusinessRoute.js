//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const adminBusinessController = require('../../controller/adminBusiness/adminBusinessController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');

//=====================================
module.exports = () => {
     //ROUTAS DE LOGIN
     router.post('/business-all-create', auth, adminBusinessController.createBusiness);
     router.post('/business-all-read', auth, adminBusinessController.readBusiness);
     router.post('/business-all-update', auth, adminBusinessController.updateBusiness);
     router.post('/business-all-delete', auth, adminBusinessController.deleteBusiness);
     // 
     return router;
}

