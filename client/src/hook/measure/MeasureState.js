import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import measureContext from "./measureContext";
import measureReducer from "./measureReducer";

// Importamos los TYPES
import {
  MEASURE_CREATE,
  MEASURE_READ,
  MEASURE_UPDATE,
  MEASURE_MODAL,
  MEASURE_MODAL_UPDATE,
  MEASURE_ARRAY_UPDATE,
  MEASURE_DELETE,
} from "../../utils/index";
// Importamos las direcciones de LOGIN
import {
  direction_admin_measure_create,
  direction_admin_measure_read,
  direction_admin_measure_update,
  direction_admin_measure_delete,
} from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";

//================================================================
//INICIO DE CLASE
//================================================================
const MeasureState = (props) => {
  const initialState = {
    arraymeasure: [], //ARRAY PRINCIPAL CONTENEDOR DE COMPANIAS
    modalupdatemeasure: false,
    modalmeasure: false,
    arrayupdatemeasure: [
      {
        identifierbus: "",
        unitmeasure: "",
        descriptionmeasure: "",
      },
    ],
  };
  const [state, dispatch] = useReducer(measureReducer, initialState);
  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  //-----------------------------------------------------------------
  //
  const functionCreateMeasure = async (value_1, value_2) => {
    //Extraer el TOKEN del LOCAL STORE
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_measure_create;
      const petitionCreateMeasure = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
        unitmeasure: value_1,
        descriptionmeasure: value_2,
      });

      const solutionPetitionCreate = petitionCreateMeasure.data;
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
  const functionReadMeasure = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_measure_read;
      const petitionReadMeasure = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
      });
      const solutionPetitionRead = petitionReadMeasure.data;
      if (solutionPetitionRead.response == "empty") {
        dispatch({
          type: MEASURE_READ,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: MEASURE_READ,
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
  const functionUpdateMeasure = async (value_1, value_2, value_3) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_measure_update;
      const petitionUpdateMeasure = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
        unitmeasure: value_1,
        descriptionmeasure: value_2,
        idmeasure: value_3,
      });
      const solutionPetitionUpdate = petitionUpdateMeasure.data;
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
  //
  const functionModal = (valor) => {
    dispatch({
      type: MEASURE_MODAL,
      payload: valor,
    });
  };

  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  const functionModalUpdate = (valor) => {
    dispatch({
      type: MEASURE_MODAL_UPDATE,
      payload: valor,
    });
  };

  //-----------------------------------------------------------------
  //FUNCION PAR APODER COPIAR EL LINK SELECCIONADO
  const functionArrayUpdateMeasure = (valor) => {
    dispatch({
      type: MEASURE_ARRAY_UPDATE,
      payload: valor,
    });
  };
  //-----------------------------------------------------------------
  //FUNCION BORRAR COMPANY
  const functionDeleteMeasure = async (valor) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_measure_delete;
      const petitionDeleteMeasure = await clienteAxios.post(url, {
        idmeasure: valor,
      });
      const solutionPetitionDelete = petitionDeleteMeasure.data;
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
    <measureContext.Provider
      value={{
        arraymeasure: state.arraymeasure,
        modalmeasure: state.modalmeasure,
        modalupdatemeasure: state.modalupdatemeasure,
        arrayupdatemeasure: state.arrayupdatemeasure,
        functionCreateMeasure,
        functionReadMeasure,
        functionUpdateMeasure,
        functionModal,
        functionModalUpdate,
        functionArrayUpdateMeasure,
        functionDeleteMeasure,
      }}
    >
      {props.children}
    </measureContext.Provider>
  );
};

export default MeasureState;
