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
  DOSAGE_READ_CURRENT,
  DOSAGE_SELECTION,
  DOSAGE_ACTUALLY,
} from "../../utils/index";
// Importamos las direcciones de LOGIN
import {
  direction_admin_dosage_create,
  direction_admin_dosage_read,
  direction_admin_dosage_update,
  direction_admin_dosage_delete,
  direction_admin_dosage_read_current,
  direction_admin_dosage_actually,
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
    arraydosagecurrent: [],
    dosageselection: false,
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
      console.log(solutionPetitionCreate);

      if (solutionPetitionCreate.response == "success") {
        return solutionPetitionCreate.data;
      } else {
        console.log(solutionPetitionCreate);
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
        // let arrayInverted = solutionPetitionRead.data;
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

  //-----------------------------------------------------------------
  //Function de CAMBIO DE BUSINESS
  const functionUpdateDosage = async (
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
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_dosage_update;
      const petitionUpdateDosage = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
        datestartdos: value_1,
        dateenddos: value_2,
        sfcdos: value_3,
        numberauthorizationdos: value_4,
        numbernotestartdos: value_5,
        dosagedos: value_6,
        legenddos: value_7,
        conditiondos: value_8,
        identifierdos: value_9,
      });
      const solutionPetitionUpdate = petitionUpdateDosage.data;
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
      type: DOSAGE_MODAL_UPDATE,
      payload: valor,
    });
  };
  //-----------------------------------------------------------------
  //FUNCION PAR APODER COPIAR EL LINK SELECCIONADO
  const functionArrayUpdateDosage = (valor) => {
    dispatch({
      type: DOSAGE_ARRAY_UPDATE,
      payload: valor,
    });
  };

  //-----------------------------------------------------------------
  //FUNCION BORRAR COMPANY
  const functionDeleteDosage = async (valor) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_dosage_delete;
      const petitionDeleteDosage = await clienteAxios.post(url, {
        identifiernew: valor,
      });
      const solutionPetitionDelete = petitionDeleteDosage.data;
      if (solutionPetitionDelete.response == "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //******************************************************************************
  const functionReadDosageCurrent = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_dosage_read_current;
      const petitionReadDosage = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
      });
      const solutionPetitionRead = petitionReadDosage.data;
      if (solutionPetitionRead.response == "empty") {
        dispatch({
          type: DOSAGE_READ_CURRENT,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: DOSAGE_READ_CURRENT,
          payload: solutionPetitionRead.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //-----------------------------------------------------------------
  //
  const functionTableSelectionDosage = (valor) => {
    dispatch({
      type: DOSAGE_SELECTION,
      payload: valor,
    });
  };
  //
  const functionDosageActually = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_dosage_actually;
      const petitionUpdateDosage = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
      });
      const solutionPetitionUpdate = petitionUpdateDosage.data;
      if (solutionPetitionUpdate.response == "success") {
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
    <dosageContext.Provider
      value={{
        arraydosage: state.arraydosage,
        modalupdatedosage: state.modalupdatedosage,
        arrayupdatedosage: state.arrayupdatedosage,
        arraydosagecurrent: state.arraydosagecurrent,
        dosageselection: state.dosageselection,
        functionCreateDosage,
        functionReadDosage,
        functionModalUpdate,
        functionArrayUpdateDosage,
        functionUpdateDosage,
        functionDeleteDosage,
        functionReadDosageCurrent,
        functionTableSelectionDosage,
        functionDosageActually,
      }}
    >
      {props.children}
    </dosageContext.Provider>
  );
};

export default DosageState;
