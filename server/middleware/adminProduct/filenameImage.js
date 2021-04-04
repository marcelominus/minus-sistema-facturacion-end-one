//
require('dotenv').config({ path : '../../const.env'});
//Importamos FS
const fs = require('fs');
//Importamos el MODELLO
const AdminProductModel = require('../../model/adminProduct/adminProductModel')
//===================================
module.exports = async(req, res, next) => {
    try {
        //
        const identifierpro = req.body.identifierpro;
        
        const consultationDirection = await AdminProductModel.findAll({
            where : {
                identifierpro : identifierpro,
            },
            raw : true,
            attributes : ['directionimagepro'],
        })
        const direction = consultationDirection[0].directionimagepro;
        const nameFile = direction.split('/');

        if(nameFile[6] !== 'no-product.jpg'){
            await fs.unlinkSync(__dirname + `\\..\\..\\public\\img\\product\\${nameFile[6]}`);   
        }

        next();
    } catch (error) {
        console.log(error);
        res.json({ response : 'errosr'})
    }
}