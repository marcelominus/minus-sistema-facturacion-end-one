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
// import userContext from "../../hook/user/userContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;
//================================================================
//INICIO DE CLASE
//================================================================
const ModalAddDosage = () => {
  //-----------------------------------------------------------------
  //Creamos el formato de la variable
  const dateFormat = "MM/DD/YYYY";

  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    datestartdos: `${moment().subtract(4, "h").format("MM/DD/YYYY")}`,
    dateenddos: "",
    sfcdos: "",
    numberauthorizationdos: "",
    numbernotestartdos: "",
    dosagedos: "",
    legenddos: "",
    conditiondos: "",
  });
  const {
    datestartdos,
    dateenddos,
    sfcdos,
    numberauthorizationdos,
    numbernotestartdos,
    dosagedos,
    legenddos,
    conditiondos,
  } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddUser = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  //Carga de TIPO DE MONEDA
  const onChangeAddState = (e) => {
    setDataForm({
      ...dataform,
      conditiondos: e,
    });
  };
  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  //   const { functionCreateUser, functionReadUser } = useContext(userContext);

  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {}, []);
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickBusiness = (e) => {
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
  const openModalUser = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      name: "",
      surname: "",
      user: "",
      email: "",
      ci: "",
      password: "",
      rolenew: "",
    });
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
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickBusiness}>
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
            Fecha de Inicio
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <DatePicker
              defaultValue={moment(
                `${moment().subtract(4, "h").format("l")}`,
                dateFormat
              )}
              format={dateFormat}
              onChange={(e) =>
                setDataForm({
                  ...dataform,
                  dateenddos: moment(e._d).format("MM/DD/YYYY"),
                })
              }
              style={{ width: "100%" }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Fecha de Final
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <DatePicker
              format={dateFormat}
              style={{ width: "100%" }}
              onChange={(e) =>
                setDataForm({
                  ...dataform,
                  dateenddos: moment(e._d).format("MM/DD/YYYY"),
                })
              }
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            SFC
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <InputNumber
              placeholder="Ingrese el Apellido de Usuario"
              prefix={<UserOutlined />}
              style={{ width: "100%" }}
              defaultValue={0}
              onChange={(e) => {
                setDataForm({
                  ...dataform,
                  sfcdos: e,
                });
              }}
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
              onChange={onChangeAddUser}
              value={numberauthorizationdos}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Numero de Inicio de Nota
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
                  numbernotestartdos: e,
                });
              }}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Llave de Dosificacion
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <TextArea
              rows={2}
              placeholder="Ingrese la Actividad Economica de la Sucursal"
              name="dosagedos"
              onChange={onChangeAddUser}
              value={dosagedos}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Legenda 453
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <TextArea
              rows={3}
              placeholder="Ingrese la Actividad Economica de la Sucursal"
              name="legenddos"
              onChange={onChangeAddUser}
              value={legenddos}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Estado
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={onChangeAddState}
              value={conditiondos}
            >
              <Option value="">--Seleccione una Opcion--</Option>
              <Option value="admin-all">Habilitado</Option>
              <Option value="user">DesHabilitado</Option>
            </Select>
          </Col>
        </Row>

        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
      <Button
        type="primary"
        onClick={openModalUser}
        icon={<PlusCircleOutlined />}
      >
        Registrar Dosificacion
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddDosage;
