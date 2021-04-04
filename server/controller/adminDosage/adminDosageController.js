//Importamos las variables de entorno
require('dotenv').config({ path : '../../const.env'});
const moment = require('moment');
//******************************************************************************
const uuid = require('uuid');
const shortid = require('shortid');
//Importamos OP de SEQUELIZE para las operaciones OR y AND
const Op = require('Sequelize').Op;
//Importamos el MODELL
const AdminDosageModel = require('../../model/adminDosage/adminDosageModel');
const LoginModel = require('../../model/login/loginModel');
//Importamos los SERVICE 

//Importamos las variables de constantes
//=================================================
exports.createBusiness = async (req,res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;
    //VARIABLES DE ENTRADA
    const {identifierbus, datestartdos, dateenddos, sfcdos, numberauthorizationdos, numbernotestartdos, dosagedos, legenddos, conditiondos} = req.body;
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
            
            const consultationDosageDos = await AdminDosageModel.count({
                where : {
                    [Op.or]: [
                        {dosagedos: dosagedos}, 
                    ]
                },
                raw : true
            });
            if(consultationDosageDos != 0 ){
                res.json({ response : 'duplicate'});
            }else{
                //
                const identifierEnd  = `${shortid.generate()}/dos`;
                //
                const a = moment(`${datestartdos}`,'M/D/YYYY');
                const b = moment(`${dateenddos}`,'M/D/YYYY');
                const diffDays = b.diff(a, 'days');
                //
                const createDosage = AdminDosageModel.create({
                    identifierdos : identifierEnd,
                    identifierbus : identifierbus,
                    datestartdos : datestartdos,
                    dateenddos : dateenddos,
                    sfcdos : sfcdos,
                    numberauthorizationdos : numberauthorizationdos,
                    numbernotestartdos : numbernotestartdos,
                    dosagedos : dosagedos,
                    legenddos : legenddos,
                    conditiondos : conditiondos,
                    dayremaindos : diffDays,
                });
                if(createDosage){
                    res.json({ response : 'success'});
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
exports.readDosage = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;

    //
    const {identifierbus} = req.body;
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
            const consultationDosage  = await AdminDosageModel.findAll({
                where : {
                    identifierbus : identifierbus
                },
                raw : true
            });
            if( consultationDosage === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , data : consultationDosage});
            }
            //LECTURA TOTAL DE SOLO USER => ADMIN / (admin)
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//=============================================================================
//Modificar datos de BUSINESS
exports.updateDosage = async(req, res)=> {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    const {identifierbus, identifierdos, datestartdos, dateenddos, sfcdos, numberauthorizationdos, numbernotestartdos, dosagedos, legenddos, conditiondos} = req.body;
    
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
            const updateDosage  = await AdminDosageModel.update({
                datestartdos : datestartdos,
                dateenddos : dateenddos,
                sfcdos : sfcdos,
                numberauthorizationdos : numberauthorizationdos,
                numbernotestartdos : numbernotestartdos,
                dosagedos : dosagedos,
                legenddos : legenddos,
                conditiondos : conditiondos
            }, {
                where : {
                    identifierbus : identifierbus,
                    identifierdos : identifierdos
                }
            })
            if( updateDosage ){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-update'})
            }
        }
    } catch (error) {
        res.json(error);
        res.json({ response : 'fail-server'});
    }
}


//
exports.deleteDosage = async(req, res) => {
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
            const deleteDosage = await AdminDosageModel.destroy({
                where : {
                    identifierdos : identifiernew
                }
            });
            if(deleteDosage){
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
