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

//****************************************************************
//
import { messageError, messageSuccess } from "../../resource/js/messages";

//================================================================
//INICIO DE CLASE
//================================================================
const TableProductBill = () => {
  //-----------------------------------------------------------------
  //ZONE USE CONTEXT
  const {
    totalproduct,
    arrayproductbill,
    functionTotalProductBill,
  } = useContext(billContext);

  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    if (arrayproductbill.length !== 0) {
      let total = 0;
      arrayproductbill.map((e) => {
        total = parseFloat(e.subtotal) + parseFloat(total);
      });
      functionTotalProductBill(total.toFixed(2));
    }
  }, [arrayproductbill]);

  //-------------------------------------------------------
  //ZONE COLUMN
  const columns = [
    {
      title: "Nombre de Producto",
      dataIndex: "shortdescription",
      key: "shortdescription",
    },
    {
      title: "Unidad",
      dataIndex: "unitmeasure",
      key: "unitmeasure",
    },
    {
      title: "Cantidad",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Precio Unitario",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "SubTotal",
      dataIndex: "subtotal",
      key: "subtotal",
    },
  ];

  return (
    <Fragment>
      <Table
        pagination={false}
        columns={columns}
        dataSource={arrayproductbill}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          background: "#00474f",
          padding: "1rem",
        }}
      >
        <h4 style={{ color: "#fff" }}>TOTAL (Bolivianos) = </h4>
        <h3 style={{ color: "#fff" }}>{totalproduct} Bs.</h3>
      </div>
    </Fragment>
  );
};

export default TableProductBill;
