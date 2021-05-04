import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import companyContext from "./companyContext";
import companyReducer from "./companyReducer";
// Importamos los TYPES
import {
  COMPANY_READ,
  COMPANY_SAVE_COMPANY,
  COMPANY_MODAL_LOGO,
  COMPANY_MODAL_LOGAL_VIEW,
  COMPANY_MODAL_UPDATE,
  COMPANY_SAVE_COMPANY_UPDATE,
  COMPANY_DIRECTION_LOGO,
} from "../../utils/index";
//Importamos las direcciones de LOGIN
import {
  direction_admin_company_create,
  direction_admin_company_read,
  direction_admin_company_update,
  direction_admin_company_delete,
  direction_admin_company_update_img,
} from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";
//================================================================
//INICIO DE CLASE
//================================================================
const CompanyState = (props) => {
  //INITIAL STATE COMPANY
  const initialState = {
    arraycompany: [], //ARRAY PRINCIPAL CONTENEDOR DE COMPANIAS
    modallogo: false, //BANDERA PARA ABRIR MODAL LOGO
    modallogoview: false, //BANDERA PARA ABRIR EL MODAL DE LOGO VIEW
    modalupdate: false, //BANDERA PARA ABRIR EL MODAL DE UPDATE
    idcompany: "", //ID DE COMPANIA CREADA PARA PODER, ENVIAR INFO DE LOGO ADD
    idcompanyupdatearray: [
      //ARRAY PARA PODER CARGAR LOS DATOS EN EL FORM
      {
        namecom: "",
        nitcom: "",
        telephonecom: "",
        emailcom: "",
        coincom: "",
        citycom: "",
        placecom: "",
        directioncom: "",
        ofcom: "",
      },
    ],
    directionimglogo: "", //DIRECTION DE LOGO DE IMAGEN ** NO UTILIZADA **
  };
  const [state, dispatch] = useReducer(companyReducer, initialState);

  //Funcion Peticion de LOGIN
  const functionCreateCompany = async (
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
    //
    try {
      const url = direction_admin_company_create;
      const petitionCreateCompany = await clienteAxios.post(url, {
        namecom: value_1,
        nitcom: value_2,
        telephonecom: value_3,
        emailcom: value_4,
        coincom: value_5,
        citycom: value_6,
        placecom: value_7,
        directioncom: value_8,
        ofcom: value_9,
      });

      const solutionPetitionCreate = petitionCreateCompany.data;
      if (solutionPetitionCreate.response == "success") {
        dispatch({
          type: COMPANY_SAVE_COMPANY,
          payload: solutionPetitionCreate.data,
        });
        return solutionPetitionCreate.data;
      } else {
        return solutionPetitionCreate.response;
      }
    } catch (error) {
      return false;
    }
  };

  //-----------------------------------------------------------------
  //HABILITA EL MODAL PARA PODER ACCEDER EN EL LOGO
  const functionLoadLogo = (valor) => {
    dispatch({
      type: COMPANY_MODAL_LOGO,
      payload: valor,
    });
  };

  //******************************************************************************
  const functionReadCompany = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }

    //----------------------------------------------------------------
    try {
      const url = direction_admin_company_read;
      const petitionReadCompany = await clienteAxios.post(url);
      const solutionPetitionRead = petitionReadCompany.data;
      if (solutionPetitionRead.response == "empty") {
        dispatch({
          type: COMPANY_READ,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: COMPANY_READ,
          payload: solutionPetitionRead.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //-----------------------------------------------------------------
  //Funcion Peticion de LOGIN
  const functionSendImg = async (valor) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }

    try {
      const url = direction_admin_company_update_img;
      const petitionSendImg = await clienteAxios.post(url, valor);
      const solutionPetitionImg = petitionSendImg.data;
      if (solutionPetitionImg.response == "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("error");
    }
  };

  //-----------------------------------------------------------------
  //HABILITA EL MODAL PARA PODER ACCEDER EN EL LOGO
  const functionLoadLogoView = (valor) => {
    dispatch({
      type: COMPANY_MODAL_LOGAL_VIEW,
      payload: valor,
    });
  };

  //-----------------------------------------------------------------
  //GUARDA EL ID DE COMPANY EN RESPUSETA DEL CREATE TAMBIEN PARA CAMBIAR EL LOGO
  const functionLoadIdCompany = (valor) => {
    dispatch({
      type: COMPANY_SAVE_COMPANY,
      payload: valor,
    });
  };

  //-----------------------------------------------------------------
  //FUNCION PARA PODER ABRIR EL MODAL DE UPDATE DE COMPANY
  const functionUpdateModal = (valor) => {
    dispatch({
      type: COMPANY_MODAL_UPDATE,
      payload: valor,
    });
  };

  //-----------------------------------------------------------------
  //GUARDA EL ARRAY DE COMPONENTES DE COMPANY
  const functionLoadIdCompanyUpdate = (valor) => {
    dispatch({
      type: COMPANY_SAVE_COMPANY_UPDATE,
      payload: valor,
    });
  };

  //================================================================
  //INICIO DE CLASE
  //================================================================
  const functionUpdateCompany = async (
    value_1,
    value_2,
    value_3,
    value_4,
    value_5,
    value_6,
    value_7,
    value_8,
    value_9,
    value_10
  ) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_company_update;
      const petitionUpdateCompany = await clienteAxios.post(url, {
        namecom: value_1,
        nitcom: value_2,
        telephonecom: value_3,
        emailcom: value_4,
        coincom: value_5,
        citycom: value_6,
        placecom: value_7,
        directioncom: value_8,
        ofcom: value_9,
        identifiercom: value_10,
      });
      const solutionPetitionUpdate = petitionUpdateCompany.data;
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
  const functionDeleteCompany = async (valor) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_company_delete;
      const petitionDeleteCompany = await clienteAxios.post(url, {
        identifiercom: valor,
      });
      const solutionPetitionDelete = petitionDeleteCompany.data;
      if (solutionPetitionDelete.response == "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //-----------------------------------------------------------------
  //GUARDA LA DIRECCION DE IMAGEN EN LA VARIABLE DE IMAGEN LOGO
  const functionLoadImgModal = (valor) => {
    dispatch({
      type: COMPANY_DIRECTION_LOGO,
      payload: valor,
    });
  };

  return (
    <companyContext.Provider
      value={{
        arraycompany: state.arraycompany,
        modallogo: state.modallogo,
        modallogoview: state.modallogoview,
        modalupdate: state.modalupdate,
        idcompany: state.idcompany,
        idcompanyupdatearray: state.idcompanyupdatearray,
        directionimglogo: state.directionimglogo,
        functionCreateCompany, //
        functionReadCompany, //
        functionSendImg, //
        functionLoadLogo, //
        functionLoadLogoView, //
        functionLoadIdCompany, //
        functionUpdateModal, //
        functionLoadImgModal,
        functionLoadIdCompanyUpdate, //
        functionUpdateCompany,
        functionDeleteCompany,
      }}
    >
      {props.children}
    </companyContext.Provider>
  );
};

export default CompanyState;
