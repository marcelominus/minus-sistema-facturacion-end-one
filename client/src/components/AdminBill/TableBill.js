import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
//****************************************************************
//Importamos la libreria de ANTD
import { Table, Tag, Input, Button, Space, Row, Col } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
//****************************************************************
//Importamos el HIGT de LETTERS
import Highlighter from "react-highlight-words";
//****************************************************************
//Importamos el CONTEXT
import billContext from "../../hook/bill/billContext";
import toolContext from "../../hook/tool/toolContext";
//****************************************************************
//
import { messageError, messageSuccess } from "../../resource/js/messages";
//****************************************************************
//
//================================================================
//INICIO DE CLASE
//================================================================
const TableBill = ({ props }) => {
  //-----------------------------------------------------------------
  //ZONE USE CONTEXT
  const {
    arraybill,
    functionReadBill,
    functionReadBillCopy,
    functionArrayBillPrint,
    functionModalBillSelection,
    functionUpdateConditionBill,
  } = useContext(billContext);
  const { tableselection, functionTableSelection } = useContext(toolContext);
  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    functionReadBill();
  }, []);
  useEffect(() => {
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany !== "" && dataTokenBusiness !== "") {
      functionReadBill();
      functionTableSelection(false);
    }
  }, [tableselection]);
  //-------------------------------------------------------
  //ZONE COLUMN
  const columns = [
    {
      title: "Nombre de Producto",
      dataIndex: "identifierbill",
      key: "identifierbill",
    },
    {
      title: "Unidad",
      dataIndex: "reasonbill",
      key: "reasonbill",
    },
    {
      title: "Cantidad",
      dataIndex: "conditionbill",
      key: "conditionbill",
    },
    {
      title: "Precio Unitario",
      dataIndex: "controlcodebill",
      key: "controlcodebill",
    },
    {
      title: "Estado",
      key: "action",
      width: "20%",
      render: (text) => (
        <Fragment>
          {text.conditionbill === "pagado" ? (
            <Tag color="green">{text.conditionbill}</Tag>
          ) : (
            <Tag color="orange">{text.conditionbill}</Tag>
          )}
        </Fragment>
      ),
    },
    {
      title: "Acciones",
      key: "action",
      width: "20%",
      render: (text) => (
        <Fragment>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              let condition = "";
              if (text.conditionbill === "anulado") {
                condition = "pagado";
              } else {
                condition = "anulado";
              }
              functionUpdateConditionBill(text.identifierbill, condition).then(
                (e) => {
                  if (e == true) {
                    messageSuccess("Correcto, dato Cambiado", 2);
                    functionReadBill();
                  } else {
                    messageError("Error", 2);
                  }
                }
              );
            }}
          />
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              functionReadBillCopy(text.identifierbill).then((e) => {
                if (e === " fail-server") {
                  alert("error");
                } else {
                  functionArrayBillPrint(e);
                  functionModalBillSelection(true);
                }
              });
            }}
          />
        </Fragment>
      ),
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
        dataSource={arraybill}
        pagination={{ pageSize: 5, responsive: true }}
      />
    </Fragment>
  );
};

export default TableBill;
