import React, { Fragment } from "react";
import { Modal, Button, Row, Col, Input, Select, DatePicker } from "antd";
import { Layout } from "antd";
//Importamos framer motion
import { motion } from "framer-motion";
import {
  pageTransitionStart,
  pageVariantsStart,
} from "../../resource/js/effects";
//*******************************************************
//

//*******************************************************
//Importamos los componentes
import HeaderPage from "../../components/tools/HeaderPage";
import SideBar from "../../components/tools/SideBar";
import FooterPage from "../../components/tools/FooterPage";
//
import ModalSelectionDate from "../../components/tools/ModalSelectionData";
import ReturnData from "../../components/tools/ReturnData";
import TableSelectionData from "../../components/tools/TableSelectionData";
import TableCurrentDosage from "../../components/AdminDosage/TableCurrentDosage";
import FormAddBill from "../../components/AdminBill/FormAddBill";
import ModalAddProductUnique from "../../components/AdminBill/ModalAddProductUnique";
import TableProductBill from "../../components/AdminBill/TableProductBill";
import DrawerTopMeasure from "../../components/AdminMeasure/DrawerTopMeasure";
import ModalCopyOriginal from "../../components/AdminBill/ModalCopyOriginal";
import DrawerTopBill from "../../components/AdminBill/DrawerTopBill";
//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Content } = Layout;
//*******************************************************
//

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const AdminAddBill = (props) => {
  return (
    <Fragment>
      <ReturnData props={props} />
      <Layout style={{ minHeight: "100vh" }}>
        {/* --------------------------------------------------  */}
        <SideBar />
        {/* --------------------------------------------------  */}
        <Layout className="site-layout">
          <HeaderPage />
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
              {/* ------------------------- ********** ------------------------- */}
              <Row>
                <Col span={12} style={{ background: "transparent" }}>
                  <TableSelectionData />
                </Col>
                <Col span={12} style={{ background: "transparent" }}>
                  <TableCurrentDosage />
                </Col>
              </Row>
              {/* ------------------------- ********** ------------------------- */}
              <FormAddBill props={props} />
              {/* ------------------------- ********** ------------------------- */}
              <ModalCopyOriginal props={props}/>
              {/* ------------------------- ********** ------------------------- */}
              <ModalAddProductUnique />
              {/* ------------------------- ********** ------------------------- */}
              <TableProductBill />
              {/* ------------------------- ********** ------------------------- */}
              <DrawerTopMeasure />
              {/* ------------------------- ********** ------------------------- */}
              <DrawerTopBill />
              {/* ------------------------- ********** ------------------------- */}
            </motion.div>
          </Content>
          {/* ------------------------- ********** ------------------------- */}
          {/* </motion.div> */}
          <FooterPage />
          {/* ------------------------- ********** ------------------------- */}
        </Layout>
      </Layout>
    </Fragment>
  );
};

export default AdminAddBill;
