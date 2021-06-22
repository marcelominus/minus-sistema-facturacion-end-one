import React, { Fragment, useState, useEffect, useContext } from "react";
import "../../resource/scss/components/tools/sidenavbar.scss";
//****************************************************************
//Importamos Componentes de ANTD
import { Layout, Menu, Modal } from "antd";
import {
  ExclamationCircleOutlined,
  ShopOutlined,
  GroupOutlined,
  UserOutlined,
  ScheduleOutlined,
  HomeOutlined,
  ShoppingOutlined,
  FileDoneOutlined,
  ApartmentOutlined,
  CloseSquareOutlined,
} from "@ant-design/icons";
//*******************************************************
//Importamos Componentes de REACT ROUTER DOM
import { Link, Redirect } from "react-router-dom";
//****************************************************************
//Importamos el CONTEXT
import loginContext from "../../hook/login/loginContext";
import toolContext from "../../hook/tool/toolContext";
//****************************************************************
//Desglozamos el componente LAYOUT
const { Sider } = Layout;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const SideBar = () => {
  //-------------------------------------------------------
  //ZONE USE STATE
  const [role, setRole] = useState(false);
  const [avatar, setAvatar] = useState("");
  const [exit, setExit] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [select, setSelect] = useState("1");
  //
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  //-----------------------------------------------------------------
  //ZONE DE USE CONTEXT
  const { functionExitLogin } = useContext(loginContext);
  const { varselect, functionSelectorSidebar } = useContext(toolContext);
  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //-----------------------------------------------------------------
    //VARIABLES de TOKEN
    let dataTokenUser = JSON.parse(localStorage.getItem("datauser")); //Extraemos el dato de datauser
    setAvatar(dataTokenUser[0].avatar); //Cargamos el dato en AVATAR

    let dataTokenRole = localStorage.getItem("role"); //Extraemos el dato de ROLE
    //Prohibimos comandos deacuerdo a tipo de ROLE
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
  //ZONE FUNCTION
  const onClickExit = () => {
    Modal.confirm({
      title: "Confirmar",
      icon: <ExclamationCircleOutlined />,
      content: "Seguro que desea Salir",
      okText: "Salir",
      cancelText: "Cancel",
      onOk: () => {
        setExit(true);
        functionExitLogin();
        functionSelectorSidebar(1);
      },
      onCancel: () => {
        functionSelectorSidebar(varselect);
      },
    });
  };
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
        <div className="logo" />
        <Menu
          theme="dark"
          defaultSelectedKeys={[`${varselect}`]}
          mode="inline"
          collapsedWidth="20"
        >
          <div className="area-user">
            <img src={avatar} alt="" className="image-avatar" />
          </div>
          <Menu.Item
            key="1"
            icon={<HomeOutlined />}
            onClick={() => functionSelectorSidebar(1)}
          >
            <Link to="/start">Inicio</Link>
          </Menu.Item>
          {role === "master" ? (
            <Menu.Item
              key="2"
              icon={<GroupOutlined />}
              onClick={() => functionSelectorSidebar(2)}
            >
              <Link to="/company"> Empresa</Link>
            </Menu.Item>
          ) : null}
          {role === "master" ? (
            <Menu.Item
              key="3"
              icon={<ShopOutlined />}
              onClick={() => functionSelectorSidebar(3)}
            >
              <Link to="/business"> Sucursal</Link>
            </Menu.Item>
          ) : null}
          {role === "master" || role === "admin-all" ? (
            <Menu.Item
              key="4"
              icon={<UserOutlined />}
              onClick={() => functionSelectorSidebar(4)}
            >
              <Link to="/user">Usuario</Link>
            </Menu.Item>
          ) : null}
          {role === "master" || role === "admin-all" ? (
            <Menu.Item
              key="5"
              icon={<ScheduleOutlined />}
              onClick={() => functionSelectorSidebar(5)}
            >
              <Link to="/dosage">Dosificacion</Link>
            </Menu.Item>
          ) : null}
          {role === "master" || role === "admin-all" ? (
            <Menu.Item
              key="6"
              icon={<ShoppingOutlined />}
              onClick={() => functionSelectorSidebar(6)}
            >
              <Link to="/product">Productos</Link>
            </Menu.Item>
          ) : null}
          <Menu.Item
            key="7"
            icon={<FileDoneOutlined />}
            onClick={() => functionSelectorSidebar(7)}
          >
            <Link to="/bill">Facturacion</Link>
          </Menu.Item>
          {role === "master" ? (
            <Menu.Item
              key="8"
              icon={<ApartmentOutlined />}
              onClick={() => functionSelectorSidebar(8)}
            >
              <Link to="/selection">Seleccionar Area</Link>
            </Menu.Item>
          ) : null}
          {role === "master" ? (
            <Menu.Item
              key="9"
              icon={<ApartmentOutlined />}
              onClick={() => functionSelectorSidebar(9)}
            >
              <Link to="/report">Generar Reporte</Link>
            </Menu.Item>
          ) : null}
          <Menu.Item key="10" icon={<CloseSquareOutlined />} className="item">
            <a onClick={onClickExit}>Cerrar Sesion</a>
          </Menu.Item>
          {exit ? <Redirect to={"/"} /> : null}
        </Menu>
      </Sider>
    </Fragment>
  );
};

export default SideBar;
