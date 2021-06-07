import React, { Fragment, useState, useEffect } from "react";
import "../../resource/scss/components/tools/sidenavbar.scss";
import { Layout, Menu, Modal } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
//*******************************************************
//
import { Link, Redirect } from "react-router-dom";
//****************************************************************
//
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
  //
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
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
    //
  }, []);
  //-----------------------------------------------------------------
  //ZONE FUNCTION
  const onClickExit = (e) => {
    e.preventDefault();
    Modal.confirm({
      title: "Confirmar",
      icon: <ExclamationCircleOutlined />,
      content: "Seguro que desea Salir",
      okText: "Salir",
      cancelText: "Cancel",
      onOk: () => {
        // functionPetitionExit();
        setExit(true);
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
          // defaultSelectedKeys={["1"]}
          mode="inline"
          collapsedWidth="20"
        >
          <div className="area-user">
            <img src={avatar} alt="" className="image-avatar" />
          </div>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/start">Inicio</Link>
          </Menu.Item>
          {role === "master" ? (
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/company"> Empresa</Link>
            </Menu.Item>
          ) : null}
          {role === "master" ? (
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <Link to="/business"> Sucursal</Link>
            </Menu.Item>
          ) : null}
          {role === "master" || role === "admin-all" ? (
            <Menu.Item key="4" icon={<DesktopOutlined />}>
              <Link to="/user">Usuario</Link>
            </Menu.Item>
          ) : null}
          {role === "master" || role === "admin-all" ? (
            <Menu.Item key="5" icon={<DesktopOutlined />}>
              <Link to="/dosage">Dosificacion</Link>
            </Menu.Item>
          ) : null}
          {role === "master" || role === "admin-all" ? (
            <Menu.Item key="6" icon={<DesktopOutlined />}>
              <Link to="/product">Productos</Link>
            </Menu.Item>
          ) : null}
          <Menu.Item key="7" icon={<DesktopOutlined />}>
            <Link to="/bill">Facturacion</Link>
          </Menu.Item>
          {role === "master" ? (
            <Menu.Item key="8" icon={<DesktopOutlined />}>
              <Link to="/selection">Seleccionar Area</Link>
            </Menu.Item>
          ) : null}
          <Menu.Item key="9" icon={<DesktopOutlined />} className="item">
            <a onClick={onClickExit}>Cerrar Sesion</a>
          </Menu.Item>
          {exit ? <Redirect to={"/"} /> : null}
        </Menu>
      </Sider>
    </Fragment>
  );
};

export default SideBar;
