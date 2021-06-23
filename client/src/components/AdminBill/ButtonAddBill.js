import React, { Fragment } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import { Button, Row, Col } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
//****************************************************************
//Importamos ROUTAS
import { billaddroute } from "../../routes/routes";
//================================================================
//INICIO DE CLASE
//================================================================
const ButtonAddBill = ({ props }) => {
  const openPageNewBill = (e) => {
    e.preventDefault();
    props.history.push(billaddroute);
  };
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Row>
        <Col span={24}>
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
