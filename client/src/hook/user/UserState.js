import React, { useReducer } from "react";
//Importamos los CONTEXT
import userContext from "./userContext";
import userReducer from "./userReducer";
//***************************************************************** */
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//****************************************************************
//Importamos los TYPES
import {
  USER_CREATE,
  USER_READ,
  USER_UPDATE,
  USER_MODAL_UPDATE,
  USER_ARRAY_UPDATE,
  USER_DELETE,
} from "../../utils/index";

//****************************************************************
//Importamos las direcciones de LOGIN
import {
  direction_admin_user_create,
  direction_admin_user_read,
  direction_admin_user_update,
  direction_admin_user_delete,
} from "../../resource/js/directions";

//****************************************************************
//Imortamos los componentes necesarios
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";
//------------------------------------------------------------------------
const ToolState = (props) => {
  //-----------------------------------------------------------------
  //INITIAL STATE
  //identifiercom, identifierbus, name, surname, user, email, ci, password, rolenew
  const initialState = {
    arrayuser: [], //ARRAY PRINCIPAL CONTENEDOR DE COMPANIAS
    modalupdateuser: false,
    arrayupdateuser: [
      {
        identifiercom: "",
        identifierbus: "",
        name: "",
        surname: "",
        user: "",
        email: "",
        ci: "",
        password: "",
        rolenew: "",
      },
    ],
  };
  //-----------------------------------------------------------------
  //REDUCER
  const [state, dispatch] = useReducer(userReducer, initialState);
  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  //-----------------------------------------------------------------
  //
  const functionCreateBusiness = async (
    value_1,
    value_2,
    value_3,
    value_4,
    value_5,
    value_6,
    value_7,
    value_8,
    value_9
  ) => {
    //Extraer el TOKEN del LOCAL STORE
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_user_create;
      const petitionCreateBusiness = await clienteAxios.post(url, {
        identifiercom: value_1,
        identifierbus: value_2,
        name: value_3,
        surname: value_4,
        user: value_5,
        email: value_6,
        ci: value_7,
        password: value_7,
        rolenew: value_7,
      });

      const solutionPetitionCreate = petitionCreateBusiness.data;
      if (solutionPetitionCreate.response == "success") {
        //Creamos la nueva variables para el acceso
        const newInformation = {
          namebus: value_1,
          ofbus: value_2,
          citybus: value_3,
          placebus: value_4,
          directionbus: value_5,
          economicactivitybus: value_6,
          identifierbus: solutionPetitionCreate.data,
        };
        dispatch({
          type: BUSINESS_CREATE,
          payload: newInformation,
        });
        return solutionPetitionCreate.data;
      } else {
        return solutionPetitionCreate.response;
      }
    } catch (error) {
      return false;
    }
  };
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <userContext.Provider
      value={{
        arrayuser: state.arrayuser,
        modalupdateuser: state.modalupdateuser,
        arrayupdateuser: state.arrayupdateuser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default ToolState;
