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
import measureContext from "../../hook/measure/measureContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalModifyMeasure = () => {
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
  const {
    modalupdatemeasure,
    arrayupdatemeasure,
    functionReadMeasure,
    functionModalUpdate,
    functionUpdateMeasure,
  } = useContext(measureContext);

  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if (modalupdatemeasure === true) {
      setIsModalVisible(true);
    }
  }, [modalupdatemeasure]);
  useEffect(() => {
    setDataForm({
      ...dataform,
      unitmeasure: arrayupdatemeasure[0].unitmeasure,
      descriptionmeasure: arrayupdatemeasure[0].descriptionmeasure,
    });
  }, [arrayupdatemeasure[0].idmeasure]);
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickMeasure = (e) => {
    e.preventDefault();

    if (
      unitmeasure.toLowerCase().trim() == "" ||
      descriptionmeasure.toLowerCase().trim() == ""
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      functionUpdateMeasure(
        unitmeasure,
        descriptionmeasure,
        arrayupdatemeasure[0].idmeasure
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
          functionReadMeasure();
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

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================

  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Modificar Unidad de Medida"
        visible={isModalVisible}
        width={450}
        closable={false}
        footer={[
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickMeasure}>
            Enviar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Unidad de Medida</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              name="unitmeasure"
              onChange={onChangeAddMeasure}
              value={unitmeasure}
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Descripcion de Medida</div>
          </Col>
          <Col span={12}>
            <TextArea
              rows={3}
              placeholder="Ingrese la Direccion de la Sucursal"
              name="descriptionmeasure"
              onChange={onChangeAddMeasure}
              value={descriptionmeasure}
            />
          </Col>
        </Row>

        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalModifyMeasure;
