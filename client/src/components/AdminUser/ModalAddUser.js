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
//*******************************************************
//Importamos los CONTEXT
import userContext from "../../hook/user/userContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalAddUser = () => {
  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [role, setRole] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    name: "",
    surname: "",
    user: "",
    email: "",
    ci: "",
    password: "",
    rolenew: "",
  });
  const { name, surname, user, email, ci, password, rolenew } = dataform;
  //Carga la informacion de COMPANY
  const onChangeAddUser = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  //Carga de TIPO DE MONEDA
  const onChangeAddRol = (e) => {
    setDataForm({
      ...dataform,
      rolenew: e,
    });
  };
  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  const { functionCreateUser, functionReadUser } = useContext(userContext);

  //ZONE USE EFFECT
  useEffect(() => {
    let dataTokenRole = localStorage.getItem("role");

    switch (dataTokenRole) {
      case "master":
        setRole("master");
        break;
      case "admin-all":
        setRole("admin-all");
        break;
      case "user":
        setRole("user");
        break;
      default:
        break;
    }
  }, []);

  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickBusiness = (e) => {
    e.preventDefault();

    if (
      name.toLowerCase().trim() == "" ||
      surname.toLowerCase().trim() == "" ||
      user.toLowerCase().trim() == "" ||
      email.toLowerCase().trim() == "" ||
      ci.toLowerCase().trim() == "" ||
      password.toLowerCase().trim() == "" ||
      rolenew.trim() == ""
    ) {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      functionCreateUser(
        name,
        surname,
        user,
        email,
        ci,
        password,
        rolenew
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
          functionReadUser();
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
        title="Añadir Usuario"
        closable={false}
        visible={isModalVisible}
        width={500}
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
            <div className="title-formulario">Nombre de Empleado</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Nombre del Empleado"
              name="name"
              onChange={onChangeAddUser}
              value={name}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Apeliido de Empleado</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Apellido del Empleado"
              name="surname"
              onChange={onChangeAddUser}
              value={surname}
              className="input-unique"
            />
          </Col>
        </Row>

        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Email de Empleado</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Email del Empleado"
              name="email"
              onChange={onChangeAddUser}
              value={email}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Carnet de Empleado</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el Carnet del Empleado"
              name="ci"
              onChange={onChangeAddUser}
              value={ci}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">USER de Empleado</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el USER del Empleado"
              name="user"
              onChange={onChangeAddUser}
              value={user}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">PASSWORD de Empleado</div>
          </Col>
          <Col span={12}>
            <Input
              placeholder="Ingrese el PASSWORD del Empleado"
              name="password"
              onChange={onChangeAddUser}
              value={password}
              className="input-unique"
            />
          </Col>
        </Row>
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Seleccione rol de Usuario</div>
          </Col>
          <Col span={12}>
            <Select
              defaultValue=""
              style={{ width: "100%" }}
              onChange={onChangeAddRol}
              value={rolenew}
              className="input-unique"
            >
              <Option value="">--Seleccione una Opcion--</Option>
              {role === "master" ? (
                <Option value="master">Administrador General</Option>
              ) : null}
              <Option value="admin-all">Administrador</Option>
              <Option value="user">Empleado</Option>
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
        Registrar Usuario
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddUser;
