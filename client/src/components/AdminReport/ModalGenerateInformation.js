import React, { Fragment, useState, useContext, useEffect } from "react";
import "../../resource/scss/components/bill/modalacopyoriginal.scss";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col } from "antd";
//*******************************************************
//Importamos los Context
import informationContext from "../../hook/information/informationContext";
//*******************************************************
//Improtamos las Librerias necesarias
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
//****************************************************************
//
import ReportPdf from "./ReportPdf";
//================================================================
//INICIO DE CLASE
//================================================================
const ModalGenerateInformation = ({ props }) => {
  //-------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  //-------------------------------------------------------
  //
  const {
    modalopeninformation,
    arrayinformation,
    arrayinformationbill,
    functionOpenModal,
  } = useContext(informationContext);

  //-------------------------------------------------------
  //
  useEffect(() => {
    if (modalopeninformation === true) {
      setIsModalVisible(true);
      functionOpenModal(false);
    }
  }, [modalopeninformation]);

  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickGenerateInformation = () => {
    setIsModalVisible(false);
    functionOpenModal(false);
  };

  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Generar Reporte"
        visible={isModalVisible}
        width={400}
        closable={false}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button
            key="send"
            type="primary"
            onClick={onClickGenerateInformation}
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
                  <ReportPdf
                    arrayinformation={arrayinformation}
                    arrayinformationbill={arrayinformationbill}
                  />
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
                    PDF
                  </Button>
                )}
              </BlobProvider>
            </Col>
            <Col span={12}>
              <Button
                type="primary"
                onClick={() => {
                  console.log();
                  window.open(arrayinformation[0].urltxt);
                }}
                block
                className="button-original"
              >
                TXT
              </Button>
            </Col>
          </Row>
        </div>
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalGenerateInformation;
