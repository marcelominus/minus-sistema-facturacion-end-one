import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
//****************************************************************
//Importamos la libreria de ANTD
import { Table, Tag, Input, Button, Space, Row, Col } from "antd";
import {
  SearchOutlined,
  EyeOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
//****************************************************************
//Importamos el HIGT de LETTERS
import Highlighter from "react-highlight-words";
//*******************************************************
//Importamos los Context
import userContext from "../../hook/user/userContext";
//****************************************************************
//
// import ModalViewLogo from "./ModalViewLogo";
import ModalModifyUser from "./ModalModifyUser";
//
import { messageError, messageSuccess } from "../../resource/js/messages";

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const TableDataUser = () => {
  //-------------------------------------------------------
  //ZONE USE STATE
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [directionimg, setDirectionImg] = useState("");
  const searchInput = useRef(null);
  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  const {
    arrayuser,
    functionReadUser,
    functionModalUpdate,
    functionArrayUpdateUser,
  } = useContext(userContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //Funcion para poder llamar la tabla
    functionReadUser();
  }, []);
  //-------------------------------------------------------
  //ZONE DE FUNCTION
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn("name");
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  //-----------------------------------------------------------------
  //
  const columns = [
    {
      title: "Id",
      dataIndex: "identifier",
      key: "identifier",
      width: "5%",
    },
    {
      title: "Empresa",
      dataIndex: "surname",
      key: "surname",
      width: "10%",
    },
    {
      title: "Nombre",
      dataIndex: "name",
      key: "name",
      width: "15%",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Buscar por Nombre`}
            value={selectedKeys[0]}
            onChange={(e) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, "name")}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, "name")}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Buscar
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined
          style={{ color: filtered ? "#1890ff" : "black", fontSize: "1rem" }}
        />
      ),
      onFilter: (value, record) =>
        record["name"]
          ? record["name"]
              .toString()
              .toLowerCase()
              .includes(value.toLowerCase())
          : "",
      onFilterDropdownVisibleChange: (visible) => {
        if (visible) {
          setTimeout(() => searchInput.current.value, 100);
        }
      },
      render: (text) =>
        searchedColumn === "name" ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    },
    {
      title: "Acciones",
      key: "action",
      width: "10%",
      render: (text) => (
        <Fragment>
          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              // const resultFilterUpdate = arraybusiness.filter(
              //   (e) => e.identifierbus == text.identifierbus
              // );
              // functionArrayUpdateBusiness(resultFilterUpdate);
              const resultFilterUpdate = arrayuser.filter(
                (e) => e.identifier == text.identifier
              );
              functionArrayUpdateUser(resultFilterUpdate);
              functionModalUpdate(true);
            }}
            // onClick={() => {
            //   functionUpdateModal(true);
            //   const resultFilterUpdate = arraycompany.filter(
            //     (e) => e.identifiercom == text.identifiercom
            //   );
            //   functionLoadIdCompanyUpdate(resultFilterUpdate);
            //   functionIdCompanyUpdate(text.identifiercom);
            // }}
          />

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              //   functionDeleteBusiness(text.identifierbus).then((e) => {
              //     if (e === true) {
              //       messageSuccess("Correcto Elemento Borrado", 2);
              //       functionReadBusiness();
              //     } else {
              //       messageError("Error, Intente mas Tarde", 2);
              //     }
              //   });
            }}
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
      {/* ------------------------- ********** ------------------------- */}
      <Table
        columns={columns}
        dataSource={arrayuser}
        sorter={true}
        pagination={{ pageSize: 10, responsive: true }}
        scroll={{ x: 1200, y: "max-content" }}
        bordered
      />
      {/* <ModalModifyBusiness /> */}
      <ModalModifyUser />
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default TableDataUser;
