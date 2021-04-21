//Importamos EXPRESS
const express = require('express');
//Importamos ROUTER
const router = express.Router();
//Importamos el CONTROLLER
const adminDosageController = require('../../controller/adminDosage/adminDosageController');
//Importamos el MIDDLEWARE
const auth = require('../../middleware/login/authToken');
const rolePermission = require('../../middleware/permissions/permissionsAdmin');
//=====================================
module.exports = () => {
     //ROUTAS DE LOGIN
    router.post('/dosage-all-create', auth, adminDosageController.createDosage);
    router.post('/dosage-all-read', auth, adminDosageController.readDosage);
    router.post('/dosage-all-update', auth, adminDosageController.updateDosage);
    router.post('/dosage-all-delete', auth, adminDosageController.deleteDosage);
    //
    return router;
}
