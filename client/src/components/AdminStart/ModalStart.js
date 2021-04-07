import React, { Fragment, useState, useEffect, useContext } from "react";
//****************************************************************
//
import { Modal, Button, Space } from "antd";
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
        //-----------------------------------------------------------------
        //
      } else {
        console.log("datos llenos");
      }
    });

    functionConsultationBusinessInformation().then((e) => {
      if (e === false) {
        setMessageTwo("Sucursal");
      } else {
        console.log("datos llenos");
      }
    });
    if (messagetwo == "" || messageone == "") {
      setIsModalVisible(true);
    }
  }, []);
  //-----------------------------------------------------------------
  //
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const handleOk = () => {
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
          <Button key="submit" type="primary" onClick={handleOk}>
            Entendido
          </Button>,
        ]}
        // onCancel={handleCancel}
      >
        <p>
          No se encuentra registrado ninguna {messageone} {messagetwo}
        </p>
        <p>
          Ingrese los nuevos datos de {messageone} {messagetwo}
        </p>
      </Modal>
    </Fragment>
  );
};

export default ModalStart;
