//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});
const shortid = require('shortid');
const Op = require('Sequelize').Op;

//Importamos el MODELL
const LoginModel = require('../../model/login/loginModel');
const AdminProductModel = require('../../model/adminProduct/adminProductModel');
//Importamos los SERVICE 
const constants = require('../../service/adminProduct/constant');

//=================================================
exports.createProduct = async (req,res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;
    //VARIABLES DE ENTRADA
    const {identifierbus, shortdescriptionpro, longdescriptionpro, unitmeasurepro, pricepro } = req.body;
    
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
            const consultationProduct = await AdminProductModel.count({
                where : {
                    identifierbus : identifierbus,
                    [Op.or]: [
                        {shortdescriptionpro : shortdescriptionpro},
                    ]
                },
                raw : true
            });

            if(consultationProduct != 0 ){
                res.json({ response : 'duplicate'});
            }else{
                // 
                const identifierEnd  = `${shortid.generate()}/pro`;
                // 
                const createProduct = await AdminProductModel.create({
                    identifierbus : identifierbus,
                    identifierpro : identifierEnd,
                    shortdescriptionpro : shortdescriptionpro,
                    longdescriptionpro : longdescriptionpro,
                    unitmeasurepro : unitmeasurepro,
                    pricepro : pricepro,
                    
                });
                if(createProduct){
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
exports.readProduct = async(req, res) => {
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
            const consultationProduct  = await AdminProductModel.findAll({
                where : {
                    identifierbus : identifierbus,
                },
                raw : true
            });
            if( consultationProduct === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , data : consultationProduct});
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//=============================================================================
//Modificar datos de USUARIOS
exports.updateProduct = async(req, res)=> {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    const { identifierpro,  shortdescriptionpro, longdescriptionpro, unitmeasurepro, pricepro} = req.body;
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
            const updateProduct  = await AdminProductModel.update({
                    shortdescriptionpro : shortdescriptionpro,
                    longdescriptionpro : longdescriptionpro,
                    unitmeasurepro : unitmeasurepro,
                    pricepro : pricepro,
                    
            },{
                where : {
                    identifierpro : identifierpro
                }
            })
            if( updateProduct ){
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
exports.deleteProduct = async(req, res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    const {identifierpro} = req.body;

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
            const deleteProduct = await AdminProductModel.destroy({
                where : {
                    identifierpro : identifierpro
                }
            });
            if(deleteProduct){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-delete' })
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}


//==========================================
exports.updateImgCompany = async(req, res) => {
    try {
        //
        const {identifierpro}= req.body;
        
        //
        if(typeof req.img == 'undefined'){
            res.json({ response : 'empty'});
        }else{
            const directionUniqueUpdateProduct = constants.productNew + req.img;
            const updateProduct = await AdminProductModel.update({
                directionimagepro : directionUniqueUpdateProduct
            },{
                where : {
                    identifierpro : identifierpro
                }
            });
            if( updateProduct){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-update'})
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'})
    }
}
