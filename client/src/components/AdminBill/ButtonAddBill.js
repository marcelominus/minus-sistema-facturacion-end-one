import React, { Fragment, useState, useEffect, useContext } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Space,
  InputNumber,
} from "antd";
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";

//================================================================
//INICIO DE CLASE
//================================================================
const ButtonAddBill = ({ props }) => {
  const openPageNewBill = (e) => {
    e.preventDefault();
    props.history.push("/bill-add");
  };
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Row>
        <Col span={24} style={{ background: "transparent" }}>
          <Button
            type="primary"
            onClick={openPageNewBill}
            icon={<PlusCircleOutlined />}
            ghost
          >
            Nueva Factura
          </Button>
        </Col>
      </Row>
    </Fragment>
  );
};

export default ButtonAddBill;
