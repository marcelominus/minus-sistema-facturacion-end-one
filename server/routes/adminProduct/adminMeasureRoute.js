//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const adminMeasureController = require('../../controller/adminProduct/adminMeasureController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');
//=====================================
module.exports = () => {
     //ROUTAS DE LOGIN
    router.post('/measure-all-create', auth, adminMeasureController.createMeasure);
    router.post('/measure-all-read', auth, adminMeasureController.readMeasure);
    router.post('/measure-all-update', auth, adminMeasureController.updateMeasure);
    router.post('/measure-all-delete', auth, adminMeasureController.deleteMeasure);
    //
    return router;
}
