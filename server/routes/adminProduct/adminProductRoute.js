//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
// const adminDosageController = require('../../controller/adminDosage/adminDosageController');
const adminProductController = require('../../controller/adminProduct/adminProductController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');
const upload = require('../../middleware/adminProduct/uploadImage');
const modify = require('../../middleware/adminProduct/modifyImage');
const filenameImg  = require('../../middleware/adminProduct/filenameImage');
//=====================================
module.exports = () => {
     //ROUTAS DE LOGIN
    router.post('/product-all-create', auth, adminProductController.createProduct);
    router.post('/product-all-read', auth, adminProductController.readProduct);
    router.post('/product-all-update', auth, adminProductController.updateProduct);
    router.post('/product-all-delete', auth, adminProductController.deleteProduct);

     router.post('/product-all-update-img', auth, upload, modify, filenameImg, adminProductController.updateImgCompany);
    //
    return router;
}
