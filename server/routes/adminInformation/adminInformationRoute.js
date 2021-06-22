//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const adminInformationController = require('../../controller/adminInformation//adminInformationController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');
//=====================================
module.exports = () => {
     //ROUTAS DE LOGIN
    router.post('/information-pdf', auth, adminInformationController.createInformationPdf);
    router.post('/information-txt', auth, adminInformationController.createInformationTxt);
    // router.post('/information-txt', auth, adminDosageController.readDosage);
   
    return router;
}
