//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});
const uuid = require('uuid');
const shortid = require('shortid');
//Importamos OP de SEQUELIZE para las operaciones OR y AND
const Op = require('Sequelize').Op;
//Importamos el MODELL
const LoginModel = require('../../model/login/loginModel');
//Importamos los SERVICE 

//Importamos las variables de constantes
const constants = require('../../service/login/constant');

//=================================================
exports.createUserAll = async (req,res) => {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;
    //VARIABLES DE ENTRADA
    const {identifiercom, identifierbus, name, surname, user, email, ci, password, rolenew} = req.body;
    
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
            const consultationAllUser = await LoginModel.count({
                where : {
  
                    identifierbus : identifierbus,
                    [Op.or]: [
                        {name: name}, 
                        {surname : surname},
                        {user : user},
                    ]
                },
                raw : true
            });
            
            if(consultationAllUser != 0 ){
                res.json({ response : 'duplicate'});
            }else{
                //
                
                //
                let stringDate = '';
                //
                let variableOne = name.split(" ");
                let variableTwo = surname.split(" ");
                //
                variableOne.forEach(element => {
                    stringDate = `${stringDate}${element.charAt(0)}`;
                });
                //
                variableTwo.forEach(element => {
                    stringDate = `${stringDate}${element.charAt(0)}`;
                });
                //
                stringDate = stringDate.toUpperCase();
                stringDate = `${stringDate}${ci}`;

                const identifierEnd  = stringDate;
                
                //
                let avatar = '';
                let identifiercomVar = '';
                let identifierbusVar = '';

                if(rolenew == 'admin-all'){
                    avatar = constants.directionAvatarAdminAll;
                }else{
                    avatar = constants.directionAvatarUser;
                }
                identifierbusVar = identifierbus;
                identifiercomVar = identifiercom;
                //
                const createUser = await LoginModel.create({
                    identifiercom : identifiercomVar,
                    identifierbus : identifierbusVar,
                    identifier : identifierEnd,
                    name : name,
                    surname : surname,
                    user: user,
                    email : email,
                    ci: ci,
                    password : password,
                    role : rolenew,
                    avatar : avatar
                });
                if(createUser){
                    res.json({ response : 'success'});
                }else{
                    res.json({ response : 'fail-create'});
                }
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//=================================================================
//Lectura de la informacion de Login Usuario
exports.readUserAll = async(req, res) => {
    // res.json({ uno : req.usuario});
    const role = req.user.role;
    const identifier = req.user.identifier;
    //VARIABLES DE ENTRADA
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
            
            const consultationLogin  = await LoginModel.findAll({
                where : {
                    identifiercom : identifiercom,
                    identifierbus : identifierbus
                },
                attributes : ['identifier','name', 'surname', 'email', 'role'],
                raw : true
            });
            // LECTURA DE INFORMACION SOLO ALL => ADMIN, USER / (super admin)
            
            if( consultationLogin === 0 ){
                res.json({ response : 'empty'})
            }else{
                res.json({ response : 'success' , data : consultationLogin});
            }
            //LECTURA TOTAL DE SOLO USER => ADMIN / (admin)
            
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}

//=============================================================================
//Modificar datos de USUARIOS
exports.updateUserAll = async(req, res)=> {
    //VARIABLES DE ACCESO-VERIFICACION TOKEN
    const identifier = req.user.identifier;
    const role = req.user.role;

    //VARIABLES DE ENTRADA
    const {identifiernew, identifiercom, identifierbus, name, surname, user, email, ci, password, rolenew} = req.body;
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
            let avatar = '';
            let identifiercomVar = '';
            let identifierbusVar = '';
            //
            //
            let stringDate = '';
            //
            let variableOne = name.split(" ");
            let variableTwo = surname.split(" ");
            //
            variableOne.forEach(element => {
                stringDate = `${stringDate}${element.charAt(0)}`;
            });
            //
            variableTwo.forEach(element => {
                stringDate = `${stringDate}${element.charAt(0)}`;
            });
            //
            stringDate = stringDate.toUpperCase();
            stringDate = `${stringDate}${ci}`;
            const identifierEnd  = stringDate;
            //
            //
            if(rolenew == 'admin-all'){
                avatar = constants.directionAvatarAdminAll;
                identifiercomVar = constants.identifiercomAdmin;
                identifierbusVar = constants.identifierbusAdmin;
            }else{
                avatar = constants.directionAvatarUser;
                identifierbusVar = identifierbus;
                identifiercomVar = identifiercom;
            }
            //
            const updateUser  = await LoginModel.update({
                identifiercom : identifiercomVar,
                identifierbus : identifierbusVar,
                identifier : identifierEnd,
                name : name,
                surname : surname,
                user: user,
                email : email,
                password : password,
                role : rolenew,
                avatar : avatar
            }, {
                where : {
                    identifier : identifiernew
                }
            })
            if( updateUser ){
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
exports.deleteUserAll = async(req, res) => {
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
            const deleteUser = await LoginModel.destroy({
                where : {
                    identifier : identifiernew
                }
            });
            if(deleteUser){
                res.json({ response : 'success'})
            }else{
                res.json({ response : 'fail-delete' })
            }
        }
    } catch (error) {
        res.json({ response : 'fail-server'});
    }
}
