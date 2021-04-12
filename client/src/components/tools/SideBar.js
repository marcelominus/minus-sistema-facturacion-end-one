import React, { Fragment, useState } from "react";
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
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
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
            Usuario
          </Menu.Item>
          <Menu.Item key="5" icon={<DesktopOutlined />}>
            Dosificacion
          </Menu.Item>
          <Menu.Item key="6" icon={<DesktopOutlined />}>
            Facturacion
          </Menu.Item>
        </Menu>
      </Sider>
    </Fragment>
  );
};

export default SideBar;
