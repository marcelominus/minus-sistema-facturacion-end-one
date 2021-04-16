import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import businessContext from "./businessContext";
import businessReducer from "./businessReducer";

// Importamos los TYPES
import {
  BUSINESS_CREATE,
  BUSINESS_READ,
  BUSINESS_UPDATE,
  BUSINESS_MODAL_UPDATE,
  BUSINESS_ARRAY_UPDATE,
  BUSINESS_DELETE,
} from "../../utils/index";
// Importamos las direcciones de LOGIN
import {
  direction_admin_business_create,
  direction_admin_business_read,
  direction_admin_business_update,
  direction_admin_business_delete,
} from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";

//================================================================
//INICIO DE CLASE
//================================================================
const BusinessState = (props) => {
  const initialState = {
    arraybusiness: [], //ARRAY PRINCIPAL CONTENEDOR DE COMPANIAS
    modalupdatebusiness: false,
    arrayupdatebusiness: [
      {
        identifiercom: "",
        namebus: "",
        ofbus: "",
        citybus: "",
        placebus: "",
        directionbus: "",
        economicactivitybus: "",
      },
    ],
  };
  const [state, dispatch] = useReducer(businessReducer, initialState);

  //-----------------------------------------------------------------
  //
  const functionCreateBusiness = async (
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
      const url = direction_admin_business_create;
      const petitionCreateBusiness = await clienteAxios.post(url, {
        namebus: value_1,
        ofbus: value_2,
        citybus: value_3,
        placebus: value_4,
        directionbus: value_5,
        economicactivitybus: value_6,
        identifiercom: value_7,
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

  //******************************************************************************
  const functionReadBusiness = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_business_read;
      const petitionReadBusiness = await clienteAxios.post(url);
      const solutionPetitionRead = petitionReadBusiness.data;
      if (solutionPetitionRead.response == "empty") {
        dispatch({
          type: BUSINESS_READ,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: BUSINESS_READ,
          payload: solutionPetitionRead.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------------------
  //Function de CAMBIO DE BUSINESS
  const functionUpdateBusiness = async (
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
      const url = direction_admin_business_update;
      const petitionUpdateBusiness = await clienteAxios.post(url, {
        namebus: value_1,
        ofbus: value_2,
        citybus: value_3,
        placebus: value_4,
        directionbus: value_5,
        economicactivitybus: value_6,
        identifiercom: value_7,
        identifiernew: value_8,
      });
      const solutionPetitionUpdate = petitionUpdateBusiness.data;
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
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  const functionModalUpdate = (valor) => {
    dispatch({
      type: BUSINESS_MODAL_UPDATE,
      payload: valor,
    });
  };
  //-----------------------------------------------------------------
  //FUNCION PAR APODER COPIAR EL LINK SELECCIONADO
  const functionArrayUpdateBusiness = (valor) => {
    dispatch({
      type: BUSINESS_ARRAY_UPDATE,
      payload: valor,
    });
  };
  //-----------------------------------------------------------------
  //FUNCION BORRAR COMPANY
  const functionDeleteBusiness = async (valor) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_business_delete;
      const petitionDeleteBusiness = await clienteAxios.post(url, {
        identifiernew: valor,
      });
      const solutionPetitionDelete = petitionDeleteBusiness.data;
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
    <businessContext.Provider
      value={{
        arraybusiness: state.arraybusiness,
        modalupdatebusiness: state.modalupdatebusiness,
        arrayupdatebusiness: state.arrayupdatebusiness,
        functionCreateBusiness,
        functionReadBusiness,
        functionModalUpdate,
        functionArrayUpdateBusiness,
        functionUpdateBusiness,
        functionDeleteBusiness,
      }}
    >
      {props.children}
    </businessContext.Provider>
  );
};

export default BusinessState;
