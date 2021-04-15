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
//****************************************************************
//Importamos el CONTEXT
import businessContext from "../../hook/business/businessContext";
//****************************************************************
//
// import ModalViewLogo from "./ModalViewLogo";
// import ModalModifyCompany from "./ModalModifyCompany";
import { messageError, messageSuccess } from "../../resource/js/messages";
//-----------------------------------------------------------------
//
import ModalModifyBusiness from "./ModalModifyBusiness";
//================================================================
//INICIO DE CLASE
//================================================================
const TableDataBusiness = () => {
  //-------------------------------------------------------
  //ZONE USE STATE
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [directionimg, setDirectionImg] = useState("");
  const searchInput = useRef(null);
  //-------------------------------------------------------
  //
  const {
    arraybusiness,
    functionReadBusiness,
    functionModalUpdate,
    functionArrayUpdateBusiness,
  } = useContext(businessContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //Funcion para poder llamar la tabla
    functionReadBusiness().then((e) => {
      console.log(arraybusiness);
    });
  }, []);

  //-------------------------------------------------------
  //ZONE DE FUNCTION
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn("namebus");
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
      dataIndex: "idbusiness",
      key: "idbusiness",
      width: "5%",
    },
    {
      title: "Empresa",
      dataIndex: "namecom",
      key: "namecom",
      width: "10%",
    },
    {
      title: "Nombre",
      dataIndex: "namebus",
      key: "namebus",
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
            onPressEnter={() => handleSearch(selectedKeys, confirm, "namebus")}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, "namebus")}
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
        record["namebus"]
          ? record["namebus"]
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
        searchedColumn === "namebus" ? (
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
      title: "Nit",
      dataIndex: "ofbus",
      key: "ofbus",
      width: "8%",
    },

    {
      title: "Direccion",
      dataIndex: "directionbus",
      key: "directionbus",
      width: "8%",
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
              const resultFilterUpdate = arraybusiness.filter(
                (e) => e.identifierbus == text.identifierbus
              );
              functionArrayUpdateBusiness(resultFilterUpdate);
              functionModalUpdate(true);

              console.log(resultFilterUpdate);
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
              alert(text.identifiercom);
            }}
            // onClick={() => {
            //   functionDeleteCompany(text.identifiercom).then((e) => {
            //     if (e === true) {
            //       messageSuccess("Correcto Elemento Borrado", 2);
            //       functionReadCompany();
            //     } else {
            //       messageError("Error, Intente mas Tarde", 2);
            //     }
            //   });
            // }}
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
      {/* ------------------------- ********** ------------------------- */}
      <Table
        columns={columns}
        dataSource={arraybusiness}
        sorter={true}
        pagination={{ pageSize: 10, responsive: true }}
        scroll={{ x: 1200, y: "max-content" }}
        bordered
      />
      <ModalModifyBusiness />
      {/* ------------------------- ********** ------------------------- */}
    </Fragment>
  );
};

export default TableDataBusiness;
