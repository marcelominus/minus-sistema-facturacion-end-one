import React, { Fragment, useState, useContext, useEffect } from "react";
import "../../resource/scss/components/bill/modalacopyoriginal.scss";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col } from "antd";
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

//================================================================
//INICIO DE CLASE
//================================================================
const ModalCopyOriginal = ({ props }) => {
  //-------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  //-------------------------------------------------------
  //
  const { modalbillselection, arraybillprint, functionModalBillSelection } =
    useContext(billContext);

  //-------------------------------------------------------
  //
  useEffect(() => {
    if (modalbillselection === true) {
      setIsModalVisible(true);
      functionModalBillSelection(false);
    }
  }, [modalbillselection]);

  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickSelectOriginal = (e) => {
    e.preventDefault();
    functionModalBillSelection(false);
    setIsModalVisible(false);
    props.history.push("/bill");
  };

  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Generar Factura"
        visible={isModalVisible}
        width={400}
        closable={false}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button
            key="send"
            type="primary"
            onClick={onClickSelectOriginal}
            ghost
          >
            Cerrar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        <div className="container-modal-copy-original">
          <Row>
            <Col span={12}>
              <BlobProvider
                document={
                  <Invoice type="COPIA" arraybillprint={arraybillprint} />
                }
              >
                {({ blob, url }) => (
                  <Button
                    type="primary"
                    onClick={() => {
                      window.open(url);
                    }}
                    block
                    className="button-copy"
                  >
                    COPIA
                  </Button>
                )}
              </BlobProvider>
            </Col>
            <Col span={12}>
              <BlobProvider
                document={
                  <Invoice type="ORIGINAL" arraybillprint={arraybillprint} />
                }
              >
                {({ blob, url }) => (
                  <Button
                    type="primary"
                    onClick={() => {
                      window.open(url);
                    }}
                    block
                    className="button-original"
                  >
                    ORIGINAL
                  </Button>
                )}
              </BlobProvider>
            </Col>
          </Row>
        </div>
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalCopyOriginal;
