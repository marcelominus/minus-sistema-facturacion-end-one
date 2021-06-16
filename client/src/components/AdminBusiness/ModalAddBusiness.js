import React, { Fragment, useState, useContext } from "react";
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
const ModalAddBusiness = () => {
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
  const { arraycompany } = useContext(companyContext);
  const { functionCreateBusiness, functionReadBusiness } =
    useContext(businessContext);

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
      functionCreateBusiness(
        namebus,
        ofbus,
        citybus,
        placebus,
        directionbus,
        economicactivitybus,
        identifiercom
      ).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else {
          //Mensaje de CORRECTO
          messageSuccess(`Perfecto, Sucursal Creada Correctamente ${elem}`, 2);
          //Cierrar el MODAL de ADD COMPANY
          setIsModalVisible(false);
          //Realiza la peticion de Lectura de Sucursales
          functionReadBusiness();
          //RESETEAMOS LAS ENTRADAS DEL FORM MODAL
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
  const openModalBusiness = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
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
        title="Añadir Sucursal"
        visible={isModalVisible}
        width={600}
        closable={false}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickBusiness}>
            Enviar
          </Button>,
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        <Row>
          <Col span={12}>
            <div className="title-formulario">Seleccione la Empresa</div>
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
            <div className="title-formulario">
              Ingrese el Nombre de Sucursal
            </div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el nombre de Sucursal"
              name="namebus"
              onChange={onChangeAddBusiness}
              value={namebus}
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Responsable Sucursal</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Nombre de Propietario Sucursal"
              name="ofbus"
              onChange={onChangeAddBusiness}
              value={ofbus}
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
            />
          </Col>
        </Row>
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
      <Button
        type="primary"
        onClick={openModalBusiness}
        icon={<PlusCircleOutlined />}
        ghost
      >
        Registrar Sucursal
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddBusiness;
