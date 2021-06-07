import React, { Fragment } from "react";
import { Layout } from "antd";

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
import FooterPage from "../../components/tools/FooterPage";

import CardStartUser from '../../components/AdminStart/CardStartUser';
//****************************************************************
//
import Authenticate from '../../components/tools/Authenticate';
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Content } = Layout;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const AdminStart = () => {
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <Authenticate />
      <Layout style={{ minHeight: "100vh" }}>
        {/* --------------------------------------------------  */}
        <SideBar />
        {/* --------------------------------------------------  */}
        <Layout className="site-layout">
          <HeaderPage title={'Inicio'}/>
          <Content style={{ margin: "0 16px" }}>
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageVariantsStart}
              transition={pageTransitionStart}
              className="container-padding"
            >
              <h1>Bienvenido al Sistema de Facturacion</h1>
              <CardStartUser/>
            </motion.div>
          </Content>
          {/* ------------------------- ********** ------------------------- */}
          {/* </motion.div> */}
          <FooterPage />
          {/* ------------------------- ********** ------------------------- */}
          <ModalStart />
          {/* ------------------------- ********** ------------------------- */}
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminStart;
