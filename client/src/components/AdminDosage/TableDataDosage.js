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
// import userContext from "../../hook/user/userContext";
import dosageContext from "../../hook/dosage/dosageContext";
import toolContext from "../../hook/tool/toolContext";
//****************************************************************
// import ModalViewLogo from "./ModalViewLogo";
import ModalModifyDosage from "./ModalModifyDosage";
//****************************************************************
//Importamos los Mensajes de MESSAGES
import { messageError, messageSuccess } from "../../resource/js/messages";

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const TableDataDosage = () => {
  //-------------------------------------------------------
  //ZONE USE STATE
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  const {
    arraydosage,
    functionReadDosage,
    functionModalUpdate,
    functionArrayUpdateDosage,
  } = useContext(dosageContext);
  const { tableselection, functionTableSelection } = useContext(toolContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //Funcion para poder llamar la tabla
    functionReadDosage();
  }, []);
  useEffect(() => {
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany !== "" && dataTokenBusiness !== "") {
      functionReadDosage();
      functionTableSelection(false);
    }
  }, [tableselection]);
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
      dataIndex: "identifierbus",
      key: "identifierbus",
      width: "5%",
    },
    {
      title: "Empresa",
      dataIndex: "dayremaindos",
      key: "dayremaindos",
      width: "10%",
    },
    {
      title: "Nombre",
      dataIndex: "identifierdos",
      key: "identifierdos",
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
            onPressEnter={() =>
              handleSearch(selectedKeys, confirm, "identifierdos")
            }
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() =>
                handleSearch(selectedKeys, confirm, "identifierdos")
              }
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
        record["identifierdos"]
          ? record["identifierdos"]
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
        searchedColumn === "identifierdos" ? (
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
              const resultFilterUpdate = arraydosage.filter(
                (e) => e.identifierdos == text.identifierdos
              );
              console.log(resultFilterUpdate);
              functionArrayUpdateDosage(resultFilterUpdate);
              functionModalUpdate(true);
            }}
          />

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              //   functionDeleteUser(text.identifier).then((e) => {
              //     if (e === true) {
              //       messageSuccess("Correcto Elemento Borrado", 2);
              //       functionReadUser();
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
        dataSource={arraydosage}
        sorter={true}
        pagination={{ pageSize: 10, responsive: true }}
        scroll={{ x: 1200, y: "max-content" }}
        bordered
      />
      <ModalModifyDosage />

      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default TableDataDosage;
