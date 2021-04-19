import React, { Fragment, useContext, useEffect } from "react";

//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//****************************************************************
//Importamos los CONTEXT
import startContext from "../../hook/start/startContext";

//================================================================
//INICIO DE CLASE
//================================================================
const ModalReturnData = ({ props }) => {
  //-----------------------------------------------------------------
  //ZONE USE-CONTEXT
  const {
    functionConsultationCompanyInformation,
    functionConsultationBusinessInformation,
  } = useContext(startContext);

  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    functionConsultationCompanyInformation().then((e) => {
      if (e === false) {
        const message = "Empresa No Creada Cree una Sucursal para Continuar";
        messageError(message, 3);
        props.history.push("/company");
      } else {
        functionConsultationBusinessInformation().then((e) => {
          if (e === false) {
            const message =
              "Sucursal No Creada Cree una Sucursal para Continuar";
            messageError(message, 3);
            props.history.push("/business");
          }
        });
      }
    });
  }, []);

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return <Fragment></Fragment>;
};

export default ModalReturnData;
