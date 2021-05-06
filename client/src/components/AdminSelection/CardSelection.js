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
    identifierall: "",
  });
  const { identifierall } = selection;

  const onChangeAddAll = (e) => {
    setSelection({
      ...selection,
      identifierall: e,
    });
  };

  //-----------------------------------------------------------------
  //ZONE USE-CONTEXT
  const {
    arrayallselection,
    functionTableSelection,
    functionSelectionInformationCompany,
    functionSelectionInformationBusiness,
    functionReadAllSelection,
  } = useContext(toolsContext);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    //-----------------------------------------------------------------
    //Realizamos la peticion de lectura de Seleccion
    functionReadAllSelection();
  }, []);

  //-------------------------------------------------------
  //ZONE FUNCTION
  const onClickSelection = (e) => {
    e.preventDefault();

    const informationAll = identifierall.split("&");
    functionSelectionInformationCompany(informationAll[0]);
    functionSelectionInformationBusiness(informationAll[1]);
    functionTableSelection(true);
    messageSuccess("Correcto espacion de Trabajo Modificado", 2);
  };
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <Card title="Elija una opcion">
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Seleccione la Area de Trabajo"
        >
          <Fragment>
            {/* ------------------------- ********** ------------------------- */}
            <Row>
              <Col span={12} style={{ background: "transparent" }}>
                Escoja una opcion
              </Col>
              <Col span={12} style={{ background: "blue" }}>
                <Select
                  defaultValue=""
                  onChange={onChangeAddAll}
                  style={{ width: "100%" }}
                >
                  <Option value="">--Seleccione una Opcion--</Option>
                  {arrayallselection.map((e, key) => {
                    return (
                      <Option value={e.identifierall} key={key}>
                        {e.namebus} ({e.namecom})
                      </Option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            {/* ------------------------- ********** ------------------------- */}
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
