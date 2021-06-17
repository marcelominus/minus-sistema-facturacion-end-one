import React, { Fragment, useEffect, useContext } from "react";
//****************************************************************
//
import "../../resource/scss/components/tools/tableSelectionData.scss";
//****************************************************************
//Importamos la libreria de ANTD
import { Table } from "antd";

//*******************************************************
//Importamos las funciones de MESSAGES

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
    if (dataTokenCompany !== null && dataTokenBusiness !== null) {
      functionReadSelection(dataTokenCompany, dataTokenBusiness);
      functionTableSelection(false);
    }
  }, [tableselection]);
  //-------------------------------------------------------
  //
  const columns = [
    {
      title: "Nombre de Empresa",
      dataIndex: "namecom",
      key: "namecom",
      width: "33.33%",
    },
    {
      title: "Nombre Sucursal",
      dataIndex: "namebus",
      key: "namebus",
      width: "33.33%",
    },
    {
      title: "Nit de Empresa",
      dataIndex: "nitcom",
      key: "nitcom",
      width: "33.33%",
    },
  ];
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <h4>Empresa y Sucursal Activa</h4>
      <Table
        pagination={false}
        columns={columns}
        dataSource={arrayselection}
        className="table-selection-data"
      />
    </Fragment>
  );
};

export default TableSelectionData;
