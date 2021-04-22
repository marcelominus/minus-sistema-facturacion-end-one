import React, {
  Fragment,
  useState,
  useEffect,
  useContext,
  useRef,
} from "react";
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
    datestartdos: `${moment().subtract(4, "h").format("MM/DD/YYYY")}`,
    dateenddos: "",
    sfcdos: "10",
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
  const {
    modalupdatedosage,
    arrayupdatedosage,
    functionCreateDosage,
    functionModalUpdate,
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
          messageSuccess(`Perfecto, Usuario Creado Correctamente ${elem}`, 2);
          //Cierrar el MODAL de ADD COMPANY
          setIsModalVisible(false);
          // //
          // functionReadBusiness();
          // functionReadUser();
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
    functionModalUpdate(false);
    console.log(moment(nombreRef.current.props.value.i).format("MM/DD/YYYY"));
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
        title="Añadir Empresa"
        visible={isModalVisible}
        width={800}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickDosage}>
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
              format={dateFormat}
              onChange={(e) =>
                setDataForm({
                  ...dataform,
                  dateenddos: moment(e._d).format("MM/DD/YYYY"),
                })
              }
              value={moment(datestartdos)}
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
              value={moment(dateenddos)}
              ref={nombreRef}
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
              defaultValue={parseInt(sfcdos)}
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
              defaultValue={parseInt(numbernotestartdos)}
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
              <Option value="enable">Habilitado</Option>
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
