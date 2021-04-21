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
const UserState = (props) => {
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
  const functionCreateUser = async (
    value_1,
    value_2,
    value_3,
    value_4,
    value_5,
    value_6,
    value_7
  ) => {
    //Extraer el TOKEN del LOCAL STORE
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenCompany = localStorage.getItem("tokencompany");
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_user_create;
      const petitionCreateUser = await clienteAxios.post(url, {
        identifiercom: dataTokenCompany,
        identifierbus: dataTokenBusiness,
        name: value_1,
        surname: value_2,
        user: value_3,
        email: value_4,
        ci: value_5,
        password: value_6,
        rolenew: value_7,
      });

      const solutionPetitionCreate = petitionCreateUser.data;
      if (solutionPetitionCreate.response == "success") {
        return solutionPetitionCreate.data;
      } else {
        return solutionPetitionCreate.response;
      }
    } catch (error) {
      return false;
    }
  };

  //******************************************************************************
  const functionReadUser = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenCompany = localStorage.getItem("tokencompany");
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_user_read;
      const petitionReadUser = await clienteAxios.post(url, {
        identifiercom: dataTokenCompany,
        identifierbus: dataTokenBusiness,
      });
      const solutionPetitionRead = petitionReadUser.data;
      if (solutionPetitionRead.response == "empty") {
        dispatch({
          type: USER_READ,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: USER_READ,
          payload: solutionPetitionRead.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  const functionModalUpdate = (valor) => {
    dispatch({
      type: USER_MODAL_UPDATE,
      payload: valor,
    });
  };
  //-----------------------------------------------------------------
  //FUNCION PAR APODER COPIAR EL LINK SELECCIONADO
  const functionArrayUpdateUser = (valor) => {
    dispatch({
      type: USER_ARRAY_UPDATE,
      payload: valor,
    });
  };
  //-----------------------------------------------------------------
  //Function de CAMBIO DE BUSINESS
  const functionUpdateUser = async (
    value_1,
    value_2,
    value_3,
    value_4,
    value_5,
    value_6,
    value_7,
    value_8
  ) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenCompany = localStorage.getItem("tokencompany");
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_user_update;
      const petitionUpdateUser = await clienteAxios.post(url, {
        identifiercom: dataTokenCompany,
        identifierbus: dataTokenBusiness,
        name: value_1,
        surname: value_2,
        user: value_3,
        email: value_4,
        ci: value_5,
        password: value_6,
        rolenew: value_7,
        identifiernew: value_8,
      });
      const solutionPetitionUpdate = petitionUpdateUser.data;
      if (solutionPetitionUpdate.response == "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------------------
  //FUNCION BORRAR COMPANY
  const functionDeleteUser = async (valor) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_user_delete;
      const petitionDeleteUser = await clienteAxios.post(url, {
        identifiernew: valor,
      });
      const solutionPetitionDelete = petitionDeleteUser.data;
      if (solutionPetitionDelete.response == "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
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
        functionCreateUser,
        functionReadUser,
        functionModalUpdate,
        functionArrayUpdateUser,
        functionUpdateUser,
        functionDeleteUser,
      }}
    >
      {props.children}
    </userContext.Provider>
  );
};

export default UserState;
