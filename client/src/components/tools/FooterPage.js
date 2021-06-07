import React, { Fragment } from "react";
import { Layout } from "antd";
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Footer} = Layout;
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
        Minus Maya©2021 Created and Developed by Minus Maya
      </Footer>
    </Fragment>
  );
};

export default FooterPage;
