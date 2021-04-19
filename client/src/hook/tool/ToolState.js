import React, { useReducer } from "react";
//Importamos los CONTEXT
import toolContext from "./toolContext";
import toolReducer from "./toolReducer";
//***************************************************************** */
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los TYPES
import {
  TOOL_SELECTION_INFORMATION_COMPANY,
  TOOL_SELECTION_INFORMATION_BUSINESS,
  TOOL_SELECTION_READ,
  TOOL_SELECTION,
} from "../../utils/index";
//Importamos las direcciones de LOGIN
import { direction_admin_tool_read } from "../../resource/js/directions";
//Imortamos los componentes necesarios
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";
//------------------------------------------------------------------------
const ToolState = (props) => {
  //-----------------------------------------------------------------
  //INITIAL STATE
  const initialState = {
    tableselection: false,
    arrayselection: [],
  };
  //-----------------------------------------------------------------
  //REDUCER
  const [state, dispatch] = useReducer(toolReducer, initialState);
  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  const functionSelectionInformationCompany = (valor) => {
    dispatch({
      type: TOOL_SELECTION_INFORMATION_COMPANY,
      payload: valor,
    });
  };

  const functionSelectionInformationBusiness = (valor) => {
    dispatch({
      type: TOOL_SELECTION_INFORMATION_BUSINESS,
      payload: valor,
    });
  };

  //
  //******************************************************************************
  const functionReadSelection = async (valor_1, valor_2) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_tool_read;
      const petitionReadSelection = await clienteAxios.post(url, {
        identifiercom: valor_1,
        identifierbus: valor_2,
      });
      const solutionPetitionSelection = petitionReadSelection.data;
      console.log(solutionPetitionSelection.data);
      if (solutionPetitionSelection.response == "empty") {
        dispatch({
          type: TOOL_SELECTION_READ,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: TOOL_SELECTION_READ,
          payload: solutionPetitionSelection.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //-----------------------------------------------------------------
  //
  const functionTableSelection = (valor) => {
    dispatch({
      type: TOOL_SELECTION,
      payload: valor,
    });
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <toolContext.Provider
      value={{
        arrayselection: state.arrayselection,
        tableselection: state.tableselection,
        functionSelectionInformationCompany,
        functionSelectionInformationBusiness,
        functionReadSelection,
        functionTableSelection,
      }}
    >
      {props.children}
    </toolContext.Provider>
  );
};

export default ToolState;
