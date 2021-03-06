import React, { Fragment, useContext, useEffect } from "react";
import "../../resource/scss/components/bill/tablebill.scss";
//****************************************************************
//Importamos la libreria de ANTD
import { Table, Tag, Button } from "antd";
import { CloudUploadOutlined, PrinterOutlined } from "@ant-design/icons";
//****************************************************************
//Importamos el CONTEXT
import billContext from "../../hook/bill/billContext";
import toolContext from "../../hook/tool/toolContext";
//****************************************************************
//Importamos mensajes de alertas
import { messageError, messageSuccess } from "../../resource/js/messages";
//****************************************************************
//Importamos MOMENT
import moment from "moment";
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
    functionOpenSpin,
  } = useContext(billContext);
  const { tableselection, functionTableSelection } = useContext(toolContext);
  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    functionReadBill().then((e) => {
      console.log(arraybill);
    });
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
      title: "Id",
      dataIndex: "idbill",
      key: "idbill",
      width: "5%",
    },

    {
      title: "Razon Social",
      dataIndex: "reasonbill",
      key: "reasonbill",
      width: "20%",
    },
    {
      title: "Fecha",
      key: "action",
      width: "10%",

      render: (text) => (
        <Fragment>
          <Tag color="geekblue">
            {moment(text.datepresentbill).format("DD/MM/YYYY")}
          </Tag>
        </Fragment>
      ),
    },
    {
      title: "Nit",
      dataIndex: "nitbill",
      key: "nitbill",
      width: "20%",
    },
    {
      title: "Total Monto",
      dataIndex: "totalbill",
      key: "totalbill",
      width: "20%",
    },
    {
      title: "Estado",
      key: "action",
      width: "10%",
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
      width: "15%",
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
            icon={<PrinterOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              functionReadBillCopy(text.identifierbill).then((e) => {
                if (e === " fail-server") {
                  alert("error");
                } else {
                  functionArrayBillPrint(e);
                  functionOpenSpin(true);
                  setTimeout(() => {
                    functionOpenSpin(false);
                    functionModalBillSelection(true);
                  }, 2000);
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
      <div className="container-table-bill">
        <span className="title-table-bill">Facturas Actuales</span>
        <Table
          pagination={false}
          columns={columns}
          dataSource={arraybill.reverse()}
          pagination={{ pageSize: 5, responsive: true }}
          className="table-bill"
        />
      </div>
    </Fragment>
  );
};

export default TableBill;
