import React, { Fragment, useState, useEffect, useContext } from "react";
//****************************************************************
//Importamos Componentes de ATND
import { Modal, Button, Tag } from "antd";
import { WarningOutlined } from "@ant-design/icons";

//****************************************************************
//Importamos los CONTEXT
import startContext from "../../hook/start/startContext";
//================================================================
//INICIO DE CLASE
//================================================================
const ModalStart = () => {
  //-----------------------------------------------------------------
  //ZONE THE USE STATE
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [messageone, setMessageOne] = useState("");
  const [messagetwo, setMessageTwo] = useState("");

  //-----------------------------------------------------------------
  //ZONE USE-CONTEXT
  const {
    functionConsultationCompanyInformation,
    functionConsultationBusinessInformation,
  } = useContext(startContext);

  //-----------------------------------------------------------------
  //ZONE DE USE-EFFECT
  useEffect(() => {
    functionConsultationCompanyInformation().then((e) => {
      if (e === false) {
        setMessageOne("Empresa");
      } 
      functionConsultationBusinessInformation().then((e) => {
        if (e === false) {
          setMessageTwo("Sucursal");
          setIsModalVisible(true);
        }
      });
    });
  }, []);
  //-----------------------------------------------------------------
  //Funcion de CERRAR MODAL
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Modal
        title="Mensaje Importante"
        visible={isModalVisible}
        footer={[
          <Button key="submit" type="primary" onClick={handleCancel}>
            Entendido
          </Button>,
        ]}
      >
        <p>
          <WarningOutlined /> No se encuentra registrado ninguna{" "}
          {messageone !== "" ? <Tag color="purple">{messageone}</Tag> : null}
          {messagetwo !== "" ? <Tag color="purple">{messagetwo}</Tag> : null}
        </p>
      </Modal>
    </Fragment>
  );
};

export default ModalStart;
