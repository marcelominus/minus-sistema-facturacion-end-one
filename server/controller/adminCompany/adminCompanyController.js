//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});
const uuid = require('uuid');
const shortid = require('shortid');
//Importamos OP de SEQUELIZE para las operaciones OR y AND
const Op = require('Sequelize').Op;
//Importamos el MODELL
const AdminCompanyModel = require('../../model/adminCompany/adminCompanyModel');
const LoginModel = require('../../model/login/loginModel');
//Importamos los SERVICE 

//Importamos las variables de constantes
const constants = require('../../service/adminCompany/constant');

//=================================================
exports.createCompany = async (req,res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;
    //VARIABLES DE ENTRADA
    const {namecom, nitcom, telephonecom, emailcom, coincom, citycom, placecom, directioncom, ofcom, codecom} = req.body;

    //
    try {
        //Verifica la existencia del usuario que realiza la peticion
        const consultationUser = await LoginModel.findAll({
            where : {
                identifier : identifier,
                role : role
            },
            attributes : ['email'],
            raw : true
        });
        if( consultationUser === 0 ){
            res.json({ response : 'empty'});
        }else{
            //Verificamos que no se repita datos al inscribir un usuario
            
            const consultationNameCompany = await AdminCompanyModel.count({
                where : {
                    [Op.or]: [
                        {namecom: namecom},
                        {nitcom : nitcom} 
                    ]
                },
                raw : true
            });
            if(consultationNameCompany != 0 ){
                res.json({ response : 'duplicate'});
            }else{
                const identifierEnd  = `${shortid.generate()}/com`;
                //
                const createUser = await AdminCompanyModel.create({
                    identifiercom : identifierEnd,
                    namecom : namecom,
                    nitcom :nitcom,
                    telephonecom : telephonecom,
                    emailcom : emailcom,
                    coincom : coincom,
                    citycom : citycom,
                    placecom : placecom,
                    directioncom : directioncom,
                    ofcom : ofcom,
                    codecom : codecom
                });
                if(createUser){
                    res.json({ response : 'success', data : identifierEnd});
                }else{
                    res.json({ response : 'fail-create'});
                }
            }
            //
        }
    } catch (error) {
        console.log(error);
        res.json({ response : 'fail-server'});
    }
}

//=================================================================
//Lectura de la informacion de Login Usuario
exports.readCompany = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;

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
            const consultationCompany  = await AdminCompanyModel.findAll({
                raw : true
            });
            if( consultationCompany.length === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , data : consultationCompany});
            }
            //LECTURA TOTAL DE SOLO USER => ADMIN / (admin)
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//=============================================================================
//Modificar datos de BUSINESS
exports.updateCompany = async(req, res)=> {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    //VARIABLES DE ENTRADA
    const {identifiercom, namecom, nitcom, telephonecom, emailcom, coincom, citycom, placecom, directioncom, ofcom, codecom} = req.body;
    //
    //
    try {
        //Verifica la existencia del usuario que realiza la peticion
        const consultationUser = await LoginModel.findAll({
            where : {
                identifier : identifier,
                role : role
            },
            attributes : ['email'],
            raw : true
        });
        if( consultationUser === 0 ){
            res.json({ response : 'empty'});
        }else{
            //Verificamos que no se repita datos al inscribir un usuario
            const identifierEnd  = identifiercom;

            const updateCompany  = await AdminCompanyModel.update({
                namecom : namecom,
                nitcom :nitcom,
                telephonecom : telephonecom,
                emailcom : emailcom,
                coincom : coincom,
                citycom : citycom,
                placecom : placecom,
                directioncom : directioncom,
                ofcom : ofcom,
                codecom : codecom
            }, {
                where : {
                    identifiercom : identifierEnd
                }
            })
            if( updateCompany ){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-update'})
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ response : 'fail-server'});
    }
}

//
exports.deleteCompany = async(req, res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //
    const {identifiercom} = req.body;

    //VARIABLES DE ENTRADA

    try {
        //Verifica la existencia del usuario que realiza la peticion
        const consultationUser = await LoginModel.findAll({
            where : {
                identifier : identifier,
                role : role
            },
            attributes : ['email'],
            raw : true
        });
        if( consultationUser === 0 ){
            res.json({ response : 'empty'});
        }else{
            const deleteCompany = await AdminCompanyModel.destroy({
                where : {
                    identifiercom : identifiercom
                }
            });
            if(deleteCompany){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-delete' })
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ response : 'fail-server'});
    }
}

//==========================================
exports.updateImgCompany = async(req, res) => {
    try {
        //
        const {identifiercom}= req.body;
        
        //
        if(typeof req.img == 'undefined'){
            res.json({ response : 'empty'});
        }else{
            const directionUniqueUpdateLogo = constants.logoNew + req.img;
            const updateLogo = await AdminCompanyModel.update({
                directionimgcom : directionUniqueUpdateLogo
            },{
                where : {
                    identifiercom : identifiercom
                }
            });
            if( updateLogo){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-update'})
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'})
    }
}
