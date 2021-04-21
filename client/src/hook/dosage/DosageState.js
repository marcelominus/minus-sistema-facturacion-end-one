import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import dosageContext from "./dosageContext";
import dosageReducer from "./dosageReducer";

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
  direction_admin_dosage_create,
  direction_admin_dosage_read,
  direction_admin_dosage_update,
  direction_admin_dosage_delete,
} from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";

//================================================================
//INICIO DE CLASE
//================================================================
const DosageState = (props) => {
  const initialState = {
    arraydosage: [], //ARRAY PRINCIPAL CONTENEDOR DE COMPANIAS
    modalupdatedosage: false,
    arrayupdatedosage: [
      {
        identifierbus: "",
        datestartdos: "",
        dateenddos: "",
        sfcdos: "",
        numberauthorizationdos: "",
        numbernotestartdos: "",
        dosagedos: "",
        legenddos: "",
        conditiondos: "",
      },
    ],
  };
  const [state, dispatch] = useReducer(dosageReducer, initialState);

  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  //-----------------------------------------------------------------
  //
  const functionCreateDosage = async (
    value_1,
    value_2,
    value_3,
    value_4,
    value_5,
    value_6,
    value_7,
    value_8
  ) => {
    //Extraer el TOKEN del LOCAL STORE
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_dosage_create;
      const petitionCreateDosage = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
        datestartdos: value_1,
        dateenddos: value_2,
        sfcdos: value_3,
        numberauthorizationdos: value_4,
        numbernotestartdos: value_5,
        dosagedos: value_6,
        legenddos: value_7,
        conditiondos: value_8,
      });

      const solutionPetitionCreate = petitionCreateDosage.data;
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
  const functionReadDosage = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_dosage_read;
      const petitionReadDosage = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
      });
      const solutionPetitionRead = petitionReadDosage.data;
      if (solutionPetitionRead.response == "empty") {
        dispatch({
          type: DOSAGE_READ,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: DOSAGE_READ,
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
    <dosageContext.Provider
      value={{
        arraydosage: state.arraydosage,
        modalupdatedosage: state.modalupdatedosage,
        arrayupdatedosage: state.arrayupdatedosage,
        functionCreateDosage,
        functionReadDosage,
      }}
    >
      {props.children}
    </dosageContext.Provider>
  );
};

export default DosageState;
