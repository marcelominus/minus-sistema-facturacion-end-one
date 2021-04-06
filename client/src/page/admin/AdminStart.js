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
import {
  DesktopOutlined,
  PieChartOutlined,
  FileOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
//*******************************************************
//
import SideBar from "../../components/tools/SideBar";

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
          <Header className="site-layout-background" style={{ padding: 0 }}>
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageVariantsStart}
              transition={pageTransitionStart}
              className="container-padding"
            >
              <div style={{ fontSize: "1.5rem", color: "white" }}>Inicio</div>
            </motion.div>
          </Header>
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
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Reprehenderit officiis delectus qui, aperiam in, enim modi
                similique officia, expedita placeat consectetur! Quisquam
                mollitia hic blanditiis soluta sed ipsum officiis iusto.cambios
                d
              </p>
              <p>lorem</p>
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
