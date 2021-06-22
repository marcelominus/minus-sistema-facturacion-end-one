import React, { Fragment, useState, useEffect, useContext } from "react";
import "../../resource/scss/default.scss";
import "../../resource/scss/components/selection/cardselection.scss";
//*******************************************************
//Importamos componentes de ANTD
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
  const onClickSelection = () => {
    const informationAll = identifierall.split("&");
    functionSelectionInformationCompany(informationAll[0]);
    functionSelectionInformationBusiness(informationAll[1]);
    functionTableSelection(true);
    messageSuccess("Correcto espacio de Trabajo Modificado", 2);
  };
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <Card>
        <Card
          style={{ marginTop: 16 }}
          type="inner"
          title="Seleccione la Area de Trabajo"
          headStyle={{ background: "#fff1c7" }}
        >
          <Fragment>
            <div className="container-selection">
              {/* ------------------------- ********** ------------------------- */}
              <Row>
                <Col span={12}>
                  <div className="title-formulario">Escoja una Opcion</div>
                </Col>
                <Col span={12}>
                  <Select
                    defaultValue=""
                    onChange={onChangeAddAll}
                    className="input-select"
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
                <Col span={12} offset={12}>
                  <Button type="primary" block onClick={onClickSelection}>
                    Seleccionar
                  </Button>
                </Col>
              </Row>
            </div>
          </Fragment>
        </Card>
      </Card>
      <TableSelectionData />
    </Fragment>
  );
};

export default CardSelection;
