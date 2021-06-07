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
import productContext from "../../hook/product/productContext";
import toolContext from "../../hook/tool/toolContext";
//****************************************************************
// import ModalViewLogo from "./ModalViewLogo";
// import ModalModifyDosage from "./ModalModifyDosage";
import ModalModifyProduct from "./ModalModifyProduct";
//****************************************************************
//Importamos los Mensajes de MESSAGES
import { messageError, messageSuccess } from "../../resource/js/messages";

//================================================================
//INICIO DE CLASE
//================================================================
const TableDataProduct = () => {
  //-------------------------------------------------------
  //ZONE USE STATE
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  const {
    arrayproduct,
    functionReadProduct,
    functionModalUpdate,
    functionArrayUpdateProduct,
    functionDeleteProduct,
    // functionDeleteMeasure,
  } = useContext(productContext);
  const { tableselection, functionTableSelection } = useContext(toolContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //Funcion para poder llamar la tabla
    functionReadProduct();
  }, []);
  
  useEffect(() => {
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany !== "" && dataTokenBusiness !== "") {
      functionReadProduct();
      functionTableSelection(false);
    }
  }, [tableselection]);

  //-------------------------------------------------------
  //ZONE DE FUNCTION
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn("shortdescriptionpro");
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
      dataIndex: "idproduct",
      key: "idproduct",
      width: "5%",
    },
    
    {
      title: "Nombre Producto",
      dataIndex: "shortdescriptionpro",
      key: "shortdescriptionpro",
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
              handleSearch(selectedKeys, confirm, "shortdescriptionpro")
            }
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() =>
                handleSearch(selectedKeys, confirm, "shortdescriptionpro")
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
        record["shortdescriptionpro"]
          ? record["shortdescriptionpro"]
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
        searchedColumn === "shortdescriptionpro" ? (
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
      title: "Descripcion Producto",
      dataIndex: "longdescriptionpro",
      key: "longdescriptionpro",
      width: "10%",
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
              const resultFilterUpdate = arrayproduct.filter(
                (e) => e.idproduct == text.idproduct
              );
              //   console.log(resultFilterUpdate);
              functionArrayUpdateProduct(resultFilterUpdate);
              functionModalUpdate(true);
            }}
          />

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              functionDeleteProduct(text.identifierpro).then((e) => {
                if (e === true) {
                  messageSuccess("Correcto Elemento Borrado", 2);
                  functionReadProduct();
                } else {
                  messageError("Error, Intente mas Tarde", 2);
                }
              });
            }}
          />
        </Fragment>
      ),
    },
  ];

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={arrayproduct}
        sorter={true}
        pagination={{ pageSize: 10, responsive: true }}
        scroll={{ x: 1200, y: "max-content" }}
        bordered
      />
      <ModalModifyProduct />
    </Fragment>
  );
};

export default TableDataProduct;
