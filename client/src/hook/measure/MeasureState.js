import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import measureContext from "./measureContext";
import measureReducer from "./measureReducer";

// Importamos los TYPES
import {
  DOSAGE_CREATE,
  DOSAGE_READ,
  DOSAGE_UPDATE,
  DOSAGE_MODAL_UPDATE,
  DOSAGE_ARRAY_UPDATE,
  DOSAGE_DELETE,
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
const DosageState = (props) => {
  const initialState = {
    arraymeasure: [], //ARRAY PRINCIPAL CONTENEDOR DE COMPANIAS
    modalupdatemeasure: false,
    arrayupdatemeasure: [
      {
        identifierbus: "",
        unitmeasure: "",
        descriptionmeasure: "",
      },
    ],
  };
  const [state, dispatch] = useReducer(measureContext, initialState);
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

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <measureContext.Provider
      value={{
        arraymeasure: state.arraymeasure,
        modalupdatemeasure: state.modalupdatemeasure,
        arrayupdatemeasure: state.measure,
        functionCreateMeasure,
      }}
    >
      {props.children}
    </measureContext.Provider>
  );
};

export default DosageState;
