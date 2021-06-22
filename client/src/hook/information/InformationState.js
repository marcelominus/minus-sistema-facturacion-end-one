import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import informationContext from "./informationContext";
import informationReducer from "./informationReducer";

// Importamos los TYPES
import {
  INFORMATION_OPEN_MODAL,
  INFORMATION_ARRAY_INFORMATION,
  INFORMATION_ARRAY_INFORMATION_BILL,
} from "../../utils/index";
// Importamos las direcciones de LOGIN
import { direction_admin_information_read } from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";

//================================================================
//INICIO DE CLASE
//================================================================
const InformationState = (props) => {
  const initialState = {
    modalopeninformation: false, //ARRAY PRINCIPAL CONTENEDOR DE COMPANIAS
    arrayinformation: [],
    arrayinformationbill: [],
  };
  const [state, dispatch] = useReducer(informationReducer, initialState);
  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  const functionOpenModal = (valor) => {
    dispatch({
      type: INFORMATION_OPEN_MODAL,
      payload: valor,
    });
  };

  //******************************************************************************
  const functionReadInformation = async (value_1, value_2) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_information_read;
      const petitionReadDosage = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
        year: value_1,
        month: value_2,
      });
      const solutionPetitionRead = petitionReadDosage.data;
      if (solutionPetitionRead.response == "empty") {
        return false;
      } else {
        dispatch({
          type: INFORMATION_ARRAY_INFORMATION,
          payload: solutionPetitionRead.information,
        });
        dispatch({
          type: INFORMATION_ARRAY_INFORMATION_BILL,
          payload: solutionPetitionRead.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <informationContext.Provider
      value={{
        modalopeninformation: state.modalopeninformation,
        arrayinformation: state.arrayinformation,
        arrayinformationbill: state.arrayinformationbill,
        functionOpenModal,
        functionReadInformation,
      }}
    >
      {props.children}
    </informationContext.Provider>
  );
};

export default InformationState;
