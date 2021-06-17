import React, { Fragment, useState, useContext, useEffect } from "react";
import "../../resource/scss/default.scss";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, Select } from "antd";
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
import businessContext from "../../hook/business/businessContext";
import companyContext from "../../hook/company/companyContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalModifyBusiness = () => {
  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    identifiercom: "",
    namebus: "",
    ofbus: "",
    citybus: "",
    placebus: "",
    directionbus: "",
    economicactivitybus: "",
  });
  const {
    identifiercom,
    namebus,
    ofbus,
    citybus,
    placebus,
    directionbus,
    economicactivitybus,
  } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddBusiness = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  //Carga de TIPO DE MONEDA
  const onChangeAddCompany = (e) => {
    setDataForm({
      ...dataform,
      identifiercom: e,
    });
  };

  //-----------------------------------------------------------------
  //ZONE USE -CONTEXT
  const { arraycompany, functionReadCompany } = useContext(companyContext);
  const {
    modalupdatebusiness,
    arrayupdatebusiness,
    functionReadBusiness,
    functionModalUpdate,
    functionUpdateBusiness,
  } = useContext(businessContext);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if (modalupdatebusiness === true) {
      setIsModalVisible(true);
    }
  }, [modalupdatebusiness]);

  useEffect(() => {
    setDataForm({
      ...dataform,
      identifiercom: arrayupdatebusiness[0].identifiercom,
      namebus: arrayupdatebusiness[0].namebus,
      ofbus: arrayupdatebusiness[0].ofbus,
      citybus: arrayupdatebusiness[0].citybus,
      placebus: arrayupdatebusiness[0].placebus,
      directionbus: arrayupdatebusiness[0].directionbus,
      economicactivitybus: arrayupdatebusiness[0].economicactivitybus,
    });
  }, [arrayupdatebusiness[0].identifierbus]);
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickBusiness = (e) => {
    e.preventDefault();

    //Verifiacmos las entradas de usuario
    if (
      namebus.toLowerCase().trim() == "" ||
      ofbus.toLowerCase().trim() == "" ||
      citybus.toLowerCase().trim() == "" ||
      placebus.toLowerCase().trim() == "" ||
      directionbus.toLowerCase().trim() == "" ||
      economicactivitybus.toLowerCase().trim() == "" ||
      identifiercom.trim() == ""
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      functionUpdateBusiness(
        namebus,
        ofbus,
        citybus,
        placebus,
        directionbus,
        economicactivitybus,
        identifiercom,
        arrayupdatebusiness[0].identifierbus
      ).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else {
          //Mensaje de CORRECTO
          messageSuccess(
            `Perfecto, Sucursal Modificada correctamente Correctamente ${elem}`,
            2
          );
          //Cierrar el MODAL de ADD COMPANY
          setIsModalVisible(false);
          //
          functionModalUpdate(false);
          //
          functionReadBusiness();
          //RESETEAMOS LAS ENTRADAS DEL FORM MODAL
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
    // resetForm();
  };

  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      identifiercom: "",
      namebus: "",
      ofbus: "",
      citybus: "",
      placebus: "",
      directionbus: "",
      economicactivitybus: "",
    });
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Modificar Sucursal"
        visible={isModalVisible}
        closable={false}
        width={600}
        footer={[
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickBusiness}>
            Enviar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Selecciones la Empresa</div>
          </Col>
          <Col span={12}>
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={onChangeAddCompany}
              value={identifiercom}
            >
              <Option value="">--Seleccione una Opcion--</Option>
              {arraycompany.map((e, key) => {
                return (
                  <Option value={e.identifiercom} key={key}>
                    {e.namecom}
                  </Option>
                );
              })}
            </Select>
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Nombre Sucursal</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el nombre de Sucursal"
              name="namebus"
              onChange={onChangeAddBusiness}
              value={namebus}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Perteneciente Sucursal</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Nombre de Propietario Sucursal"
              name="ofbus"
              onChange={onChangeAddBusiness}
              value={ofbus}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Ciudad Sucursal</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese la Ciudad de la Sucursal"
              name="citybus"
              onChange={onChangeAddBusiness}
              value={citybus}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Lugar Sucursal</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Lugar de la Sucursal"
              name="placebus"
              onChange={onChangeAddBusiness}
              value={placebus}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Direccion de Sucursal</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              name="directionbus"
              onChange={onChangeAddBusiness}
              value={directionbus}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">
              Actividad Economica de Sucursal
            </div>
          </Col>
          <Col span={12}>
            <TextArea
              rows={4}
              placeholder="Ingrese la Actividad Economica de la Sucursal"
              name="economicactivitybus"
              onChange={onChangeAddBusiness}
              value={economicactivitybus}
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

export default ModalModifyBusiness;
