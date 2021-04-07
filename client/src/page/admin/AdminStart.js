import React, { Fragment } from "react";
import { Layout, Menu, Breadcrumb, Modal, Button } from "antd";
//Importamos framer motion
import { motion } from "framer-motion";
import {
  pageTransitionStart,
  pageVariantsStart,
} from "../../resource/js/effects";
//*******************************************************
//
import ModalStart from "../../components/AdminStart/ModalStart";
//*******************************************************
//Importamos los componentes
import HeaderPage from "../../components/tools/HeaderPage";
import SideBar from "../../components/tools/SideBar";
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
//*******************************************************
//

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const AdminStart = () => {
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        {/* --------------------------------------------------  */}
        <SideBar />
        {/* --------------------------------------------------  */}
        <Layout className="site-layout">
          <HeaderPage />
          <Content style={{ margin: "0 16px" }}>
            {/* <div
              className="site-layout-background"
              style={{ padding: 24, minHeight: 360 }}
            ></div> */}
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageVariantsStart}
              transition={pageTransitionStart}
              className="container-padding"
            >
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit
                maxime ut beatae repudiandae! Quae et laudantium saepe est,
                excepturi, blanditiis quos recusandae id, cum at sunt sit
                corrupti omnis facilis.
              </p>
              <ModalStart />
            </motion.div>
          </Content>
          {/* </motion.div> */}
          <Footer style={{ textAlign: "center" }}>
            Ant Design ©2018 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminStart;
