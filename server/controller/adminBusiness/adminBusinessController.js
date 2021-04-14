//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});
const uuid = require('uuid');
const shortid = require('shortid');
//Importamos OP de SEQUELIZE para las operaciones OR y AND
const Op = require('Sequelize').Op;
//Importamos el MODELL
const AdminBusinessModel = require('../../model/adminBusiness/adminBusinessModel');
const AdminCompanyModel = require('../../model/adminCompany/adminCompanyModel');
const LoginModel = require('../../model/login/loginModel');
//Importamos los SERVICE 

//Importamos las variables de constantes
//=================================================
exports.createBusiness = async (req,res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;
    //VARIABLES DE ENTRADA
    const {identifiercom, namebus, ofbus, citybus, placebus, directionbus, economicactivitybus} = req.body;
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
            
            const consultationNameBus = await AdminBusinessModel.count({
                where : {
                    namebus : namebus,
                    identifiercom : identifiercom
                },
                raw : true
            });
            if(consultationNameBus != 0 ){
                res.json({ response : 'duplicate'});
            }else{
                const identifierEnd  = `${shortid.generate()}/bus`;
                //
                const createUser = await AdminBusinessModel.create({
                    identifiercom : identifiercom , 
                    identifierbus : identifierEnd,
                    namebus : namebus,
                    ofbus : ofbus,
                    citybus : citybus,
                    placebus : placebus,
                    directionbus : directionbus,
                    economicactivitybus : economicactivitybus
                });
                if(createUser){
                    res.json({ response : 'success' , data : identifierEnd});
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
exports.readBusiness = async(req, res) => {
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
            const consultationBusiness  = await AdminBusinessModel.findAll({
                raw : true
            });

            let array =  [];

            Promise.all(
               consultationBusiness.map( async (e) => {
                    const consultationNameCompany = await AdminCompanyModel.findAll({
                        where : {
                            identifiercom : e.identifiercom
                        },
                        raw : true,
                        attributes : ['namecom'],
                    })
                    return consultationNameCompany;
                })
            ).then( async (e) => {
                // console.log('=======================');
                // console.log(e);
                // e.forEach(element => {
                //     console.log(element[0].namecom);
                // });
                for (let i = 0; i < consultationBusiness.length; i++) {
                    // console.log(consultationBusiness[i]);  
                    console.log(e[i][0].namecom);
                    consultationBusiness[i].namecom = e[i][0].namecom;
                    console.log(consultationBusiness);          
                }
                if( consultationBusiness.length === 0 ){
                    res.json({ response : 'empty'})
                }else{
                    res.json({ response : 'success' , data : consultationBusiness});
                }
            })
           
           
            //LECTURA TOTAL DE SOLO USER => ADMIN / (admin)
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//=============================================================================
//Modificar datos de BUSINESS
exports.updateBusiness = async(req, res)=> {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    const {identifiernew, namebus, ofbus, citybus, placebus, directionbus, economicactivitybus} = req.body;
    
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
            const updateBusiness  = await AdminBusinessModel.update({
                namebus : namebus,
                ofbus : ofbus,
                citybus : citybus,
                placebus : placebus,
                directionbus : directionbus,
                economicactivitybus : economicactivitybus
            }, {
                where : {
                    identifierbus : identifiernew
                }
            })
            if( updateBusiness ){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-update'})
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//
exports.deleteBusiness = async(req, res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    const {identifiernew} = req.body;

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
            const deleteBusiness = await AdminBusinessModel.destroy({
                where : {
                    identifierbus : identifiernew
                }
            });
            if(deleteBusiness){
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
