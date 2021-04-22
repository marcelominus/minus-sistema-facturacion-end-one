import React, { Fragment, useState, useEffect, useContext } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import {
  Modal,
  Button,
  Row,
  Col,
  Input,
  Select,
  DatePicker,
  Space,
  InputNumber,
} from "antd";
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";
//****************************************************************
//Importamos la libreria de MOMENT
import moment from "moment";
//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//*******************************************************
//Importamos los CONTEXT
import measureContext from "../../hook/measure/measureContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const ModalAddMeasure = () => {
  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    unitmeasure: "",
    descriptionmeasure: "",
  });
  const { unitmeasure, descriptionmeasure } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddMeasure = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };

  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  //   const { functionCreateUser, functionReadUser } = useContext(userContext);
  const { functionCreateMeasure } = useContext(measureContext);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {}, []);
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickMeasure = (e) => {
    e.preventDefault();
  };
  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN
  const handleCancel = () => {
    setIsModalVisible(false);
    resetForm();
  };

  //Funcion ABRIR el MODAL de ADD COMPANY
  const openModalMeasure = (e) => {
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

  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Añadir Empresa"
        visible={isModalVisible}
        width={800}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickMeasure}>
            Enviar
          </Button>,
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        {/* const {identifierbus, datestartdos, dateenddos, sfcdos, numberauthorizationdos, numbernotestartdos, dosagedos, legenddos, conditiondos} = req.body; */}

        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Numero de Autorizacion de Dosificacion
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              name="numberauthorizationdos"
              onChange={onChangeAddMeasure}
              //   value={numberauthorizationdos}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Numero de Autorizacion de Dosificacion
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              name="numberauthorizationdos"
              onChange={onChangeAddMeasure}
              //   value={numberauthorizationdos}
            />
          </Col>
        </Row>

        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
      <Button
        type="primary"
        onClick={openModalMeasure}
        icon={<PlusCircleOutlined />}
      >
        Registrar Dosificacion
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddMeasure;
