import React, { Fragment, useState, useContext, useEffect } from "react";
import "../../resource/scss/default.scss";
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
    functionReadCompany,
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
    });
  }, [idcompanyupdatearray[0].identifiercom]);

  //-----------------------------------------------------------------
  //ZONE FUNCTION
  //Funcion de ONCLICK de ENVIO DE INFORMACION
  const onClickCompany = (e) => {
    e.preventDefault();
    //----------------------------------------------------------------
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
      idcompanyupdatearray[0].identifiercom
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
        title="Modificar Información de Empresa"
        visible={isModalVisible}
        width={500}
        closable={false}
        footer={[
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
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
              placeholder="default size"
              name="namecom"
              onChange={onChangeAddCompany}
              value={namecom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">NIT Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="default size"
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
              placeholder="default size"
              name="telephonecom"
              onChange={onChangeAddCompany}
              value={telephonecom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Email Empresarial</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="default size"
              name="emailcom"
              onChange={onChangeAddCompany}
              value={emailcom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Moneda</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="default size"
              name="coincom"
              onChange={onChangeAddCompany}
              value={coincom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Ciudad Compañia</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="default size"
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
              placeholder="default size"
              name="placecom"
              onChange={onChangeAddCompany}
              value={placecom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Direccion Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="default size"
              name="directioncom"
              onChange={onChangeAddCompany}
              value={directioncom}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Perteneciente Empresa</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="default size"
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
    </Fragment>
  );
};

export default ModalModifyCompany;
