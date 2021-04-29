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
//Importamos los Context
import dosageContext from "../../hook/dosage/dosageContext";

//================================================================
//INICIO DE CLASE
//================================================================
const TableCurrentDosage = () => {
  //-----------------------------------------------------------------
  //
  const {
    arraydosagecurrent,
    dosageselection,
    functionTableSelectionDosage,
    functionReadDosageCurrent,
  } = useContext(dosageContext);
  //-----------------------------------------------------------------
  //
  useEffect(() => {
    functionReadDosageCurrent();
  }, []);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenBusiness !== "") {
      functionReadDosageCurrent();
      functionTableSelectionDosage(false);
    }
  }, [dosageselection]);
  //-------------------------------------------------------
  //
  const columns = [
    {
      title: "Id",
      dataIndex: "identifierdos",
      key: "identifierdos",
    },
    {
      title: "Dosificacion",
      dataIndex: "dosagedos",
      key: "dosagedos",
    },
    {
      title: "Dias",
      dataIndex: "dayremaindos",
      key: "dayremaindos",
    },
    {
      title: "Estado",
      dataIndex: "conditiondos",
      key: "conditiondos",
    },
  ];
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Table
        pagination={false}
        columns={columns}
        dataSource={arraydosagecurrent}
      />
    </Fragment>
  );
};

export default TableCurrentDosage;
