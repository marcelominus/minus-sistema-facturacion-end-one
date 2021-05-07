import React, { Fragment, useState, useEffect } from "react";
import "../../resource/scss/components/tools/sidenavbar.scss";
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
  const [role, setRole] = useState(false);
  const [avatar, setAvatar] = useState('')
  const [collapsed, setCollapsed] = useState(false);
  const onCollapse = () => {
    setCollapsed(!collapsed);
  };
  //-----------------------------------------------------------------
  //
  useEffect(() => {
    //-----------------------------------------------------------------
    //VARIABLES de TOKEN
    let dataTokenUser = JSON.parse(localStorage.getItem("datauser"));
    setAvatar(dataTokenUser[0].avatar)
    let dataTokenRole = localStorage.getItem("role");
    
    switch (dataTokenRole) {
      case 'master':
        setRole('master')
        break;
      case 'admin-all':
        setRole('admin-all')
        break;
      case 'user':
        setRole('user')
        break;
      default:
        break;
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
          <div className="area-user">
            <img
              src={avatar}
              alt=""
              className="image-avatar"
            />
          </div>
          <Menu.Item key="1" icon={<PieChartOutlined />}>
            <Link to="/start">Inicio</Link>
          </Menu.Item>
          { (role === 'master') ? 
            <Menu.Item key="2" icon={<DesktopOutlined />}>
              <Link to="/company"> Empresa</Link>
            </Menu.Item>
          : null}
          { (role === 'master') ? 
            <Menu.Item key="3" icon={<DesktopOutlined />}>
              <Link to="/business"> Sucursal</Link>
            </Menu.Item>
          :null}
          { (role === 'master' || role==='admin-all')? 
            <Menu.Item key="4" icon={<DesktopOutlined />}>
              <Link to="/user">Usuario</Link>
            </Menu.Item>
          :null}
          { (role === 'master' || role==='admin-all')? 
            <Menu.Item key="5" icon={<DesktopOutlined />}>
              <Link to="/dosage">Dosificacion</Link>
            </Menu.Item>
          :null}
          { (role === 'master' || role==='admin-all')? 
            <Menu.Item key="6" icon={<DesktopOutlined />}>
              <Link to="/product">Productos</Link>
            </Menu.Item>
          :null}
          
          <Menu.Item key="7" icon={<DesktopOutlined />}>
            <Link to="/bill">Facturacion</Link>
          </Menu.Item>
          { (role === 'master')? 
            <Menu.Item key="8" icon={<DesktopOutlined />}>
              <Link to="/selection">Seleccionar Area</Link>
            </Menu.Item>
          :null}
          
        </Menu>
      </Sider>
    </Fragment>
  );
};

export default SideBar;
