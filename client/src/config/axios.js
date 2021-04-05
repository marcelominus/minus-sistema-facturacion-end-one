//Importamos la libreria de AXIOS
import axios from 'axios';
//Importamos las variables de constantes
import {IP_SERVER} from '../resource/js/constants';

//-----------------------------------------------
const clienteAxios = axios.create({
    baseUrl : IP_SERVER
});

export default clienteAxios;