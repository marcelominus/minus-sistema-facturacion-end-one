import React, { Fragment, useState, useEffect, useContext } from "react";
//****************************************************************
//Importamos la libreria de ANTD
import { Table, Tag, Input, Button, Space, Row, Col } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//****************************************************************
//
import toolContext from "../../hook/tool/toolContext";
//================================================================
//INICIO DE CLASE
//================================================================
const TableSelectionData = () => {
  //-----------------------------------------------------------------
  //ZONE USE - CONTEXT
  const { tableselection, functionReadSelection } = useContext(toolContext);

  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if (tableselection === true) {
      let dataTokenCompany = localStorage.getItem("tokencompany");
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      functionReadSelection(dataTokenCompany, dataTokenBusiness);
    }
  }, [tableselection]);

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <p>DESDE EL TABLESEELCTION</p>
    </Fragment>
  );
};

export default TableSelectionData;
