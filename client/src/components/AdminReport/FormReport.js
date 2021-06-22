import React, { Fragment, useState, useContext } from "react";
import "../../resource/scss/components/information/formreport.scss";
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
          messageWarning("Sin Informacion del mes", 2);
        } else {
          messageSuccess("DATOS CORRECTOS", 1);
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
        <div className="container-form-report">
          <Row>
            <Col span={12} style={{ background: "transparent" }}>
              <strong className="title-generate-report">
                Seleccione Mes y Gestion
              </strong>
              <br />
              <DatePicker
                placeholder="Seleccione Mes y Gestion"
                onChange={onChangeDate}
                picker="month"
                style={{ width: "100%" }}
                value={informationdate !== "" ? moment(informationdate) : ""}
                className="input-date"
              />
            </Col>
          </Row>
          <Row>
            <Col span={12}>
              <Button
                type="primary"
                onClick={onClickReport}
                block
                className="button-generate"
              >
                Generar
              </Button>
            </Col>
          </Row>
        </div>
      </ConfigProvider>
    </Fragment>
  );
};

export default FormReport;
