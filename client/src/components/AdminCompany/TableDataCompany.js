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
import companyContext from "../../hook/company/companyContext";
//****************************************************************
//
import ModalViewLogo from "./ModalViewLogo";
import ModalModifyCompany from "./ModalModifyCompany";
import { messageError, messageSuccess } from "../../resource/js/messages";

//================================================================
//INICIO DE CLASE
//================================================================
const TableDataCompany = () => {
  //-------------------------------------------------------
  //ZONE USE STATE
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const [directionimg, setDirectionImg] = useState("");
  const searchInput = useRef(null);
  //-------------------------------------------------------
  //
  const {
    arraycompany,
    functionReadCompany,
    functionLoadLogoView,
    functionLoadIdCompany,
    functionLoadLogo,
    functionUpdateModal,
    functionLoadIdCompanyUpdate,
    functionIdCompanyUpdate,
    functionDeleteCompany,
  } = useContext(companyContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //Funcion para poder llamar la tabla
    functionReadCompany().then((e) => {
      console.log(arraycompany);
    });
  }, []);

  //-------------------------------------------------------
  //ZONE DE FUNCTION
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn("namecom");
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
      dataIndex: "idcompany",
      key: "idcompany",
      width: "5%",
    },
    {
      title: "Nombre",
      dataIndex: "namecom",
      key: "namecom",
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
            onPressEnter={() => handleSearch(selectedKeys, confirm, "namecom")}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, "namecom")}
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
        record["namecom"]
          ? record["namecom"]
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
        searchedColumn === "namecom" ? (
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
      dataIndex: "nitcom",
      key: "nitcom",
      width: "8%",
    },
    {
      title: "Direccion",
      dataIndex: "directioncom",
      key: "directioncom",
      width: "8%",
    },

    {
      title: "Acciones Logo",
      key: "action",
      width: "10%",
      render: (text) => (
        <Fragment>
          <Button
            type="primary"
            icon={<EyeOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              setDirectionImg(text.directionimgcom);
              functionLoadLogoView(true);
            }}
          />

          <Button
            type="primary"
            icon={<CloudUploadOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              functionLoadLogo(true);
              functionLoadIdCompany(text.identifiercom);
            }}
          />
        </Fragment>
      ),
    },
    {
      title: "Acciones Admin",
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
              const resultFilterUpdate = arraycompany.filter(
                (e) => e.identifiercom == text.identifiercom
              );
              functionUpdateModal(true);
              functionLoadIdCompanyUpdate(resultFilterUpdate);
            }}
          />

          <Button
            type="primary"
            icon={<DeleteOutlined />}
            size={"default"}
            ghost
            onClick={() => {
              functionDeleteCompany(text.identifiercom).then((e) => {
                if (e === true) {
                  messageSuccess("Correcto Elemento Borrado", 2);
                  functionReadCompany();
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
      {/* ------------------------- ********** ------------------------- */}
      <Table
        columns={columns}
        dataSource={arraycompany}
        sorter={true}
        pagination={{ pageSize: 10, responsive: true }}
        scroll={{ x: 1200, y: "max-content" }}
        bordered
        locale={{ emptyText: "Sin Datos" }}
      />
      {/* ------------------------- ********** ------------------------- */}
      <ModalViewLogo directionimg={directionimg} />
      {/* ------------------------- ********** ------------------------- */}
      <ModalModifyCompany />
    </Fragment>
  );
};

export default TableDataCompany;
