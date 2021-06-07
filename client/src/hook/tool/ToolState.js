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
  TOOL_SELECTION_READ_ALL,
  TOOL_SELECTION_INFORMATION_ROLE,
} from "../../utils/index";
//Importamos las direcciones de LOGIN
import {
  direction_admin_tool_read,
  direction_admin_tool_read_all,
} from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";
//------------------------------------------------------------------------
const ToolState = (props) => {
  //-----------------------------------------------------------------
  //INITIAL STATE
  const initialState = {
    tableselection: false,
    arrayselection: [],
    arrayallselection: [],
  };
  //-----------------------------------------------------------------
  //REDUCER
  const [state, dispatch] = useReducer(toolReducer, initialState);
  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  //Funcion para guardar en el LOCALSTORAGE COMPANY
  const functionSelectionInformationCompany = (valor) => {
    dispatch({
      type: TOOL_SELECTION_INFORMATION_COMPANY,
      payload: valor,
    });
  };
  //Funcion para guardar en el LOCALSTORAGE BUSSINESS
  const functionSelectionInformationBusiness = (valor) => {
    dispatch({
      type: TOOL_SELECTION_INFORMATION_BUSINESS,
      payload: valor,
    });
  };
  //Funcion para guardar en el LOCALSTORAGE ROLE
  const functionSelectionInformationRole = (valor) => {
    dispatch({
      type: TOOL_SELECTION_INFORMATION_ROLE,
      payload: valor,
    });
  };

  //******************************************************************************
  //Funcion para PETICION DE TABLA informacion de TOOLS
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

  //Funcion para el SELECT del MODAL de seleccion de AREA DE TRABAJO
  const functionReadAllSelection = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      tokenAuth(token);
    }
    try {
      const url = direction_admin_tool_read_all;
      const petitionReadSelectionAll = await clienteAxios.post(url);
      const solutionPetitionSelection = petitionReadSelectionAll.data;
      if (solutionPetitionSelection.response == "empty") {
        dispatch({
          type: TOOL_SELECTION_READ_ALL,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: TOOL_SELECTION_READ_ALL,
          payload: solutionPetitionSelection.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------------------
  //Funcion para poder detectar si se cambio las variables de COMPANY y BUSINESS
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
        arrayallselection: state.arrayallselection,
        functionSelectionInformationCompany,
        functionSelectionInformationBusiness,
        functionReadSelection,
        functionTableSelection,
        functionReadAllSelection,
        functionSelectionInformationRole,
      }}
    >
      {props.children}
    </toolContext.Provider>
  );
};

export default ToolState;
