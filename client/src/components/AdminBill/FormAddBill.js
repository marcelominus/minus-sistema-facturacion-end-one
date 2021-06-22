//****************************************************************
//Importamos librerias de REACT
import React, { Fragment, useState, useContext, useEffect } from "react";
import "../../resource/scss/default.scss";
import "../../resource/scss/components/bill/formaddbill.scss";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, Select, DatePicker } from "antd";
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";

//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";

//****************************************************************
//Importamos el Context
import billContext from "../../hook/bill/billContext";

//****************************************************************
//Importamos la libreria de MOMENT
import moment from "moment";
//
const { Option } = Select;

//================================================================
//INICIO DE CLASE
//================================================================
const FormAddBill = ({ props }) => {
  //-----------------------------------------------------------------
  //Creamos el formato de la variable TIME
  const dateFormat = "MM/DD/YYYY";

  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [dataform, setDataForm] = useState({
    nitbill: "",
    datepresentbill: "",
    reasonbill: "",
    paymenttypebill: "",
    conditionbill: "",
  });
  const {
    nitbill,
    datepresentbill,
    reasonbill,
    paymenttypebill,
    conditionbill,
  } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddBill = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  //Carga de TIPO DE PAGO FACTURA
  const onChangeAddType = (e) => {
    setDataForm({
      ...dataform,
      paymenttypebill: e,
    });
  };
  //Carga de CONDITION DE PAGO FACTURA
  const onChangeAddCondition = (e) => {
    setDataForm({
      ...dataform,
      conditionbill: e,
    });
  };
  const onChangeDate = (date, dateString) => {
    setDataForm({
      ...dataform,
      datepresentbill: dateString,
    });
    // datepresentbill: moment(e._d).format("MM/DD/YYYY"),
  };
  //-----------------------------------------------------------------
  //ZONE USE CONTEXT
  const {
    arrayproductbill,
    functionModalBillUnique,
    functionCreateBill,
    functionArrayProductBillReset,
    functionModalBillSelection,
    functionArrayBillPrint,
    functionOpenSpin,
  } = useContext(billContext);

  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    functionArrayProductBillReset();
  }, []);

  //-----------------------------------------------------------------
  //ZONE FUNCTION
  const onClickAddProductUnique = () => {
    functionModalBillUnique(true);
  };

  const onClickSaveBill = () => {
    if (
      nitbill.toLowerCase().trim() == "" ||
      reasonbill.toLowerCase().trim() == "" ||
      paymenttypebill.toLowerCase().trim() == "" ||
      conditionbill.toLowerCase().trim() == "" ||
      arrayproductbill.length === 0
    ) {
      messageWarning("Faltan Datos, Revise nuevamente el Formulario", 2);
    } else {
      functionCreateBill(
        nitbill,
        datepresentbill,
        reasonbill,
        paymenttypebill,
        arrayproductbill,
        conditionbill
      ).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else if (elem === "fail-server") {
          messageError("ERROR, FALLO AL CREAR FACTURA");
        } else {
          //Mensaje de CORRECTO
          messageSuccess(`Correcto, Factura Guardada Correctamente `, 3);
          functionArrayBillPrint(elem);
          functionOpenSpin(true);
          setTimeout(() => {
            functionOpenSpin(false);
            functionModalBillSelection(true);
          }, 2000);
        }
      });
    }
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <div className="container-form-add-bill">
        <div className="title-form-add-bill">Nueva Factura</div>
        <Row className="input-form">
          <Col span={6}>
            <div className="title-formulario">NIT</div>
          </Col>
          <Col span={6}>
            <Input
              placeholder="Ingrese el Nit de la empresa"
              name="nitbill"
              onChange={onChangeAddBill}
              //   value={namecom}
            />
          </Col>
          <Col span={6}>
            <div className="title-formulario">Fecha de Transaccion</div>
          </Col>
          <Col span={6}>
            <DatePicker
              defaultValue={moment().subtract(4, "h")}
              format={dateFormat}
              onChange={onChangeDate}
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={6}>
            <div className="title-formulario">Razon social</div>
          </Col>
          <Col span={6}>
            <Input
              placeholder="Ingrese la Razon Social"
              name="reasonbill"
              onChange={onChangeAddBill}
              //   value={nitcom}
            />
          </Col>
          <Col span={6}>
            <div className="title-formulario">Tipo de Pago</div>
          </Col>
          <Col span={6}>
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={onChangeAddType}
              // value={conditiondos}
            >
              <Option value="">--Seleccione una Opcion--</Option>
              <Option value="efectivo">Efectivo</Option>
              <Option value="cuentas por pagar">Cuentas por Pagar</Option>
            </Select>
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={6}>
            <div className="title-formulario">Condicion de pago</div>
          </Col>
          <Col span={6}>
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={onChangeAddCondition}
              // value={conditiondos}
            >
              <Option value="">--Seleccione una Opcion--</Option>
              <Option value="pagado">Pagado</Option>
              <Option value="adeudo">Adeudo</Option>
            </Select>
          </Col>
        </Row>
        <br />
        <Row className="input-form">
          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={onClickAddProductUnique}
            ghost
            className="button-new-product"
          >
            Nuevo Producto
          </Button>

          <Button
            type="primary"
            icon={<PlusCircleOutlined />}
            onClick={onClickSaveBill}
            ghost
            className="button-save"
          >
            Guardar
          </Button>
        </Row>
      </div>
    </Fragment>
  );
};

export default FormAddBill;
