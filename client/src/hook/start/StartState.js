import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import startContext from "./startContext";
import startReducer from "./startReducer";
//Importamos los TYPES
import {
  PETITION_READ_COMPANY,
  PETITION_READ_BUSINESS,
} from "../../utils/index";
//Importamos las direcciones de LOGIN
import {
  direction_admin_company_consultation,
  direction_admin_business_consultation,
} from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";
//Imortamos los componentes necesarios
//------------------------------------------------------------------------
const StartState = (props) => {
  const initialState = {};
  const [state, dispatch] = useReducer(startReducer, initialState);

  const functionConsultationCompanyInformation = async () => {
    try {
      //Extraer el TOKEN del LOCAL STORE
      const token = localStorage.getItem("token");
      if (token) {
        //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
        tokenAuth(token);
      }

      //
      const url = direction_admin_company_consultation;
      const petitionReadCompany = await clienteAxios.post(url);
      const solutionPetitionRead = petitionReadCompany.data;
      if (solutionPetitionRead.response == "empty") {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const functionConsultationBusinessInformation = async() => {
    try {
      //Extraer el TOKEN del LOCAL STORE
      const token = localStorage.getItem("token");
      if (token) {
        //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
        tokenAuth(token);
      }

      //
      const url = direction_admin_business_consultation;
      const petitionReadBusiness = await clienteAxios.post(url);
      const solutionPetitionRead = petitionReadBusiness.data;
      if (solutionPetitionRead.response == "empty") {
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  }
  //
  return (
    <startContext.Provider
      value={{
        functionConsultationCompanyInformation,
        functionConsultationBusinessInformation
      }}
    >
      {props.children}
    </startContext.Provider>
  );
};

export default StartState;
