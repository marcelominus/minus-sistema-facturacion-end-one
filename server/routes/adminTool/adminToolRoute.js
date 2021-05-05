//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
// const adminDosageController = require('../../controller/adminDosage/adminDosageController');
// const adminProductController = require('../../controller/adminProduct/adminProductController');
const adminToolController = require('../../controller/adminTool/adminToolController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');

//=====================================
module.exports = () => {
     //ROUTAS DE LOGIN
    router.post('/tool-all-read', auth, adminToolController.readToolAll);
    router.post('/tool-all-read-selection', auth, adminToolController.readToolAllSelection);
    return router;
}
