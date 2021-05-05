import React, { Fragment } from "react";
import { Layout, Table } from "antd";
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
import ModalAddBusiness from "../../components/AdminBusiness/ModalAddBusiness";
import TableDataBusiness from '../../components/AdminBusiness/TableDataBusiness';

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
const AdminBusiness = () => {
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
          <HeaderPage title={'Administrar Sucursales'}/>
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
              <h4>Anadir Nueva Sucursal</h4>
              {/* ------------------------- ********** ------------------------- */}
              <ModalAddBusiness />
              <TableDataBusiness />
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

export default AdminBusiness;
