import React, { Fragment, useContext, useEffect } from "react";
//*******************************************************
//Importamos las funciones de MESSAGES
import { messageWarning } from "../../resource/js/messages";
//****************************************************************
//Importamos los CONTEXT
import startContext from "../../hook/start/startContext";
import toolContext from "../../hook/tool/toolContext";
//****************************************************************
//Importamos las ROUTAS
import { companyroute, businessroute } from "../../routes/routes";
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
  const { functionSelectorSidebar } = useContext(toolContext);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    functionConsultationCompanyInformation().then((e) => {
      if (e === false) {
        const message = "Empresa No Creada Cree una Empresa para Continuar";
        messageWarning(message, 3);
        functionSelectorSidebar("2");
        props.history.push(companyroute);
      } else {
        functionConsultationBusinessInformation().then((e) => {
          if (e === false) {
            const message =
              "Sucursal No Creada Cree una Sucursal para Continuar";
            messageWarning(message, 3);
            functionSelectorSidebar("3");
            props.history.push(businessroute);
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
