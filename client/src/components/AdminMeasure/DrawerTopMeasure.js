import React, { Fragment, useState, useContext, useEffect } from "react";
import { Drawer, Button, Radio, Space, Row, Col, Input, Select } from "antd";
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
//
import TableDataMeasure from "./TableDataMeasure";
import ModalModifyMeasure from "./ModalModifyMeasure";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;
//================================================================
//INICIO DE CLASE
//================================================================
const DrawerTopMeasure = () => {
  //-----------------------------------------------------------------
  //
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
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
  const {modalmeasure, functionCreateMeasure, functionReadMeasure, functionModal } = useContext(
    measureContext
  );

  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if(modalmeasure === true){
      setIsDrawerVisible(true);
    }
  }, [modalmeasure]);

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
      functionCreateMeasure(unitmeasure, descriptionmeasure).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else {
          //Mensaje de CORRECTO
          messageSuccess(`Perfecto, Usuario Creado Correctamente`, 2);
          //Cierrar el MODAL de ADD COMPANY
          //   setIsModalVisible(false);
          // //
          functionReadMeasure();
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
    setIsDrawerVisible(false);
    functionModal(false);
  };

  //Funcion ABRIR el MODAL de ADD COMPANY
  const openDrawerUser = (e) => {
    e.preventDefault();
    setIsDrawerVisible(true);
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
      {/* <Button type="primary" onClick={openDrawerUser}>
        Open
      </Button> */}
      <Drawer
        title="Basic Drawer"
        placement={"top"}
        closable={false}
        onClose={handleCancel}
        visible={isDrawerVisible}
        key={"top"}
        height={500}
      >
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Unidad de Medida
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              name="unitmeasure"
              onChange={onChangeAddMeasure}
              value={unitmeasure}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
           Descripcion de Medida
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              name="descriptionmeasure"
              onChange={onChangeAddMeasure}
              value={descriptionmeasure}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Button type="primary" onClick={onClickMeasure}>
              Registrar
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <TableDataMeasure />
          </Col>
        </Row>
        {/* ------------------------- ********** ------------------------- */}
        <ModalModifyMeasure />
        {/* ------------------------- ********** ------------------------- */}
      </Drawer>
    </Fragment>
  );
};

export default DrawerTopMeasure;
