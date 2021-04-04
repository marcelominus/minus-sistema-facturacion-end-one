//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const adminCompanyController = require('../../controller/adminCompany/adminCompanyController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');
const upload = require('../../middleware/adminCompany/uploadImage');
const modify = require('../../middleware/adminCompany/modifyImage');
const filenameImg = require('../../middleware/adminCompany/filenameImage');

//=====================================
module.exports = () => {
     //ROUTAS DE LOGIN
     router.post('/company-all-create', auth, adminCompanyController.createCompany);
     router.post('/company-all-read', auth, adminCompanyController.readCompany);
     router.post('/company-all-update', auth, adminCompanyController.updateCompany);
     router.post('/company-all-delete', auth, adminCompanyController.deleteCompany);
     //
     router.post('/company-all-update-img', auth, upload, modify, filenameImg, adminCompanyController.updateImgCompany);
     // 
     return router;
}

