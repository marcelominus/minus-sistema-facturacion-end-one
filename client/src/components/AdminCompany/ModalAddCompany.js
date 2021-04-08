import React, { Fragment, useState, useContext } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//****************************************************************
//Importamos los CONTEXT
import companyContext from "../../hook/company/companyContext";

//================================================================
//INICIO DE CLASE
//================================================================
const ModalAddCompany = () => {
  //-----------------------------------------------------------------
  //Importamos los USECONTEXT
  const { functionCreateCompany, functionLoadLogo } = useContext(
    companyContext
  );

  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    namecom: "",
    nitcom: "",
    telephonecom: "",
    emailcom: "",
    coincom: "",
    citycom: "",
    placecom: "",
    directioncom: "",
    ofcom: "",
    codecom: "",
  });
  const {
    namecom,
    nitcom,
    telephonecom,
    emailcom,
    coincom,
    citycom,
    placecom,
    directioncom,
    ofcom,
    codecom,
  } = dataform;
  //
  const onChangeAddCompany = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };

  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickCompany = (e) => {
    e.preventDefault();

    if (
      namecom.toLowerCase().trim() == "" ||
      nitcom.toLowerCase().trim() == "" ||
      telephonecom.toLowerCase().trim() == "" ||
      emailcom.toLowerCase().trim() == "" ||
      coincom.toLowerCase().trim() == "" ||
      citycom.toLowerCase().trim() == "" ||
      placecom.toLowerCase().trim() == "" ||
      directioncom.toLowerCase().trim() == "" ||
      ofcom.toLowerCase().trim() == "" ||
      codecom.toLowerCase().trim() == ""
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      functionCreateCompany(
        namecom,
        nitcom,
        telephonecom,
        emailcom,
        coincom,
        coincom,
        citycom,
        placecom,
        directioncom,
        ofcom,
        codecom
      ).then((elem) => {
        if (elem === "duplicate") {
          messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          messageError("Error, Usuario no encontrado", 2);
        } else {
          messageSuccess("Correcto, Bienvenido al sistema", 2);
          setIsModalVisible(false);
          functionLoadLogo(true);
        }
      });
    }
  };

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const openModalCompany = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
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
          <Button key="send" type="primary" onClick={onClickCompany}>
            Enviar
          </Button>,
          <Button key="cancel" type="primary" onClick={handleOk}>
            Cancelar
          </Button>,
        ]}
        // onCancel={handleCancel}
      >
        {/* ------------------------- ********** ------------------------- */}
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Nombre Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="namecom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            NIT Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="nitcom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Telefono Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="telephonecom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Email Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="emailcom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Moneda Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="coincom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Ciudad Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="citycom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Place Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="placecom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Direccion Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="directioncom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Perteneciente Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="ofcom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Codigo Compañia
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="codecom"
              onChange={onChangeAddCompany}
            />
          </Col>
        </Row>
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
      <Button type="primary" onClick={openModalCompany}>
        Primary Button
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddCompany;
