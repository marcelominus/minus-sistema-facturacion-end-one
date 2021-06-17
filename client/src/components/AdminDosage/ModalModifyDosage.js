import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
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
import dosageContext from "../../hook/dosage/dosageContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;
const { RangePicker } = DatePicker;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const ModalModifyDosage = () => {
  //-----------------------------------------------------------------
  //Creamos el formato de la variable
  const dateFormat = "MM/DD/YYYY";
  //
  const nombreRef = useRef(null);
  //
  const [isModalVisible, setIsModalVisible] = useState(false);

  const [dataform, setDataForm] = useState({
    datestartdos: "",
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
  const {
    modalupdatedosage,
    arrayupdatedosage,
    functionReadDosage,
    functionModalUpdate,
    functionUpdateDosage,
  } = useContext(dosageContext);

  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if (modalupdatedosage === true) {
      setIsModalVisible(true);
    }
  }, [modalupdatedosage]);

  useEffect(() => {
    setDataForm({
      ...dataform,
      datestartdos: arrayupdatedosage[0].datestartdos,
      dateenddos: arrayupdatedosage[0].dateenddos,
      sfcdos: arrayupdatedosage[0].sfcdos,
      numberauthorizationdos: arrayupdatedosage[0].numberauthorizationdos,
      numbernotestartdos: arrayupdatedosage[0].numbernotestartdos,
      dosagedos: arrayupdatedosage[0].dosagedos,
      legenddos: arrayupdatedosage[0].legenddos,
      conditiondos: arrayupdatedosage[0].conditiondos,
    });
  }, [arrayupdatedosage[0].identifierdos]);
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
      functionUpdateDosage(
        datestartdos,
        dateenddos,
        sfcdos,
        numberauthorizationdos,
        numbernotestartdos,
        dosagedos,
        legenddos,
        conditiondos,
        arrayupdatedosage[0].identifierdos
      ).then((elem) => {
        if (elem === "duplicate") {
          //Mensage de WARNING
          messageWarning("Entradas REPETIDAS, Revise nuevamente los datos", 2);
        } else if (elem === "fail-create") {
          //Mensaje de ERROR
          messageError("Error, Intente mas Tarde", 2);
        } else {
          //Mensaje de CORRECTO
          messageSuccess(`Perfecto, Dosificacion Modificada Correctamente`, 2);
          //Cierrar el MODAL de ADD COMPANY
          setIsModalVisible(false);
          functionModalUpdate(false);
          functionReadDosage();
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

  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      sfcdos: "",
      numberauthorizationdos: "",
      numbernotestartdos: "",
      dosagedos: "",
      legenddos: "",
      conditiondos: "",
    });
  };

  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Modificar Dosificación"
        visible={isModalVisible}
        width={700}
        closable={false}
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
              value={moment(datestartdos)}
              style={{ width: "100%" }}
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
              style={{ width: "100%" }}
              onChange={(e) =>
                setDataForm({
                  ...dataform,
                  dateenddos: moment(e._d).format("MM/DD/YYYY"),
                })
              }
              value={moment(dateenddos)}
              ref={nombreRef}
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
              style={{ width: "100%" }}
              defaultValue={parseInt(sfcdos)}
              onChange={(e) => {
                setDataForm({
                  ...dataform,
                  sfcdos: e,
                });
              }}
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
          <Col span={12}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              name="numberauthorizationdos"
              onChange={onChangeAddUser}
              value={numberauthorizationdos}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Numero de Inicio de Nota</div>
          </Col>
          <Col span={12}>
            <InputNumber
              placeholder="Ingrese la Direccion de la Sucursal"
              style={{ width: "100%" }}
              defaultValue={parseInt(numbernotestartdos)}
              onChange={(e) => {
                setDataForm({
                  ...dataform,
                  numbernotestartdos: e,
                });
              }}
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
              rows={2}
              placeholder="Ingrese la Actividad Economica de la Sucursal"
              name="dosagedos"
              onChange={onChangeAddUser}
              value={dosagedos}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Legenda 453</div>
          </Col>
          <Col span={12}>
            <TextArea
              rows={3}
              placeholder="Ingrese la Actividad Economica de la Sucursal"
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
    </Fragment>
  );
};

export default ModalModifyDosage;
