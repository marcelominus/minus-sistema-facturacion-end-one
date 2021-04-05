//Importamos el CLIENTE AXIOS
import clienteAxios from './axios';

//---------------------------------------------------
const tokenAuth = (token) => {
    //Si existe el TOKEN lo introducimos en el HEADER caso contrario
    //eliminamos el HEADER para vaciar el CLIENTE AXIOS
    if(token){
        clienteAxios.defaults.headers.common['x-auth-token'] = token;
    }else{
        delete clienteAxios.defaults.headers.common['x-auth-token'];
    }
}

export default tokenAuth;