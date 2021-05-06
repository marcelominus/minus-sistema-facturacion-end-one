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
  //-------------------------------------------------------
  //ZONE USE - STATE

  //-----------------------------------------------------------------
  //ZONE USE - CONTEXT
  const {
    arrayselection,
    tableselection,
    functionTableSelection,
    functionReadSelection,
  } = useContext(toolContext);

  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany !== "" && dataTokenBusiness !== "") {
      functionReadSelection(dataTokenCompany, dataTokenBusiness);
      functionTableSelection(false);
    }
  }, [tableselection]);
  //-------------------------------------------------------
  //
  const columns = [
    {
      title: "Nombre Sucursal",
      dataIndex: "namebus",
      key: "namebus",
    },
    {
      title: "Nombre de Empresa",
      dataIndex: "namecom",
      key: "namecom",
    },
    {
      title: "Nit de Empresa",
      dataIndex: "nitcom",
      key: "nitcom",
    },
  ];
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <h4>Empresa y Sucursal Activa</h4>
      <Table pagination={false} columns={columns} dataSource={arrayselection} />
    </Fragment>
  );
};

export default TableSelectionData;
