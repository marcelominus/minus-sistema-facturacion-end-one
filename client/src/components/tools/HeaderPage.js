import React, { Fragment } from "react";
import "../../resource/scss/components/tools/headerpage.scss";
//****************************************************************
//Importamos los componente sde ANTD
import { Layout } from "antd";
//Importamos framer motion
import { motion } from "framer-motion";
//****************************************************************
//Importamos los Effectos
import {
  pageTransitionStart,
  pageVariantsStart,
} from "../../resource/js/effects";

//****************************************************************
//VARIABLES DE LAYOUT DE ANTD
const { Header } = Layout;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const HeaderPage = ({ title }) => {
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <Header className="site-layout-background" style={{ padding: 0 }}>
        <motion.div
          initial="out"
          animate="in"
          exit="out"
          variants={pageVariantsStart}
          transition={pageTransitionStart}
          className="container-padding"
        >
          <div className="container-header">
            <span className="title-header">{title}</span>
          </div>
        </motion.div>
      </Header>
    </Fragment>
  );
};

export default HeaderPage;
