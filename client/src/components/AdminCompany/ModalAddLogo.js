import React, { Fragment, useState, useContext, useEffect } from "react";
//****************************************************************
//
import companyContext from "../../hook/company/companyContext";
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
  const [img, setImg] = useState("");
  //-----------------------------------------------------------------
  //ZONE DE USE-CONTEXT
  const {
    idcompany,
    modallogo,
    functionSendImg,
    functionLoadLogo,
  } = useContext(companyContext);
  //-----------------------------------------------------------------
  //ZONE DE USE EFFECT
  useEffect(() => {
    if (modallogo === true) {
      //Instanciamos el MODAL para poder acceder a sus funciones JAVASCRIPT
      setIsModalVisible(true);
      //
    }
  }, [modallogo]);
  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const openModalCompany = (e) => {
    e.preventDefault();
    setIsModalVisible(true);
  };

  const onClickSendLogo = (e) => {
    e.preventDefault();

    //-----------------------------------------------------------------
    //Creamos la varaible de FORMDATA para poder enviar la IMAGEN
    let data = new FormData();
    data.append("image", img.file);
    data.set("identifiercom", idcompany);

    //-----------------------------------------------------------------
    //ENVIAMOS la Informacion al SERVER
    functionSendImg(data).then((e) => {
      if (e == false) {
        message.error({
          content: "Error, Usuario no encontrado",
          duration: 2,
          className: "message-error",
        });
      } else {
        message.success({
          content: "Correcto, Bienvenido al sistema",
          duration: 2,
          className: "message-success",
        });
        functionLoadLogo(false);
        setIsModalVisible(false);
      }
    });
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
          <Button key="send" type="primary" onClick={onClickSendLogo}>
            Enviar
          </Button>,
          <Button key="cancel" type="primary" onClick={handleOk}>
            Cancelar
          </Button>,
        ]}
        // onCancel={handleCancel}
      >
        <Dragger
          beforeUpload={true}
          listType="picture"
          maxCount={1}
          name="img"
          onChange={(e) => setImg(e)}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
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
