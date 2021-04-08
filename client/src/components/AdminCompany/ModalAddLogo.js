import React, { Fragment, useState } from "react";
//****************************************************************
//
import { Modal, Button, Upload, message, Space } from "antd";
import { InboxOutlined, UploadOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalAddLogo = () => {
  //-----------------------------------------------------------------
  //ZONE USE-STATE
  const [isModalVisible, setIsModalVisible] = useState(false);

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const openModalCompany = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
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
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            style={{ background: "#389e0d", border: "1px solid #389e0d" }}
          >
            Enviar
          </Button>,
          <Button
            key="submit"
            type="primary"
            onClick={handleOk}
            style={{ background: "red", border: "1px solid red" }}
          >
            Cancelar
          </Button>,
        ]}
        // onCancel={handleCancel}
      >
        <Space direction="vertical" style={{ width: "100%" }} size="large">
          <Upload beforeUpload={true} listType="picture" maxCount={1}>
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
          </Upload>
        </Space>
      </Modal>
      {/* ------------------------- ********** ------------------------- */}
      <Button type="primary" onClick={openModalCompany}>
        Subir Logo
      </Button>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default ModalAddLogo;
