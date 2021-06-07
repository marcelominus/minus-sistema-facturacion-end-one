import React, { Fragment, useState, useContext, useEffect } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, Select, InputNumber } from "antd";
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
import productContext from "../../hook/product/productContext";
import measureContext from "../../hook/measure/measureContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalModifyProduct = () => {
  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    shortdescriptionpro: "",
    longdescriptionpro: "",
    unitmeasurepro: "",
    pricepro: "",
  });
  const {
    shortdescriptionpro,
    longdescriptionpro,
    unitmeasurepro,
    pricepro,
  } = dataform;
  //Carga la informacion de COMPANY
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
  //   const { functionCreateUser, functionReadUser } = useContext(userContext);
  const {
    modalupdateproduct,
    arrayupdateproduct,
    functionReadProduct,
    functionModalUpdate,
    functionUpdateProduct,
  } = useContext(productContext);
  const { arraymeasure, functionModal, functionReadMeasure } = useContext(
    measureContext
  );
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if (modalupdateproduct === true) {
      setIsModalVisible(true);
    }
  }, [modalupdateproduct]);
  useEffect(() => {
    setDataForm({
      ...dataform,
      shortdescriptionpro: arrayupdateproduct[0].shortdescriptionpro,
      longdescriptionpro: arrayupdateproduct[0].longdescriptionpro,
      unitmeasurepro: arrayupdateproduct[0].unitmeasurepro,
      pricepro: arrayupdateproduct[0].pricepro,
    });
  }, [arrayupdateproduct[0].identifierpro]);
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickProduct = (e) => {
    e.preventDefault();

    if (
      shortdescriptionpro.toLowerCase().trim() == "" ||
      longdescriptionpro.toLowerCase().trim() == ""
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      functionUpdateProduct(
        shortdescriptionpro,
        longdescriptionpro,
        unitmeasurepro,
        pricepro,
        arrayupdateproduct[0].identifierpro
      ).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas REPETIDAS, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else {
          //Mensaje de CORRECTO
          messageSuccess(
            `Perfecto, Dosificacion Modificada Correctamente ${elem}`,
            2
          );
          //Cierrar el MODAL de ADD COMPANY
          setIsModalVisible(false);
          functionModalUpdate(false);
          functionReadProduct();
        }
      });
    }
  };

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN

  const handleCancel = () => {
    setIsModalVisible(false);
    functionModalUpdate(false);
  };

  //Funcion ABRIR el MODAL de ADD COMPANY
  const openDrawerUser = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };
  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      unitmeasure: "",
      descriptionmeasure: "",
    });
  };
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Modificar Producto"
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
            Titulo Producto
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese el nombre de Usuario"
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
              placeholder="Ingrese el Apellido de Usuario"
              prefix={<UserOutlined />}
              name="longdescriptionpro"
              onChange={onChangeAddProduct}
              value={longdescriptionpro}
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
              value={unitmeasurepro}
            >
              <Option value="">--Seleccione una Opcion--</Option>
              {arraymeasure.map((e, key) => {
                return (
                  <Option value={e.idmeasure} key={key}>
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
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              style={{ width: "100%" }}
              defaultValue={0}
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
    </Fragment>
  );
};

export default ModalModifyProduct;
