//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});

//Importamos el MODELL
const LoginModel = require('../../model/login/loginModel');
const AdminMeasureModel = require('../../model/adminProduct/adminMeasureModel');
//Importamos los SERVICE 


//=================================================
exports.createMeasure = async (req,res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;
    //VARIABLES DE ENTRADA
    const {identifierbus, unitmeasure, descriptionmeasure} = req.body;
    
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
            const consultationMeasure = await AdminMeasureModel.count({
                where : {
                    identifierbus : identifierbus,
                    unitmeasure : unitmeasure
                },
                raw : true
            });

            if(consultationMeasure != 0 ){
                res.json({ response : 'duplicate'});
            }else{
                const createMeasure = await AdminMeasureModel.create({
                    identifierbus : identifierbus,
                    unitmeasure : unitmeasure,
                    descriptionmeasure : descriptionmeasure
                });
                if(createMeasure){
                    res.json({ response : 'success'});
                }else{
                    res.json({ response : 'fail-create'});
                }
            }
        }
    } catch (error) {
        console.log(error);
        res.json({ response : 'fail-server'});
    }
}

//=================================================================
//Lectura de la informacion de Login Usuario
exports.readMeasure = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;
    const {identifierbus} = req.body;
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
            const consultationMeasure  = await AdminMeasureModel.findAll({
                where : {
                    identifierbus : identifierbus,
                },
                raw : true
            });
            if( consultationMeasure === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , data : consultationMeasure});
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//=============================================================================
//Modificar datos de USUARIOS
exports.updateMeasure = async(req, res)=> {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    const {identifierbus, idmeasure, unitmeasure, descriptionmeasure} = req.body;
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
            const updateMeasure  = await AdminMeasureModel.update({
               unitmeasure : unitmeasure,
               descriptionmeasure : descriptionmeasure 
            },{
                where : {
                    idmeasure : idmeasure,
                    identifierbus : identifierbus
                }
            })
            if( updateMeasure ){
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
exports.deleteMeasure = async(req, res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    const {idmeasure} = req.body;

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
            const deleteMeasure = await AdminMeasureModel.destroy({
                where : {
                    idmeasure : idmeasure,
                }
            });
            if(deleteMeasure){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-delete' })
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}
