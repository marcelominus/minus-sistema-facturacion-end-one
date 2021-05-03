import React, { Fragment } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
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
import ButtonAddBill from "../../components/AdminBill/ButtonAddBill";
import TableCurrentDosage from "../../components/AdminDosage/TableCurrentDosage";
import TableBill from "../../components/AdminBill/TableBill";
import ModalCopyOriginal from "../../components/AdminBill/ModalCopyOriginal";

//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Content } = Layout;
//*******************************************************
//

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const AdminBill = (props) => {
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
              {/* ------------------------- ********** ------------------------- */}
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
              <ButtonAddBill props={props} />
              {/* ------------------------- ********** ------------------------- */}
              <TableBill />
              {/* ------------------------- ********** ------------------------- */}
              <ModalCopyOriginal props={props}/>
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

export default AdminBill;
