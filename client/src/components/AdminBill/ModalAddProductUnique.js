import React, { Fragment, useState, useContext, useEffect } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, InputNumber, Select } from "antd";
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";

//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";

//****************************************************************
//Importamos los CONTEXT
import billContext from "../../hook/bill/billContext";
import measureContext from "../../hook/measure/measureContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalAddProductUnique = () => {
  //-----------------------------------------------------------------
  //ZONE USE STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    shortdescription: "",
    unitmeasure: "",
    amount: "",
    price: "",
  });
  const { shortdescription, unitmeasure, amount, price } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddProductUnique = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  //Carga de TIPO DE MONEDA
  const onChangeAddMeasure = (e) => {
    setDataForm({
      ...dataform,
      unitmeasure: e,
    });
  };
  //-----------------------------------------------------------------
  //ZONE USE CONTEXT
  const {
    modalbillunique,
    functionModalBillUnique,
    functionArrayProductBill,
  } = useContext(billContext);
  const { arraymeasure, functionModal, functionReadMeasure } = useContext(
    measureContext
  );
  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    functionReadMeasure();
  }, []);

  useEffect(() => {
    if (modalbillunique === true) {
      setIsModalVisible(true);
    }
  }, [modalbillunique]);

  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickBill = (e) => {
    e.preventDefault();

    if (
      shortdescription.toLowerCase().trim() == "" ||
      amount === "" ||
      price === "" ||
      amount === null ||
      price === null
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      messageSuccess("Correcto, Datos Correctos");
      let subtotal = 0;

      subtotal = parseInt(dataform.price) * parseInt(dataform.amount);
      dataform.subtotal = subtotal;

      functionArrayProductBill(dataform);
      setIsModalVisible(false);
      functionModalBillUnique(false);
      resetForm();
    }
  };

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN
  const handleCancel = () => {
    setIsModalVisible(false);
    functionModalBillUnique(false);
    resetForm();
  };

  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      shortdescription: "",
      amount: "",
      price: "",
      unitmeasure: "",
    });
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Añadir Empresa"
        visible={isModalVisible}
        width={800}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickBill}>
            Ok
          </Button>,
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}

        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Nombre de Producto
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese el nombre de Sucursal"
              prefix={<UserOutlined />}
              name="shortdescription"
              onChange={onChangeAddProductUnique}
              value={shortdescription}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Selecciones la Unidad
          </Col>
          <Col span={10} style={{ background: "blue" }}>
            <Select
              defaultValue=""
              onChange={onChangeAddMeasure}
              style={{ width: "100%" }}
              value={unitmeasure}
            >
              <Option value="">--Seleccione una Opcion--</Option>
              {arraymeasure.map((e, key) => {
                return (
                  <Option value={e.unitmeasure} key={key}>
                    {e.unitmeasure}
                  </Option>
                );
              })}
            </Select>
          </Col>
          <Col span={2}>
            <Button
              type="primary"
              onClick={() => {
                functionModal(true);
              }}
              icon={<PlusCircleOutlined />}
            >
              A
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Cantidad del Producto
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <InputNumber
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              style={{ width: "100%" }}
              defaultValue={0}
              onChange={(e) => {
                setDataForm({
                  ...dataform,
                  amount: e,
                });
              }}
              value={amount}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Precio del Producto
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <InputNumber
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              style={{ width: "100%" }}
              defaultValue={0}
              onChange={(e) => {
                setDataForm({
                  ...dataform,
                  price: e,
                });
              }}
              value={price}
            />
          </Col>
        </Row>
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddProductUnique;
