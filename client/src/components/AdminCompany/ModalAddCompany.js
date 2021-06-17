import React, { Fragment, useState, useContext } from "react";
import "../../resource/scss/default.scss";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, Select } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
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
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalAddCompany = () => {
  //-----------------------------------------------------------------
  //ZONE USE - CONTEXT
  const { functionCreateCompany, functionLoadLogo } =
    useContext(companyContext);

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
  } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddCompany = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  //Carga de TIPO DE MONEDA
  const onChangeAddCompanyCoin = (e) => {
    setDataForm({
      ...dataform,
      coincom: e,
    });
  };
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickCompany = (e) => {
    e.preventDefault();
    //Verifiacmos las entradas de usuario
    if (
      namecom.toLowerCase().trim() == "" ||
      nitcom.toLowerCase().trim() == "" ||
      telephonecom.toLowerCase().trim() == "" ||
      emailcom.toLowerCase().trim() == "" ||
      coincom.toLowerCase().trim() == "" ||
      citycom.toLowerCase().trim() == "" ||
      placecom.toLowerCase().trim() == "" ||
      directioncom.toLowerCase().trim() == "" ||
      ofcom.toLowerCase().trim() == ""
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      functionCreateCompany(
        namecom,
        nitcom,
        telephonecom,
        emailcom,
        coincom,
        citycom,
        placecom,
        directioncom,
        ofcom
      ).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else {
          //Mensaje de CORRECTO
          messageSuccess("Correcto, Empresa Creada Correctamente", 2);
          //Cierrar el MODAL de ADD COMPANY
          setIsModalVisible(false);
          //Cambia el estado para PODER ABRIR EL MODAL DE ADD LOGO
          functionLoadLogo(true);
          //RESETEAMOS LAS ENTRADAS DEL FORM MODAL
          resetForm();
        }
      });
    }
  };

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPANY
  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  //Funcion ABRIR el MODAL de ADD COMPANY
  const openModalCompany = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      namecom: "",
      nitcom: "",
      telephonecom: "",
      emailcom: "",
      coincom: "",
      citycom: "",
      placecom: "",
      directioncom: "",
      ofcom: "",
    });
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Nueva Empresa"
        visible={isModalVisible}
        width={500}
        closable={false}
        footer={[
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickCompany}>
            Enviar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Nombre Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el nombre de Empresa"
              name="namecom"
              onChange={onChangeAddCompany}
              value={namecom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">NIT de la Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el codigo de NIT"
              name="nitcom"
              onChange={onChangeAddCompany}
              value={nitcom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Telefono Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Telefono"
              name="telephonecom"
              onChange={onChangeAddCompany}
              value={telephonecom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Email Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Email Empresarial"
              name="emailcom"
              onChange={onChangeAddCompany}
              value={emailcom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Moneda usada</div>
          </Col>
          <Col span={12}>
            <Select
              onChange={onChangeAddCompanyCoin}
              defaultValue=""
              style={{ width: "100%" }}
              value={coincom}
              className="input-unique"
            >
              <Option value="">--Seleccione una Opcion--</Option>
              <Option value="Bs">Bs</Option>
            </Select>
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Ciudad Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese la Ciudad de la Empresa"
              name="citycom"
              onChange={onChangeAddCompany}
              value={citycom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Lugar Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Lugar de la Empresa"
              name="placecom"
              onChange={onChangeAddCompany}
              value={placecom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Direccion de Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese la Direccion de la Empresa"
              name="directioncom"
              onChange={onChangeAddCompany}
              value={directioncom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Perteneciente de la Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Nombre de Propietario"
              name="ofcom"
              onChange={onChangeAddCompany}
              value={ofcom}
              className="input-unique"
            />
          </Col>
        </Row>
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
      <Button
        type="primary"
        onClick={openModalCompany}
        icon={<PlusCircleOutlined />}
        ghost
      >
        Nueva Empresa
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddCompany;
