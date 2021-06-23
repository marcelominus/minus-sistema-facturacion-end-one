import React, { Fragment, useState, useContext, useEffect } from "react";
//****************************************************************
//Importamos el LOGIN CONTEXT
import loginContext from "../../hook/login/loginContext";
//*******************************************************
//Importamos el REACT ROUTER DOM
import { Redirect } from "react-router-dom";
//****************************************************************
//Importamos los componentes de ANTD
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
//****************************************************************
//Importamos ROUTAS
import { rootroute } from "../../routes/routes";
//================================================================
//INICIO DE CLASE
//================================================================
const Authenticate = () => {
  //-----------------------------------------------------------------
  //ZONE USE STATE
  const [exit, setExit] = useState(false);

  //-----------------------------------------------------------------
  //ZONE USE CONTEXT
  const { functionAuthenticate } = useContext(loginContext);
  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    functionAuthenticate().then((e) => {
      if (e === "token-fail") {
        setExit(true);
        Modal.confirm({
          title: "Caducado",
          icon: <ExclamationCircleOutlined />,
          content: "Sesion Caducada. Ingrese Nuevamente",
          okText: "Entendido",
          onOk: () => {
            setExit(true);
          },
        });
      } else if (e === "token-empty") {
        setExit(true);
      }
    });
  }, []);
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return <Fragment>{exit ? <Redirect to={rootroute} /> : null}</Fragment>;
};

export default Authenticate;
