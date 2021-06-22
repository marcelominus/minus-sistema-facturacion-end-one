import React, { Fragment, useState, useContext, useEffect } from "react";
import "../../resource/scss/default.scss";
import "../../resource/scss/components/bill/modaladdproductunique.scss";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, InputNumber, Select } from "antd";
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";
//****************************************************************
//
import shortid from "shortid";
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
    amount: "1",
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
    arrayproductselection,
    functionArrayProductSelectionReset,
    functionModalBillUnique,
    functionArrayProductBill,
    functionOpenDrawerTop,
  } = useContext(billContext);
  const { arraymeasure, functionModal, functionReadMeasure } =
    useContext(measureContext);
  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    // functionArrayProductSelectionReset(),
    functionReadMeasure();
  }, []);
  //
  useEffect(() => {
    if (modalbillunique === true) {
      setIsModalVisible(true);
    }
  }, [modalbillunique]);
  //
  useEffect(() => {
    setDataForm({
      ...dataform,
      shortdescription: arrayproductselection[0].shortdescriptionpro,
      unitmeasure: arrayproductselection[0].unitmeasurepro,
      amount: "1",
      price: arrayproductselection[0].pricepro,
    });
  }, [arrayproductselection[0].identifierpro]);
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickBill = () => {
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

      subtotal =
        parseFloat(dataform.price).toFixed(2) *
        parseFloat(dataform.amount).toFixed(2);
      dataform.subtotal = parseFloat(subtotal).toFixed(2);

      dataform.id = `${shortid.generate()}-product`;
      functionArrayProductBill(dataform);
      setIsModalVisible(false);
      functionModalBillUnique(false);
      functionArrayProductSelectionReset();
      resetForm();
    }
  };

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN
  const handleCancel = () => {
    setIsModalVisible(false);
    functionModalBillUnique(false);
    functionArrayProductSelectionReset();
    resetForm();
  };

  //Funcion para poder ABRIR EL DRAWER TOP
  const onClickOpenDrawer = () => {
    functionOpenDrawerTop(true);
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
        title="Añadir Producto Facturacion"
        visible={isModalVisible}
        width={500}
        closable={false}
        footer={[
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickBill}>
            Enviar
          </Button>,
        ]}
        zIndex={2}
      >
        {/* ------------------------- ********** ------------------------- */}
        <div className="container-modal-product-unique">
          <Row className="input-form">
            <Col span={12}>
              <div className="title-formulario">Nombre de Producto</div>
            </Col>
            <Col span={10}>
              <Input
                placeholder="Ingrese el nombre de Sucursal"
                name="shortdescription"
                onChange={onChangeAddProductUnique}
                value={shortdescription}
              />
            </Col>
            <Col span={2}>
              <Button
                type="primary"
                onClick={onClickOpenDrawer}
                icon={<PlusCircleOutlined />}
                block
                className="button-open-drawer-product"
              />
            </Col>
          </Row>
          <Row className="input-form">
            <Col span={12}>
              <div className="title-formulario">Selecciones la Unidad</div>
            </Col>
            <Col span={10}>
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
                block
                className="button-open-drawer-measure"
              />
            </Col>
          </Row>
          <Row className="input-form">
            <Col span={12}>
              <div className="title-formulario">Cantidad del Producto</div>
            </Col>
            <Col span={12}>
              <InputNumber
                placeholder="Ingrese la Cantidad del Producto"
                prefix={<UserOutlined />}
                style={{ width: "100%" }}
                defaultValue={1}
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
          <Row className="input-form">
            <Col span={12}>
              <div className="title-formulario">Precio del Producto</div>
            </Col>
            <Col span={12}>
              <InputNumber
                placeholder="Ingrese el Precio del Producto"
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
                step="0.01"
              />
            </Col>
          </Row>
        </div>
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddProductUnique;
