import React, { Fragment, useState, useContext, useEffect } from "react";
//****************************************************************
//Importamos los CONTEXT
import companyContext from "../../hook/company/companyContext";
//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";
//****************************************************************
//Importamos las librerias necesarias para poder utilizar ANTD
import { Modal, Button, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;

//================================================================
//INICIO DE CLASE
//================================================================
const ModalAddLogo = () => {
  //-----------------------------------------------------------------
  //ZONE USE-STATE
  const [isModalVisible, setIsModalVisible] = useState(false); //Estado para abrir MODAL
  const [img, setImg] = useState({
    file: {
      status: "removed",
    },
  }); //IMG donde se guarda la IMAGEN
  //Valor que permite la visualizacion de la lista de UPLOAD para ocultar o borrar
  const [imgvisible, setImgVisible] = useState(false); //IMG para poder visualizar la lista de upload

  //-----------------------------------------------------------------
  //ZONE DE USE-CONTEXT
  const {
    idcompany, //ID DE LA COMPANIA DATO DOS DE ENVIO DE IMG
    modallogo, //STATE para poder abrir MODAL AUTOMATICAMENTE
    functionSendImg, //Funcio para poder enviar la IMAGEN
    functionLoadLogo, //Funcion para cambiar el estado de del MODALLOGO
    functionReadCompany,
  } = useContext(companyContext);

  //-----------------------------------------------------------------
  //ZONE DE USE EFFECT
  useEffect(() => {
    //Abrimos automaticamente el MODAL CON MODAL LOGO => TRUE
    if (modallogo === true) {
      //ABRIMOS EL MODAL
      setIsModalVisible(true);
    }
  }, [modallogo]);

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  const onClickSendLogo = (e) => {
    e.preventDefault();

    //Verifica la variable ESTE VACIA o se halla eliminado manualmente la imagen
    if (img.file.status === "removed") {
      messageWarning("No se elegio ninguna IMAGEN", 2);
    } else {
      //-----------------------------------------------------------------
      //Creamos la varaible de FORMDATA para poder enviar la IMAGEN
      let data = new FormData();
      data.append("image", img.file);
      data.set("identifiercom", idcompany);

      //-----------------------------------------------------------------
      //ENVIAMOS la Informacion al SERVER
      functionSendImg(data).then((e) => {
        if (e == false) {
          messageError("Fallo el proceso, intenten mas tarde", 2);
        } else {
          messageSuccess("Correcto, Logo Subido Correctamente");
          //Cambia el STATE logo para que no se abra automaticamente
          functionLoadLogo(false);
          //Cierra el MODAL
          setIsModalVisible(false);
          //Oculta la LISTA de imagen
          setImgVisible(false);
          //Reinicia el valor de STATE
          setImg({
            file: {
              status: "removed",
            },
          });
          //
          functionReadCompany();
        }
      });
    }
  };

  //Funcion de Apretar CANCEL
  const handleCancel = () => {
    //Cierra el MODAL
    setIsModalVisible(false);
    //Oculta la lista de UPLOAD
    setImgVisible(false);
    //Vacia el STATE donde se guarda la informacion de la imagen
    setImg({
      file: {
        status: "removed",
      },
    });
    //
    functionLoadLogo(false);
    //
    functionReadCompany();
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
        closable={false}
        footer={[
          <Button key="send" type="primary" onClick={onClickSendLogo}>
            Enviar
          </Button>,
          <Button key="cancel" type="primary" onClick={handleCancel}>
            Cancelar (IMG Default)
          </Button>,
        ]}
        // onCancel={handleCancel}
      >
        <Dragger
          beforeUpload={true}
          listType="picture"
          maxCount={1}
          name="img"
          onChange={(e) => {
            //Copia la informacion de la IMAGEN en la variable IMG
            setImg(e);
            //Cambia el estado de LISTA UPLOAD para que se visualize
            return setImgVisible(true);
          }}
          showUploadList={imgvisible}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click o Arrastre el Objeto Imagen</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibit from
            uploading company data or other band files
          </p>
        </Dragger>
      </Modal>
    </Fragment>
  );
};

export default ModalAddLogo;
