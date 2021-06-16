import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
//****************************************************************
//
import "../../resource/scss/components/business/tableBusiness.scss";
//****************************************************************
//Importamos la libreria de ANTD
import { Table, Modal, Input, Button, Space, Tooltip } from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
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
  //ZONE USE - CONTEXT
  const {
    arraybusiness,
    functionReadBusiness,
    functionModalUpdate,
    functionArrayUpdateBusiness,
    functionDeleteBusiness,
  } = useContext(businessContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //Funcion para poder llamar la tabla
    functionReadBusiness();
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
      width: "20%",
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
      title: "Encargado",
      dataIndex: "ofbus",
      key: "ofbus",
      width: "20%",
    },

    {
      title: "Direccion",
      dataIndex: "directionbus",
      key: "directionbus",
      width: "30%",
    },

    {
      title: "Acciones",
      key: "action",
      width: "10%",
      render: (text) => (
        <Fragment>
          <Tooltip placement="left" title={"Modificar Elemento"}>
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
              }}
            />
          </Tooltip>
          <Tooltip placement="left" title={"Eliminar Elemento"}>
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              size={"default"}
              ghost
              onClick={() => {
                Modal.confirm({
                  title: "Confirmar",
                  icon: <ExclamationCircleOutlined />,
                  content: "Desea Borrar el Elemento",
                  cancelText: "Cancelar",
                  okText: "Confirmar",
                  onOk: () => {
                    functionDeleteBusiness(text.identifierbus).then((e) => {
                      if (e === true) {
                        messageSuccess("Correcto Elemento Borrado", 2);
                        functionReadBusiness();
                      } else {
                        messageError("Error, Intente mas Tarde", 2);
                      }
                    });
                  },
                });
              }}
            />
          </Tooltip>
        </Fragment>
      ),
    },
  ];

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <div className="container-table-business">
        <span className="title-table-business">Sucursales Actuales</span>
        {/* ------------------------- ********** ------------------------- */}
        <Table
          columns={columns}
          dataSource={arraybusiness}
          sorter={true}
          pagination={{ pageSize: 10, responsive: true }}
          scroll={{ x: 1000, y: "max-content" }}
          bordered
          className="table-business"
        />
        <ModalModifyBusiness />
        {/* ------------------------- ********** ------------------------- */}
      </div>
    </Fragment>
  );
};

export default TableDataBusiness;
