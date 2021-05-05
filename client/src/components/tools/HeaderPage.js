import React, { Fragment } from "react";
import { Layout, Menu, Breadcrumb, Modal, Button } from "antd";
//Importamos framer motion
import { motion } from "framer-motion";
import {
  pageTransitionStart,
  pageVariantsStart,
} from "../../resource/js/effects";

//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const HeaderPage = ({title}) => {
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={pageVariantsStart}
          transition={pageTransitionStart}
          className="container-padding"
        >
          <div style={{ fontSize: "1.5rem", color: "white" }}>
            {title}
          </div>
        </motion.div>
      </Header>
    </Fragment>
  );
};

export default HeaderPage;
