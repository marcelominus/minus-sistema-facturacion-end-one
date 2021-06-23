import React, { Fragment, useContext } from "react";
import { Layout, Spin } from "antd";
//****************************************************************
//Importamos framer motion y EFECTOS
import { motion } from "framer-motion";
import {
  pageTransitionStart,
  pageVariantsStart,
} from "../../resource/js/effects";
//*******************************************************
//Importamos los compontes para las funciones de compania
import FormReport from "../../components/AdminReport/FormReport";
import Title from "../../components/tools/Title";
import ModalGenerateInformation from "../../components/AdminReport/ModalGenerateInformation";
import TableSelectionData from "../../components/tools/TableSelectionData";
//*******************************************************
//Importamos los componentes
import HeaderPage from "../../components/tools/HeaderPage";
import SideBar from "../../components/tools/SideBar";
import FooterPage from "../../components/tools/FooterPage";
//****************************************************************
//Importamos CONTEXT
import informationContext from "../../hook/information/informationContext";
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Content } = Layout;

//================================================================
//INICIO DE CLASE
//================================================================
const AdminReport = () => {
  //-----------------------------------------------------------------
  //ZONE USE CONTEXT
  const { openspin } = useContext(informationContext);
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
          <HeaderPage title={"Reporte"} />
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
              <Spin spinning={openspin} size="large" tip="Espere un momento...">
                <Title title={"Generar Reportes"} />
                {/* ------------------------- ********** ------------------------- */}
                <TableSelectionData />
                <FormReport />
                <ModalGenerateInformation />
                {/* ------------------------- ********** ------------------------- */}
              </Spin>
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

export default AdminReport;
