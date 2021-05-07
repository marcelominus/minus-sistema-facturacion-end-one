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
        width={800}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickUser}>
            Enviar
          </Button>,
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Nombre de Empleado
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese el nombre de Usuario"
              prefix={<UserOutlined />}
              name="name"
              onChange={onChangeAddUser}
              value={name}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Apeliido de Empleado
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese el Apellido de Usuario"
              prefix={<UserOutlined />}
              name="surname"
              onChange={onChangeAddUser}
              value={surname}
            />
          </Col>
        </Row>

        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Email de Empleado
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              name="email"
              onChange={onChangeAddUser}
              value={email}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Carnet de Empleado
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese la Direccion de la Sucursal"
              prefix={<UserOutlined />}
              name="ci"
              onChange={onChangeAddUser}
              value={ci}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            USER de Empleado
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Ingrese la Ciudad de la Sucursal"
              prefix={<UserOutlined />}
              name="user"
              onChange={onChangeAddUser}
              value={user}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            PASSWORD de Empleado
          </Col>
          <Col span={12} style={{ background: "blue" }}>
            <Input
              placeholder="Lugar de la Sucursal"
              prefix={<UserOutlined />}
              name="password"
              onChange={onChangeAddUser}
              value={password}
            />
          </Col>
        </Row>
        <Row>
          <Col span={12} style={{ background: "transparent" }}>
            Seleccione rol de Usuario
          </Col>
          <Col span={12} style={{ background: "blue" }}>
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
