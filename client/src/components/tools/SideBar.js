import React, { Fragment, useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
//*******************************************************
//
import { Link } from "react-router-dom";
//****************************************************************
//
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const SideBar = () => {
  //-------------------------------------------------------
  //
  const [step, setStep] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  //-----------------------------------------------------------------
  //
  useEffect(() => {
    //-----------------------------------------------------------------
    //VARIABLES de TOKEN
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany.trim() == "" || dataTokenBusiness.trim() == "") {
      console.log("LENNY LAURA DATOS VACIOS DESDE EL SIDEBAR");
    } else {
      setStep(true);
    }
  }, []);
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
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/start">Inicio</Link>
          </Menu.Item>
          <Menu.Item key="2" icon={<DesktopOutlined />}>
            <Link to="/company"> Empresa</Link>
          </Menu.Item>
          <Menu.Item key="3" icon={<DesktopOutlined />}>
            <Link to="/business"> Sucursal</Link>
          </Menu.Item>
          <Menu.Item key="4" icon={<DesktopOutlined />}>
            <Link to="/user">Usuario</Link>
          </Menu.Item>
          <Menu.Item key="5" icon={<DesktopOutlined />}>
            <Link to="/dosage">Dosificacion</Link>
          </Menu.Item>
          <Menu.Item key="6" icon={<DesktopOutlined />}>
            <Link to='/product'>Productos</Link>
          </Menu.Item>
          <Menu.Item key="7" icon={<DesktopOutlined />}>
            <Link to='/bill'>Facturacion</Link>
          </Menu.Item>
          <Menu.Item key="8" icon={<DesktopOutlined />}>
            <Link to="/selection">Seleccionar Area</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Fragment>
  );
};

export default SideBar;
