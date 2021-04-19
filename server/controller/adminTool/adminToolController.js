//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});
const uuid = require('uuid');
const shortid = require('shortid');
//Importamos el MODELL
const CompanyModel = require('../../model/adminCompany/adminCompanyModel');
const BusinessModel = require('../../model/adminBusiness/adminBusinessModel');
const LoginModel = require('../../model/login/loginModel');
//=================================================================
//Lectura de la informacion de Login Usuario
exports.readToolAll = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;
    //
    let arrayInformation = {};
    //
    const {identifiercom, identifierbus} = req.body;
    //
    try {
        const consultationUser = await LoginModel.findAll({
            where : {
                identifier : identifier,
                role : role
            },
            raw : true
        });
        if( consultationUser == 0 ){
            res.json({ response : 'empty'});
        }else{
            // LECTURA DE INFORMACION SOLO ALL => ADMIN, USER / (super admin)
            const consultationCompany  = await CompanyModel.findAll({
                where : {
                    identifiercom : identifiercom
                },
                raw : true
            });
            const consultationBusiness = await BusinessModel.findAll({
                where : {
                    identifierbus : identifierbus
                },
                raw : true
            })
            
            arrayInformation.identifiercom = consultationCompany[0].identifiercom,
            arrayInformation.namecom = consultationCompany[0].namecom;
            arrayInformation.identifierbus = consultationBusiness[0].identifierbus,
            arrayInformation.namebus = consultationBusiness[0].namebus;
            arrayInformation.nitcom = consultationCompany[0].nitcom;

            if( consultationCompany.length === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , data : arrayInformation});
            }
            
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}