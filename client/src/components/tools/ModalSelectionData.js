import React, { Fragment, useState, useEffect, useContext } from "react";
//****************************************************************
//Importamos lo componentes de ANTD
import { Modal, Button, Row, Col, Input, Select } from "antd";
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";
//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//****************************************************************
//Importamos los CONTEXT
import companyContext from "../../hook/company/companyContext";
import businessContext from "../../hook/business/businessContext";
import toolsContext from "../../hook/tool/toolContext";
//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalSelectionData = ({ props }) => {
  //-----------------------------------------------------------------
  //ZONE USE - STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
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
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany.trim() === "" || dataTokenBusiness.trim() === "") {
      functionReadCompany().then((e) => {
        functionReadBusiness().then((e) => {
          setIsModalVisible(true);
        });
      });
    }
  }, []);

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //-----------------------------------------------------------------
  //Funciones de usuario ONCLIK AL ENVIAR LA INFORMACION
  const onClickBusiness = (e) => {
    e.preventDefault();
    functionSelectionInformationCompany(identifiercom);
    functionSelectionInformationBusiness(identifierbus);
    setIsModalVisible(false);
    functionTableSelection(true);
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
        title="Añadir Empresa"
        visible={isModalVisible}
        width={800}
        footer={[
          //BUTTON DE ENVIAR INFORMACION
          <Button key="send" type="primary" onClick={onClickBusiness}>
            Enviar
          </Button>,
          //BUTTON DE CANCELAR Y CERRAR MODAL
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        {/* ------------------------- ********** ------------------------- */}
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
        {/* ------------------------- ********** ------------------------- */}
      </Modal>
    </Fragment>
  );
};

export default ModalSelectionData;
