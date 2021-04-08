import React, { Fragment } from "react";
import { Layout, Menu, Breadcrumb, Modal, Button } from "antd";
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

//================================================================
//INICIO DE CLASE
//================================================================
const FooterPage = () => {
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Footer style={{ textAlign: "center" }}>
        Ant Design ©2018 Created by Ant UED NEW
      </Footer>
    </Fragment>
  );
};

export default FooterPage;
