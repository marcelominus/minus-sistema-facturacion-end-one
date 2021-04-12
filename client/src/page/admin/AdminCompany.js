import React, { Fragment } from "react";
import { Layout } from "antd";
//****************************************************************
//Importamos framer motion
import { motion } from "framer-motion";
//****************************************************************
//IMPORTAMOS EFFECTOS
import {
  pageTransitionStart,
  pageVariantsStart,
} from "../../resource/js/effects";
//*******************************************************
//Importamos los compontes para las funciones de compania
import ModalAddCompany from "../../components/AdminCompany/ModalAddCompany";
import ModalAddLogo from "../../components/AdminCompany/ModalAddLogo";
import TableDataCompany from "../../components/AdminCompany/TableDataCompany";
//*******************************************************
//Importamos los componentes
import HeaderPage from "../../components/tools/HeaderPage";
import SideBar from "../../components/tools/SideBar";
import FooterPage from "../../components/tools/FooterPage";
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Content } = Layout;
//*******************************************************
//

//================================================================
//INICIO DE CLASE
//================================================================
const AdminCompany = () => {
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Layout style={{ minHeight: "100vh" }}>
        {/* --------------------------------------------------  */}
        <SideBar />
        {/* --------------------------------------------------  */}
        <Layout className="site-layout">
          {/* ------------------------- ********** ------------------------- */}
          <HeaderPage />
          {/* ------------------------- ********** ------------------------- */}
          <Content style={{ margin: "0 16px" }}>
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageVariantsStart}
              transition={pageTransitionStart}
              className="container-padding"
            >
              <h4>Anadir Nueva Empresa</h4>
              {/* ------------------------- ********** ------------------------- */}
              <ModalAddCompany />
              <ModalAddLogo />
              <TableDataCompany />
              {/* ------------------------- ********** ------------------------- */}
            </motion.div>
          </Content>
          {/* ------------------------- ********** ------------------------- */}
          <FooterPage />
          {/* ------------------------- ********** ------------------------- */}
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminCompany;
