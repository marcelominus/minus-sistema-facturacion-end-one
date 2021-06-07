//Importamos las variables de entorno
require('dotenv').config({ path : '../const.env'});
//Importamos el MODELL
const LoginModel = require('../../model/login/loginModel');
//Importamos los SERVICE 
const getToken = require('../../service/login/getToken');

//Importamos las variables de constantes


//=================================================
exports.loginEntry = async(req, res) => {
    try {
        //Variables dentrada USER PASS attributes
        const { user, pass} = req.body;

        //Realizamos la consulta a la BASE DE DATOS de LOGIN
        const loginDate = await LoginModel.findAll({
            where : {
                user : user,
                password : pass
            },
            attributes : ['identifier', 'role'],
            raw : true
        });

        //Si encuentra el valor entonces CODIFICA un TOKEN
        if(loginDate.length !== 0){
            //Encriptamos el valor de la variable de EMAIL y lo anadimos al TOKEN
            const identifierUser = loginDate[0].identifier;
            const roleUser = loginDate[0].role;
            const tokenAuth = getToken(identifierUser, roleUser);
            
            //Enviamos como respuesta el TOKEN con el EMAIL ENCRIPTADO
            res.json({ response : 'success', data : tokenAuth});
        }else{
            res.json({ response : 'empty'});
        }
    } catch (error) {
        res.json({ response : 'fail-server'})
    }
}

//------------------------------------------------------------------------------
//Lectura de la informacion de Login Usuario
exports.readLogin = async(req, res) => {
    //IDENTIFICA AL USUARIO CON SU ID Y SU ROL PARA LOS NOMBRES DE INICIO
    const identifier = req.user.identifier;
    const role = req.user.role;
    
    try {
        const consultationLogin  = await LoginModel.findAll({
            where : {
                identifier : identifier,
                role : role
            },
            attributes : ['identifiercom','identifierbus','name', 'surname', 'email', 'avatar', 'role'],
            raw : true
        });
        if( consultationLogin === 0 ){
            res.json({ response : 'empty'})
        }else{
            res.json({ response : 'success' , data : consultationLogin});
        }
    } catch (error) {
        res.json({ response : 'fail-server'})
    }
}


exports.readAuthenticate = async(req, res) => {
   //Respuesta de CORRECTO
    res.json({ response : 'success'})
}