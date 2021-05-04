import React, { Fragment, useContext, useState, useEffect } from "react";
//****************************************************************
//Importamos las librerias necesarias para poder utilizar ANTD
import { Modal, Button, Row, Col, Divider } from "antd";
//****************************************************************
//Importamos los datos CONTEXT
import companyContext from "../../hook/company/companyContext";

//================================================================
//INICIO DE CLASE
//================================================================
const ModalViewLogo = ({ directionimg }) => {
  //-----------------------------------------------------------------
  //ZONE USE-STATE
  const [isModalVisible, setIsModalVisible] = useState(false); //Estado para abrir MODAL

  //-----------------------------------------------------------------
  //ZONE USE-CONTEXT
  const { modallogoview, functionLoadLogoView } = useContext(companyContext);

  //-----------------------------------------------------------------
  //ZONE USE-EFFECT
  useEffect(() => {
    if (modallogoview === true) {
      setIsModalVisible(true);
    }
  }, [modallogoview]);

  //Funcion de Apretar CANCEL
  const handleCancel = () => {
    //Cierra el MODAL
    functionLoadLogoView(false);
    setIsModalVisible(false);
  };
  
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Modal
        title="Ver Logo Empresa"
        visible={isModalVisible}
        width={500}
        closable={false}
        footer={[
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <div
          className="img-logo"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <img src={directionimg} alt="logo" />
        </div>
      </Modal>
      {/* ------------------------- ********** ------------------------- */}

      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalViewLogo;
