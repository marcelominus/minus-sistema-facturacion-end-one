import React, { Fragment, useState, useContext, useEffect } from "react";
//****************************************************************
//
import loginContext from "../../hook/login/loginContext";
//*******************************************************
//
import { Link, Redirect } from "react-router-dom";
//****************************************************************
//
import { Layout, Menu, Modal } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
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
  return <Fragment>{exit ? <Redirect to={"/"} /> : null}</Fragment>;
};

export default Authenticate;
