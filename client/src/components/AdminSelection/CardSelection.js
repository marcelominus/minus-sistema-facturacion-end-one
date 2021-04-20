import React, { Fragment, useState, useEffect, useContext } from "react";
import { Modal, Button, Row, Col, Input, Select, Card } from "antd";
//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//*******************************************************
//Importamos los componentes
import TableSelectionData from "../tools/TableSelectionData";
//****************************************************************
//Importamos los CONTEXT
import companyContext from "../../hook/company/companyContext";
import businessContext from "../../hook/business/businessContext";
import toolsContext from "../../hook/tool/toolContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const CardSelection = () => {
  //-------------------------------------------------------
  //ZONE USE - STATE
  const [selection, setSelection] = useState({
    identifiercom: "",
    identifierbus: "",
  });
  const { identifiercom, identifierbus } = selection;
  const onChangeAddCompany = (e) => {
    setSelection({
      ...selection,
      identifiercom: e,
    });
  };
  const onChangeAddBusiness = (e) => {
    setSelection({
      ...selection,
      identifierbus: e,
    });
  };
  //-----------------------------------------------------------------
  //ZONE USE-CONTEXT
  const { arraybusiness, functionReadBusiness } = useContext(businessContext);
  const { arraycompany, functionReadCompany } = useContext(companyContext);
  const {
    functionTableSelection,
    functionSelectionInformationCompany,
    functionSelectionInformationBusiness,
  } = useContext(toolsContext);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    functionReadCompany().then((e) => {
      functionReadBusiness().then((e) => {});
    });
  }, []);

  //-------------------------------------------------------
  //ZONE FUNCTION
  const onClickSelection = (e) => {
    e.preventDefault();
    functionSelectionInformationCompany(identifiercom);
    functionSelectionInformationBusiness(identifierbus);
    functionTableSelection(true);
  };
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <p>DESDE EL CARD SELECTION</p>
      <Card title="Card title">
        <Card style={{ marginTop: 16 }} type="inner" title="Inner Card title">
          <Fragment>
            <Row>
              <Col span={12} style={{ background: "transparent" }}>
                Selecciones la Empresa
              </Col>
              <Col span={12} style={{ background: "blue" }}>
                <Select
                  defaultValue=""
                  onChange={onChangeAddCompany}
                  style={{ width: "100%" }}
                >
                  <Option value="">--Seleccione una Opcion--</Option>
                  {arraycompany.map((e, key) => {
                    return (
                      <Option value={e.identifiercom} key={key}>
                        {e.namecom}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={12} style={{ background: "transparent" }}>
                Selecciones la Sucursal
              </Col>
              <Col span={12} style={{ background: "blue" }}>
                <Select
                  defaultValue=""
                  onChange={onChangeAddBusiness}
                  style={{ width: "100%" }}
                >
                  <Option value="">--Seleccione una Opcion--</Option>
                  {arraybusiness.map((e, key) => {
                    return (
                      <Option value={e.identifierbus} key={key}>
                        {e.namebus}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <Row>
              <Col span={12} offset={12} style={{ background: "transparent" }}>
                <Button type="primary" block onClick={onClickSelection}>
                  Seleccionar
                </Button>
              </Col>
            </Row>
          </Fragment>
        </Card>
      </Card>
      <TableSelectionData />
    </Fragment>
  );
};

export default CardSelection;
