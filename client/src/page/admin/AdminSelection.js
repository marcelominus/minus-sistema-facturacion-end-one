import React, { Fragment } from "react";
import { Card, Layout } from "antd";
//Importamos framer motion
import { motion } from "framer-motion";
import {
  pageTransitionStart,
  pageVariantsStart,
} from "../../resource/js/effects";
//*******************************************************
//Importamos los componentes
import HeaderPage from "../../components/tools/HeaderPage";
import SideBar from "../../components/tools/SideBar";
import FooterPage from "../../components/tools/FooterPage";
//
import CardSelection from "../../components/AdminSelection/CardSelection";
import Title from '../../components/tools/Title';
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Content } = Layout;

//================================================================
//INICIO DE CLASE
//================================================================
const AdminSelection = () => {
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
          <HeaderPage title={'Area'}/>
          <Content style={{ margin: "0 16px" }}>
            <motion.div
              initial="out"
              animate="in"
              exit="out"
              variants={pageVariantsStart}
              transition={pageTransitionStart}
              className="container-padding"
            >
              <Title title={'Administrar Area de Trabajo'}/>
              <CardSelection />
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

export default AdminSelection;
