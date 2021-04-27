import React, { Fragment, useState, useContext, useEffect } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, InputNumber, Select } from "antd";
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";

//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//*******************************************************
//Importamos los Context
import billContext from "../../hook/bill/billContext";

//*******************************************************
//Improtamos las Librerias necesarias
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import Invoice from "./Invoice";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalCopyOriginal = () => {
  //-------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  //-------------------------------------------------------
  //
  const {
    modalbillselection,
    arraybillprint,
    functionModalBillSelection,
  } = useContext(billContext);

  //-------------------------------------------------------
  //
  useEffect(() => {
    if (modalbillselection === true) {
      setIsModalVisible(true);
    }
  }, [modalbillselection]);

  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickSelectOriginal = (e) => {
    e.preventDefault();
  };

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN
  const handleCancel = () => {
    setIsModalVisible(false);
    functionModalBillSelection(false);
  };

  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Añadir Empresa"
        visible={isModalVisible}
        width={500}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickSelectOriginal}>
            Ok
          </Button>,
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}

        <Row>
          <Col span={12}>
            <BlobProvider
              document={
                <Invoice type="COPIA" arraybillprint={arraybillprint} />
              }
              style={{
                textDecoration: "none",
                padding: "10px",
                color: "#4a4a4a",
                backgroundColor: "#f2f2f2",
                border: "1px solid #4a4a4a",
              }}
            >
              {({ blob, url }) => (
                <Button
                  type="primary"
                  onClick={() => {
                    window.open(url);
                  }}
                  block
                >
                  COPIA
                </Button>
              )}
            </BlobProvider>
          </Col>
          <Col span={12}>
            <BlobProvider
              document={
                <Invoice type="ORIGNAL" arraybillprint={arraybillprint} />
              }
              style={{
                textDecoration: "none",
                padding: "10px",
                color: "#4a4a4a",
                backgroundColor: "#f2f2f2",
                border: "1px solid #4a4a4a",
                content: "Reference: ",
              }}
            >
              {({ blob, url }) => (
                <Button
                  type="primary"
                  onClick={() => {
                    window.open(url);
                  }}
                  block
                >
                  ORIGINAL
                </Button>
              )}
            </BlobProvider>
          </Col>
        </Row>

        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalCopyOriginal;
