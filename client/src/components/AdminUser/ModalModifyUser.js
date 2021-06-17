import React, { Fragment, useEffect, useState, useContext } from "react";
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

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const ModalModifyUser = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [role, setRole] = useState("");

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
  const {
    modalupdateuser,
    arrayupdateuser,
    functionReadUser,
    functionModalUpdate,
    functionUpdateUser,
  } = useContext(userContext);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if (modalupdateuser === true) {
      setIsModalVisible(true);
    }
  }, [modalupdateuser]);

  useEffect(() => {
    setDataForm({
      ...dataform,
      name: arrayupdateuser[0].name,
      surname: arrayupdateuser[0].surname,
      user: arrayupdateuser[0].user,
      email: arrayupdateuser[0].email,
      ci: arrayupdateuser[0].ci,
      password: arrayupdateuser[0].password,
      rolenew: arrayupdateuser[0].role,
    });
  }, [arrayupdateuser[0].identifier]);

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
  const onClickUser = (e) => {
    e.preventDefault();
    //Verifiacmos las entradas de usuario
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
      functionUpdateUser(
        name,
        surname,
        user,
        email,
        ci,
        password,
        rolenew,
        arrayupdateuser[0].identifier
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
          functionReadUser();
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

  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Añadir Empresa"
        visible={isModalVisible}
        closable={false}
        width={500}
        footer={[
          
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickUser}>
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
              placeholder="Ingrese el nombre de Usuario"
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
              placeholder="Ingrese el Apellido de Usuario"
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
    </Fragment>
  );
};

export default ModalModifyUser;
