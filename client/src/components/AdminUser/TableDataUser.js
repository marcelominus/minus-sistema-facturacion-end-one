import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import "../../resource/scss/components/user/tableuser.scss";
//****************************************************************
//Importamos la libreria de ANTD
import { Table, Modal, Input, Button, Space, Tooltip, Tag } from "antd";
import { CloudUploadOutlined, DeleteOutlined } from "@ant-design/icons";
//*******************************************************
//Importamos los Context
import userContext from "../../hook/user/userContext";
import toolContext from "../../hook/tool/toolContext";

//****************************************************************
//Importamos los Mensajes de MESSAGES
import { messageError, messageSuccess } from "../../resource/js/messages";

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const TableDataUser = () => {
  //-------------------------------------------------------
  //ZONE USE STATE

  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  const {
    arrayuser,
    functionReadUser,
    functionModalUpdate,
    functionArrayUpdateUser,
    functionDeleteUser,
    ExclamationCircleOutlined,
  } = useContext(userContext);
  const { tableselection, functionTableSelection } = useContext(toolContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    functionReadUser().then((e) => {
      console.log(arrayuser);
    });
  }, []);
  useEffect(() => {
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany !== "" && dataTokenBusiness !== "") {
      functionReadUser();
      functionTableSelection(false);
    }
  }, [tableselection]);

  //-----------------------------------------------------------------
  //
  const columns = [
    {
      title: "Id",
      dataIndex: "idlogin",
      key: "idlogin",
      width: "5%",
    },
    {
      title: "Nombre Empleado",
      width: "30%",
      key: "action",
      render: (text) => (
        <Fragment>
          <div>
            {text.name} {text.surname}
          </div>
        </Fragment>
      ),
    },
    {
      title: "Carnet",
      dataIndex: "ci",
      key: "ci",
      width: "15%",
    },
    {
      title: "email",
      dataIndex: "email",
      key: "email",
      width: "20%",
    },
    {
      title: "Rol",
      key: "action",
      width: "15%",
      render: (text) => (
        <Fragment>
          {text.role === "master" ? (
            <Tag color="green">Administrador General</Tag>
          ) : null}
          {text.role === "admin-all" ? (
            <Tag color="purple">Administrador Local</Tag>
          ) : null}
          {text.role === "user" ? <Tag color="geekblue">Empleado</Tag> : null}
        </Fragment>
      ),
    },
    {
      title: "Acciones",
      key: "action",
      width: "15%",
      render: (text) => (
        <Fragment>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              const resultFilterUpdate = arrayuser.filter(
                (e) => e.identifier == text.identifier
              );
              functionArrayUpdateUser(resultFilterUpdate);
              functionModalUpdate(true);
            }}
          />

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size={"default"}
            ghost
            onClick={() =>
              Modal.confirm({
                title: "Confirmar",
                icon: <ExclamationCircleOutlined />,
                content: "Desea Borrar el Elemento",
                cancelText: "Cancelar",
                okText: "Confirmar",
                onOk: () => {
                  functionDeleteUser(text.identifier).then((e) => {
                    if (e === true) {
                      messageSuccess("Correcto Elemento Borrado", 2);
                      functionReadUser();
                    } else {
                      messageError("Error, Intente mas Tarde", 2);
                    }
                  });
                },
              })
            }
          />
        </Fragment>
      ),
    },
  ];
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Fragment>
      <div className="container-table-user">
        <span className="title-table-user">Usuarios Actuales</span>
        <Table
          columns={columns}
          dataSource={arrayuser}
          sorter={true}
          pagination={{ pageSize: 10, responsive: true }}
          scroll={{ x: 1000, y: "max-content" }}
          bordered
          className="table-user"
        />
      </div>
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default TableDataUser;
