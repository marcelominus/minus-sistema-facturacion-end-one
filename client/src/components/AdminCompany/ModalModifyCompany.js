import React, { Fragment, useState, useContext, useEffect } from "react";
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
const ModalModifyCompany = () => {
  //-----------------------------------------------------------------
  //ZONE USE - CONTEXT
  const {
    modalupdate,
    functionUpdateModal,
    idcompanyupdatearray,
    functionUpdateCompany,
    idcompanyupdate,
    functionReadCompany,
    // functionCreateCompany,
    // functionLoadLogo,
  } = useContext(companyContext);

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
  //ZONE USE-EFFECT
  useEffect(() => {
    if (modalupdate === true) {
      setIsModalVisible(true);
    }
  }, [modalupdate]);

  useEffect(() => {
    setDataForm({
      ...dataform,
      namecom: idcompanyupdatearray[0].namecom,
      nitcom: idcompanyupdatearray[0].nitcom,
      telephonecom: idcompanyupdatearray[0].telephonecom,
      emailcom: idcompanyupdatearray[0].emailcom,
      coincom: idcompanyupdatearray[0].coincom,
      citycom: idcompanyupdatearray[0].citycom,
      placecom: idcompanyupdatearray[0].placecom,
      directioncom: idcompanyupdatearray[0].directioncom,
      ofcom: idcompanyupdatearray[0].ofcom,
      codecom: idcompanyupdatearray[0].codecom,
    });
  }, [idcompanyupdatearray[0].namecom]);
  //-----------------------------------------------------------------
  //ZONE FUNCTION
  //Funcion de ONCLICK de ENVIO DE INFORMACION
  const onClickCompany = (e) => {
    e.preventDefault();
    functionUpdateCompany(
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
      idcompanyupdate
    ).then((e) => {
      if (e === true) {
        //Leememos la inforamcion de la BASE DE DATOS
        functionReadCompany();
        //MOSTRAMOS un MENSAJE DE CORRECTO
        messageSuccess("Correcto, Informacion modificada Correctamente", 2);
        //Cerramos el MODAL DE MODIFY COMPANY
        setIsModalVisible(false);
        //Cambiamos el STATE para que ABRIR EL MODAL AUTOMATICAMENTE
        functionUpdateModal(false);
      } else {
        //MOSTRAMOS EL MENSAJE DE ERROR
        messageError("Error, Intenten mas tarde", 2);
      }
    });
  };

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  const handleCancel = () => {
    //Cierra el MODAL DE MODIFY
    setIsModalVisible(false);
    //CAMBIA EL ESTADO PARA QUE EL MODAL MODIFY NO SE ABRA AUTOMATICAMENTE
    functionUpdateModal(false);
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
          <Button key="cancel" type="primary" onClick={handleCancel}>
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
              value={namecom}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            NIT Compañia
          </Col>
          <Col span={12}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="nitcom"
              onChange={onChangeAddCompany}
              value={nitcom}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>Telefono Compañia</Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="default size"
              prefix={<UserOutlined />}
              name="telephonecom"
              onChange={onChangeAddCompany}
              value={telephonecom}
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
              value={emailcom}
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
              value={coincom}
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
              value={citycom}
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
              value={placecom}
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
              value={directioncom}
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
              value={ofcom}
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
              value={codecom}
            />
          </Col>
        </Row>
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}

      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalModifyCompany;
