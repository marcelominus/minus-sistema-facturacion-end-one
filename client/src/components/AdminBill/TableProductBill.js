import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import "../../resource/scss/components/bill/tableproductbill.scss";
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
    functionSetArrayProductBill,
  } = useContext(billContext);

  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    let total = 0;
    if (arrayproductbill.length !== 0) {
      arrayproductbill.map((e) => {
        total = parseFloat(e.subtotal) + parseFloat(total);
      });
      functionTotalProductBill(parseFloat(total).toFixed(2));
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
    {
      title: "Acciones",
      key: "action",
      width: "10%",
      render: (text) => (
        <Fragment>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              const resultFilterDeleteProduct = arrayproductbill.filter(
                (e) => e.id !== text.id
              );
              functionSetArrayProductBill(resultFilterDeleteProduct);
            }}
          />
        </Fragment>
      ),
    },
  ];

  return (
    <Fragment>
      <div className="container-table-product-bill">
        <span className="title-table-product-bill">
          Productos Actuales Para Factura
        </span>
        <Table
          pagination={false}
          columns={columns}
          dataSource={arrayproductbill}
          className="table-product-bill"
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
      </div>
    </Fragment>
  );
};

export default TableProductBill;
