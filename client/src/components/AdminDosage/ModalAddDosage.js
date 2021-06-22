import React, { Fragment, useState, useContext } from "react";
import "../../resource/scss/default.scss";
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
import dosageContext from "../../hook/dosage/dosageContext";
import toolContext from "../../hook/tool/toolContext";
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
    sfcdos: "1",
    numberauthorizationdos: "",
    numbernotestartdos: "0",
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
  const { functionCreateDosage, functionReadDosage } =
    useContext(dosageContext);

  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickDosage = (e) => {
    e.preventDefault();

    if (
      numberauthorizationdos.toLowerCase().trim() == "" ||
      dosagedos.toLowerCase().trim() == "" ||
      legenddos.trim() == "" ||
      conditiondos.trim() == ""
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      functionCreateDosage(
        datestartdos,
        dateenddos,
        sfcdos,
        numberauthorizationdos,
        numbernotestartdos,
        dosagedos,
        legenddos,
        conditiondos
      ).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else {
          //Mensaje de CORRECTO
          messageSuccess(`Perfecto, Dosificacion registrado correctamente`, 2);
          //Cierrar el MODAL de ADD COMPANY
          setIsModalVisible(false);
          // //
          functionReadDosage();
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
      datestartdos: `${moment().subtract(4, "h").format("MM/DD/YYYY")}`,
      dateenddos: "",
      sfcdos: "1",
      numberauthorizationdos: "",
      numbernotestartdos: "0",
      dosagedos: "",
      legenddos: "",
      conditiondos: "",
    });
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Añadir Dosificacion"
        visible={isModalVisible}
        width={700}
        footer={[
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickDosage}>
            Enviar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        {/* const {identifierbus, datestartdos, dateenddos, sfcdos, numberauthorizationdos, numbernotestartdos, dosagedos, legenddos, conditiondos} = req.body; */}
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Fecha de Inicio</div>
          </Col>
          <Col span={12}>
            <DatePicker
              format={dateFormat}
              onChange={(e) =>
                setDataForm({
                  ...dataform,
                  dateenddos: moment(e._d).format("MM/DD/YYYY"),
                })
              }
              style={{ width: "100%" }}
              value={datestartdos !== "" ? moment(datestartdos) : null}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Fecha de Final</div>
          </Col>
          <Col span={12}>
            <DatePicker
              format={dateFormat}
              placeholder="Fecha Final"
              style={{ width: "100%" }}
              onChange={(e) =>
                setDataForm({
                  ...dataform,
                  dateenddos: moment(e._d).format("MM/DD/YYYY"),
                })
              }
              value={dateenddos !== "" ? moment(dateenddos) : null}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">
              Numero de Autorizacion de Dosificacion
            </div>
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Numero de Autorizacion de Dosificacion"
              name="numberauthorizationdos"
              onChange={onChangeAddUser}
              value={numberauthorizationdos}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">SFC</div>
          </Col>
          <Col span={12}>
            <InputNumber
              placeholder="Ingrese el Apellido de Usuario"
              prefix={<UserOutlined />}
              style={{ width: "100%" }}
              onChange={(e) => {
                setDataForm({
                  ...dataform,
                  sfcdos: e,
                });
              }}
              value={sfcdos}
              className="input-unique"
            />
          </Col>
        </Row>

        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Numero de Inicio de Nota</div>
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <InputNumber
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              style={{ width: "100%" }}
              onChange={(e) => {
                setDataForm({
                  ...dataform,
                  numbernotestartdos: e,
                });
              }}
              value={numbernotestartdos}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Llave de Dosificacion</div>
          </Col>
          <Col span={12}>
            <TextArea
              rows={3}
              placeholder="Ingrese la Llave de Dosificacion"
              name="dosagedos"
              onChange={onChangeAddUser}
              value={dosagedos}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Leyenda 453</div>
          </Col>
          <Col span={12}>
            <TextArea
              rows={3}
              placeholder="Ingrese la Leyenda 453"
              name="legenddos"
              onChange={onChangeAddUser}
              value={legenddos}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Estado</div>
          </Col>
          <Col span={12}>
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={onChangeAddState}
              value={conditiondos}
              className="input-unique"
            >
              <Option value="">--Seleccione una Opcion--</Option>
              <Option value="active">Habilitado</Option>
              <Option value="disable">DesHabilitado</Option>
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
        ghost
      >
        Registrar Dosificacion
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddDosage;
