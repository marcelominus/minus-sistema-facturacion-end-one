import React, { Fragment, useState, useContext } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, DatePicker, ConfigProvider } from "antd";
//****************************************************************
//
import moment from "moment";
import "moment/locale/es-do";
import locale from "antd/lib/locale/es_ES";
//*******************************************************
//Importamos los Message
import {
  messageSuccess,
  messageWarning,
  messageError,
} from "../../resource/js/messages";
//****************************************************************
//
import informationContext from "../../hook/information/informationContext";
import toolContext from "../../hook/tool/toolContext";
//****************************************************************
//
import { PDFDownloadLink, BlobProvider } from "@react-pdf/renderer";
import Report from "./ReportPdf";
//================================================================
//INICIO DE CLASE
//================================================================
const FormReport = () => {
  //-----------------------------------------------------------------
  //ZONE USE STATE
  const [informationdate, setInformationDate] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const onChangeDate = (date, dateString) => {
    setInformationDate(dateString);
    let dateinformation = dateString.split("-");
    setDate(dateinformation[1]);
    setYear(dateinformation[0]);
  };
  //-----------------------------------------------------------------
  //ZONE USE CONTEXT
  const { functionOpenModal, functionReadInformation } =
    useContext(informationContext);
  const { arrayselection } = useContext(toolContext);
  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickReport = () => {
    if (informationdate === "") {
      messageWarning(
        "Debe seleccionar los datos, para poder generar el archivo",
        2
      );
    } else {
      functionReadInformation(year, date).then((e) => {
        if (e === false) {
          messageWarning("Sin Informacion del mes");
        } else {
          messageSuccess("DATOS CORRECTOS");
          functionOpenModal(true);
        }
      });
    }
  };

  const reset = () => {
    setInformationDate("");
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <ConfigProvider locale={locale}>
        <div>
          <Row>
            <Col span={24} style={{ background: "transparent" }}>
              <strong>Seleccione Mes y Gestion</strong>
            </Col>
            <Col span={24}>
              <DatePicker
                placeholder="Seleccione Mes y Gestion"
                onChange={onChangeDate}
                picker="month"
                style={{ width: "100%" }}
                value={informationdate !== "" ? moment(informationdate) : ""}
              />
            </Col>
            <Col span={24}>
              <Button type="primary" onClick={onClickReport}>
                Generar
              </Button>
              {/* <BlobProvider document={<Report />}>
                {({ blob, url }) => (
                  <Button
                    type="primary"
                    onClick={() => {
                      window.open(url);
                    }}
                    block
                    className="button-original"
                  >
                    Impormir
                  </Button>
                )}
              </BlobProvider> */}
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </Fragment>
  );
};

export default FormReport;
