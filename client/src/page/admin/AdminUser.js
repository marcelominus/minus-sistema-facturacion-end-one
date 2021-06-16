import React, { Fragment, useEffect } from "react";
import { Layout } from "antd";
//****************************************************************
//Importamos MOTION para framer-motion
import { motion } from "framer-motion";
import {
  pageTransitionStart,
  pageVariantsStart,
} from "../../resource/js/effects";
//****************************************************************
//Importamos COMPONENTES de RETORNO CREACION DE INFORMACION INICIAL
import ModalSelectionDate from "../../components/tools/ModalSelectionData";
import ReturnData from "../../components/tools/ReturnData";
import TableSelectionData from "../../components/tools/TableSelectionData";

//*******************************************************
//Importamos los COMPONENTES de USER
import HeaderPage from "../../components/tools/HeaderPage";
import SideBar from "../../components/tools/SideBar";
import FooterPage from "../../components/tools/FooterPage";

import ModalAddUser from "../../components/AdminUser/ModalAddUser";
import ModalModifyUser from "../../components/AdminUser/ModalModifyUser";
import TableDataUser from "../../components/AdminUser/TableDataUser";
import Title from "../../components/tools/Title";
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Content } = Layout;
//*******************************************************
//

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const AdminUser = (props) => {
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <ReturnData props={props} />
      <Layout style={{ minHeight: "100vh" }}>
        {/* --------------------------------------------------  */}
        <SideBar />
        {/* --------------------------------------------------  */}
        <Layout className="site-layout">
          <HeaderPage title={"Usuarios"} />
          <Content style={{ margin: "0 16px" }}>
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageVariantsStart}
              transition={pageTransitionStart}
              className="container-padding"
            >
              <ModalSelectionDate props={props} />
              <Title title={'Administrar Usuarios'}/>
              <TableSelectionData />
              <ModalAddUser />
              <TableDataUser />
              <ModalModifyUser />
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

export default AdminUser;
