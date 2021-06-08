import React, { useReducer } from "react";
//***************************************************************** */
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//***************************************************************** */
//Importamos los CONTEXT
import loginContext from "./loginContext";
import loginReducer from "./loginReducer";
//***************************************************************** */
//Importamos los TYPES
import {
  PETITION_LOGIN,
  PETITION_AUTHENTICATED,
  PETITION_EXIT_LOGIN,
} from "../../utils/index";
//***************************************************************** */
//Importamos las direcciones de LOGIN
import {
  direccion_admin_login,
  direccion_autenticado_user,
  direction_admin_login_read_authenticate,
} from "../../resource/js/directions";
//***************************************************************** */
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const LoginState = (props) => {
  const initialState = {
    authenticated: false,
    informationUser: [],
  };
  const [state, dispatch] = useReducer(loginReducer, initialState);

  //-----------------------------------------------------------------
  //ZONE FUNCTION

  //Funcion que envia los valores de USER Y PASS
  /**Se crea las variables de LOCALSTORAGE variables persistentes
   * Se recibe el TOKEN de AUTENTIFICACION  y se guarda
   * y se pasa a la siguiente funcion autentifica
   */
  const funcionPeticionLogin = async (value_1, value_2) => {
    try {
      const url = direccion_admin_login;
      const petitionLogin = await clienteAxios.post(url, {
        user: value_1,
        pass: value_2,
      });
      const consultationPetitionLogin = petitionLogin.data;
      if (consultationPetitionLogin.response == "success") {
        dispatch({
          type: PETITION_LOGIN,
          payload: consultationPetitionLogin.data,
        });
        return funcionAutentificarUsuario();
      } else {
        return consultationPetitionLogin.response;
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  //*******************************************************
  //FUNCIO NDE AUTENTIFICAR USUARIO
  const funcionAutentificarUsuario = async () => {
    //-----------------------------------------------------------------
    //Extraer el TOKEN del LOCAL STORE y ANADIRLO A LA CABEZERA
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    //-----------------------------------------------------------------
    //Si existe el usuario se CARGA la INFORMACION DE USUARIO
    try {
      const url = direccion_autenticado_user;
      const peticionAutentificacion = await clienteAxios.post(url);
      const respuestaAutentificacion = peticionAutentificacion.data;
      if (respuestaAutentificacion.response === "success") {
        dispatch({
          type: PETITION_AUTHENTICATED,
          payload: respuestaAutentificacion.data,
        });
        return respuestaAutentificacion.response;
      } else {
        return respuestaAutentificacion.response;
      }
    } catch (error) {
      //Forma de extraer un ERROR CATCH console.log(error.response.data.msg);
      console.log(error);
      return false;
    }
  };

  const functionAuthenticate = async () => {
    //-----------------------------------------------------------------
    //Extraer el TOKEN del LOCAL STORE y ANADIRLO A LA CABEZERA
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    //-----------------------------------------------------------------
    //Si existe el usuario se CARGA la INFORMACION DE USUARIO
    try {
      const url = direction_admin_login_read_authenticate;
      const peticionAutentificacion = await clienteAxios.post(url);
      const respuestaAutentificacion = peticionAutentificacion.data;
      if (respuestaAutentificacion.response === "success") {
        return true;
      } else {
        return respuestaAutentificacion.response;
      }
    } catch (error) {
      //Forma de extraer un ERROR CATCH console.log(error.response.data.msg);
      return false;
    }
  };

  const functionExitLogin = () => {
    dispatch({
      type: PETITION_EXIT_LOGIN,
    });
  };
  //=====================================================
  //INICIO DE COMPONENTE
  //=====================================================
  return (
    <loginContext.Provider
      value={{
        authenticated: state.authenticated,
        informationUser: state.informationUser,
        funcionPeticionLogin,
        funcionAutentificarUsuario,
        functionAuthenticate,
        functionExitLogin,
      }}
    >
      {props.children}
    </loginContext.Provider>
  );
};

export default LoginState;
