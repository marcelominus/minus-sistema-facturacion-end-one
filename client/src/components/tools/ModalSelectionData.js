import React, { Fragment, useState, useEffect, useContext } from "react";
import "../../resource/scss/default.scss";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, Select } from "antd";
//*******************************************************
//Importamos las funciones de MESSAGES
import { messageError, messageSuccess } from "../../resource/js/messages";
//****************************************************************
//Importamos los CONTEXT
import toolsContext from "../../hook/tool/toolContext";
import dosageContext from "../../hook/dosage/dosageContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalSelectionData = ({ props }) => {
  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
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
  const { functionTableSelectionDosage } = useContext(dosageContext);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany === null || dataTokenBusiness === null) {
      functionReadAllSelection();
      setIsModalVisible(true);
    }
  }, []);

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //-----------------------------------------------------------------
  //Funciones de usuario ONCLIK AL ENVIAR LA INFORMACION
  const onClickBusiness = (e) => {
    e.preventDefault();

    const informationAll = identifierall.split("&");
    functionSelectionInformationCompany(informationAll[0]);
    functionSelectionInformationBusiness(informationAll[1]);
    functionTableSelection(true);
    messageSuccess("Correcto espacion de Trabajo Modificado", 2);

    //Cierra el Modal de Seleccion de Empresas y Sucursales
    setIsModalVisible(false);

    functionTableSelection(true);
    functionTableSelectionDosage(true);
  };

  //Funcion CERRAR MODAL de ADD COMPANY
  const handleCancel = (e) => {
    e.preventDefault();
    setIsModalVisible(false);
    const message = "Debe Seleccionar una Empresa y Sucursal de Trabajo";
    messageError(message, 4);
    props.history.push("/selection");
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      {/* ------------------------- ********** ------------------------- */}
      <Modal
        title="Seleccionar Area de Trabajo"
        visible={isModalVisible}
        width={450}
        closable={false}
        footer={[
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel} ghost>
            Cancelar
          </Button>,
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickBusiness}>
            Enviar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
        <Row className="input-form">
          <Col span={12}>
            <div className="title-formulario">Seleccione Area</div>
          </Col>
          <Col span={12}>
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
      </Modal>
    </Fragment>
  );
};

export default ModalSelectionData;
