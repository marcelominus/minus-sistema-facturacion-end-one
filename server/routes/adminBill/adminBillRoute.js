//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
// const adminBusinessController = require('../../controller/adminBusiness/adminBusinessController');
const adminBillController = require('../../controller/adminBill/adminBillController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');

//=====================================
module.exports = () => {
     //ROUTAS DE LOGIN
     router.post('/bill-all-create', auth, adminBillController.createBill);
    //  router.post('/business-all-read', auth, adminBusinessController.readBusiness);
    //  router.post('/business-all-update', auth, adminBusinessController.updateBusiness);
    //  router.post('/business-all-delete', auth, adminBusinessController.deleteBusiness);
     // 
     return router;
}

