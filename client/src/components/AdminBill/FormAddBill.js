import React, { Fragment, useState, useContext } from "react";
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
//-----------------------------------------------------------------
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
  //Creamos el formato de la variable
  const dateFormat = "MM/DD/YYYY";

  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [dataform, setDataForm] = useState({
    nitbill: "",
    datepresentbill: `${moment().subtract(4, "h").format("MM/DD/YYYY")}`,
    reasonbill: "",
    paymenttypebill: "",
    productsbill: [],
    conditionbill: "",
  });
  const {
    nitbill,
    datepresentbill,
    reasonbill,
    paymenttypebill,
    productsbill,
    conditionbill,
  } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddBill = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  //Carga de TIPO DE MONEDA
  const onChangeAddType = (e) => {
    setDataForm({
      ...dataform,
      paymenttypebill: e,
    });
  };
  //Carga de TIPO DE MONEDA
  const onChangeAddCondition = (e) => {
    setDataForm({
      ...dataform,
      conditionbill: e,
    });
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
  } = useContext(billContext);

  //-----------------------------------------------------------------
  //
  const onClickAddProductUnique = (e) => {
    e.preventDefault();
    functionModalBillUnique(true);
  };

  const onClickSaveBill = (e) => {
    e.preventDefault();

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
      } else {
        //Mensaje de CORRECTO
        messageSuccess(`Perfecto, Usuario Creado Correctamente `, 2);

        functionArrayBillPrint(elem);
        functionModalBillSelection(true);
        //Cierrar el MODAL de ADD COMPANY
        // setIsModalVisible(false);
        // // //
        // functionReadDosage();
        // // //RESETEAMOS LAS ENTRADAS DEL FORM MODAL
        // resetForm();
        // setTimeout(() => {
        //   window.open(`http://localhost:4001/state/pdf/${elem}`, "Data");
        //   props.history.push("/bill");
        // }, 2000);
      }
    });
  };
  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      nitbill: "",
      reasonbill: "",
      paymenttypebill: "",
      conditionbill: "",
    });
    functionArrayProductBillReset();
  };
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <h4>Nueva Factura</h4>
      <Row>
        <Col span={6} style={{ background: "transparent" }}>
          NIT
        </Col>
        <Col span={6} style={{ background: "blue" }}>
          <Input
            placeholder="Ingrese el nombre de Empresa"
            prefix={<UserOutlined />}
            name="nitbill"
            onChange={onChangeAddBill}
            //   value={namecom}
          />
        </Col>
        <Col span={6} style={{ background: "transparent" }}>
          Fecha de Transaccion
        </Col>
        <Col span={6} style={{ background: "blue" }}>
          <DatePicker
            defaultValue={moment(
              `${moment().subtract(4, "h").format("l")}`,
              dateFormat
            )}
            format={dateFormat}
            onChange={(e) =>
              setDataForm({
                ...dataform,
                datepresentbill: moment(e._d).format("MM/DD/YYYY"),
              })
            }
            style={{ width: "100%" }}
          />
        </Col>
      </Row>
      <Row>
        <Col span={6} style={{ background: "transparent" }}>
          Razon social
        </Col>
        <Col span={6} style={{ background: "blue" }}>
          <Input
            placeholder="Ingrese el codigo de NIT"
            prefix={<UserOutlined />}
            name="reasonbill"
            onChange={onChangeAddBill}
            //   value={nitcom}
          />
        </Col>
        <Col span={6} style={{ background: "transparent" }}>
          Tipo de Pago
        </Col>
        <Col span={6} style={{ background: "blue" }}>
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
      <Row>
        <Col span={6} style={{ background: "transparent" }}>
          Condicion de pago
        </Col>
        <Col span={6} style={{ background: "blue" }}>
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
      <Row>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={onClickAddProductUnique}
        >
          Nuevo Producto
        </Button>
        <Button type="primary" icon={<PlusCircleOutlined />}>
          Anadir Productos
        </Button>
        <Button
          type="primary"
          icon={<PlusCircleOutlined />}
          onClick={onClickSaveBill}
        >
          Guardar
        </Button>
      </Row>
    </Fragment>
  );
};

export default FormAddBill;
