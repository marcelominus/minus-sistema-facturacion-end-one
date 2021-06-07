import React, { Fragment } from "react";
import { Layout } from "antd";
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
//****************************************************************
//
import ModalSelectionDate from "../../components/tools/ModalSelectionData";
import ReturnData from "../../components/tools/ReturnData";
import TableSelectionData from "../../components/tools/TableSelectionData";
import ModalAddMeasure from "../../components/AdminMeasure/ModalAddMeasure"; // **** ---- ****
import DrawerTopMeasure from "../../components/AdminMeasure/DrawerTopMeasure";
import ModalAddProduct from "../../components/AdminProduct/ModalAddProduct";
import TableDataProduct from "../../components/AdminProduct/TableDataProduct";
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Content } = Layout;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const AdminProduct = (props) => {
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <ReturnData props={props} />
      <Layout style={{ minHeight: "100vh" }}>
        {/* --------------------------------------------------  */}
        <SideBar />
        {/* --------------------------------------------------  */}
        <Layout className="site-layout">
          <HeaderPage title={'Administrar Productos'}/>
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
              <TableSelectionData />
              {/* <ModalAddMeasure /> */}
              <DrawerTopMeasure />
              <ModalAddProduct />
              <TableDataProduct />
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

export default AdminProduct;
