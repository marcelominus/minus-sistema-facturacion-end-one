import React, { Fragment, useState, useEffect, useContext } from "react";
//****************************************************************
//
import '../../resource/scss/components/dosage/tableDosageCurrect.scss';
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
//Importamos la libreria de MOMENT
import moment from "moment";
//****************************************************************
//Importamos los Context
import dosageContext from "../../hook/dosage/dosageContext";

//================================================================
//INICIO DE CLASE
//================================================================
const TableCurrentDosage = () => {
  //Creamos el formato de la variable TIME
  const dateFormat = "MM/DD/YYYY";

  //-----------------------------------------------------------------
  //
  const {
    arraydosagecurrent,
    dosageselection,
    functionTableSelectionDosage,
    functionReadDosageCurrent,
    functionDosageActually,
  } = useContext(dosageContext);
  //-----------------------------------------------------------------
  //
  useEffect(() => {
    functionDosageActually();
    functionReadDosageCurrent();
  }, []);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenBusiness !== "") {
      functionDosageActually().then((e) => {
        functionReadDosageCurrent();
        functionTableSelectionDosage(false);
      });
    }
  }, [dosageselection]);
  //-------------------------------------------------------
  //
  const columns = [
    {
      title: "Fecha Actual",
      key: "action",
      render: (text) => (
        <Fragment>
          <Tag color="orange">
            {moment().subtract(4, "h").format("MM/DD/YYYY")}
          </Tag>
        </Fragment>
      ),
    },
    {
      title: "Fecha Final",
      key: "action",
      render: (text) => (
        <Fragment>
          <Tag color="purple">{text.dateenddos}</Tag>
        </Fragment>
      ),
    },
    {
      title: "Dias",
      dataIndex: "dayremaindos",
      key: "dayremaindos",
    },
    {
      title: "Estado",
      key: "action",
      render: (text) => (
        <Fragment>
          {text.conditiondos === "active" ? (
            <Tag color="green">Activo</Tag>
          ) : (
            <Tag color="red">Inactivo</Tag>
          )}
        </Fragment>
      ),
    },
  ];
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <h4>Datos de Dosificacion</h4>
      <Table
        pagination={false}
        columns={columns}
        dataSource={arraydosagecurrent}
        className='table-dosage-current'
      />
    </Fragment>
  );
};

export default TableCurrentDosage;
