//
require('dotenv').config({ path : '../../const.env'});
//Importamos FS
const fs = require('fs');
//Importamos el MODELLO
const AdminCompanyModel = require('../../model/adminCompany/adminCompanyModel');

//===================================
module.exports = async(req, res, next) => {
    try {
        //
        const identifiercom = req.body.identifiercom;
        
        const consultationDirection = await AdminCompanyModel.findAll({
            where : {
                identifiercom : identifiercom,
            },
            raw : true,
            attributes : ['directionimgcom'],
        })
        const direction = consultationDirection[0].directionimgcom;
        const nameFile = direction.split('/');

        if(nameFile[6] !== 'no-image.jpg'){
            await fs.unlinkSync(__dirname + `\\..\\..\\public\\img\\company\\${nameFile[6]}`);   
        }

        next();
    } catch (error) {
        res.json({ response : 'error'})
    }
}