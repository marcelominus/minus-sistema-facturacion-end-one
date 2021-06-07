import React, { Fragment, useState, useContext, useEffect } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  Select,
  Space,
  InputNumber,
} from "antd";
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";
//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//*******************************************************
//Importamos los CONTEXT
import productContext from "../../hook/product/productContext";
import measureContext from "../../hook/measure/measureContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalAddMeasure = () => {
  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    shortdescriptionpro: "",
    longdescriptionpro: "",
    unitmeasurepro: "",
    pricepro: "0",
  });
  const {
    shortdescriptionpro,
    longdescriptionpro,
    unitmeasurepro,
    pricepro,
  } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddProduct = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  //Carga de TIPO DE MONEDA
  const onChangeAddMeasure = (e) => {
    setDataForm({
      ...dataform,
      unitmeasurepro: e,
    });
  };
  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  const { functionCreateProduct, functionReadProduct } = useContext(
    productContext
  );
  const { arraymeasure, functionModal, functionReadMeasure } = useContext(
    measureContext
  );
  //-----------------------------------------------------------------
  //
  useEffect(() => {
    functionReadMeasure();
  }, []);
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickProduct = (e) => {
    e.preventDefault();

    if (
      shortdescriptionpro.toLowerCase().trim() == "" ||
      longdescriptionpro.toLowerCase().trim() == ""
      // unitmeasurepro.trim() == ""
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      functionCreateProduct(
        shortdescriptionpro,
        longdescriptionpro,
        unitmeasurepro,
        pricepro
      ).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else {
          //Mensaje de CORRECTO
          messageSuccess(`Perfecto, Usuario Creado Correctamente ${elem}`, 2);
          //Cierrar el MODAL de ADD COMPANY
          setIsModalVisible(false);
          // //
          functionReadProduct();
          // //RESETEAMOS LAS ENTRADAS DEL FORM MODAL
          resetForm();
        }
      });
    }
  };
  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN
  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  //Funcion ABRIR el MODAL de ADD COMPANY
  const openModalProduct = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      shortdescriptionpro: "",
      longdescriptionpro: "",
      unitmeasurepro: "",
      pricepro: "0",
    });
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Añadir Producto"
        visible={isModalVisible}
        width={800}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickProduct}>
            Enviar
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
              placeholder="Ingrese la Nombre del Producto"
              prefix={<UserOutlined />}
              name="shortdescriptionpro"
              onChange={onChangeAddProduct}
              value={shortdescriptionpro}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Descripcion Producto
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese la Descripcion del Producto"
              prefix={<UserOutlined />}
              name="longdescriptionpro"
              onChange={onChangeAddProduct}
              value={longdescriptionpro}
            />
          </Col>
        </Row>

        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Seleccione la Unidad
          </Col>
          <Col span={10} style={{ background: "blue" }}>
            <Select
              defaultValue=""
              onChange={onChangeAddMeasure}
              style={{ width: "100%" }}
              value={unitmeasurepro}
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
            Precio del Producto
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <InputNumber
              placeholder="Ingrese la Precio del Producto"
              prefix={<UserOutlined />}
              style={{ width: "100%" }}
              onChange={(e) => {
                setDataForm({
                  ...dataform,
                  pricepro: e,
                });
              }}
              value={pricepro}
            />
          </Col>
        </Row>

        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
      <Button
        type="primary"
        onClick={openModalProduct}
        icon={<PlusCircleOutlined />}
      >
        Registrar Producto
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddMeasure;
