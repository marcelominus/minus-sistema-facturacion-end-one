import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import "../../resource/scss/components/measure/tablemeasure.scss";
//****************************************************************
//Importamos la libreria de ANTD
import { Table, Modal, Input, Button, Space } from "antd";
import {
  SearchOutlined,
  ExclamationCircleOutlined,
  CloudUploadOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
//****************************************************************
//Importamos el HIGT de LETTERS
import Highlighter from "react-highlight-words";
//*******************************************************
//Importamos los Context
// import userContext from "../../hook/user/userContext";
import measureContext from "../../hook/measure/measureContext";
import toolContext from "../../hook/tool/toolContext";
//****************************************************************
// import ModalViewLogo from "./ModalViewLogo";
// import ModalModifyDosage from "./ModalModifyDosage";
//****************************************************************
//Importamos los Mensajes de MESSAGES
import { messageError, messageSuccess } from "../../resource/js/messages";

//================================================================
//INICIO DE CLASE
//================================================================
const TableDataMeasure = () => {
  //-------------------------------------------------------
  //ZONE USE STATE
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  const {
    arraymeasure,
    functionReadMeasure,
    functionModalUpdate,
    functionArrayUpdateMeasure,
    functionDeleteMeasure,
  } = useContext(measureContext);
  const { tableselection, functionTableSelection } = useContext(toolContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //Funcion para poder llamar la tabla
    functionReadMeasure();
  }, []);
  useEffect(() => {
    let dataTokenCompany = localStorage.getItem("tokencompany");
    let dataTokenBusiness = localStorage.getItem("tokenbusiness");
    if (dataTokenCompany !== "" && dataTokenBusiness !== "") {
      functionReadMeasure();
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
      dataIndex: "idmeasure",
      key: "idmeasure",
      width: "5%",
    },

    {
      title: "Nombre",
      dataIndex: "unitmeasure",
      key: "unitmeasure",
      width: "40%",
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
              handleSearch(selectedKeys, confirm, "unitmeasure")
            }
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, "unitmeasure")}
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
        record["unitmeasure"]
          ? record["unitmeasure"]
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
        searchedColumn === "unitmeasure" ? (
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
      title: "Descripcion",
      dataIndex: "descriptionmeasure",
      key: "unitmeasure",
      width: "40%",
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
              const resultFilterUpdate = arraymeasure.filter(
                (e) => e.idmeasure == text.idmeasure
              );
              //   console.log(resultFilterUpdate);
              functionArrayUpdateMeasure(resultFilterUpdate);
              functionModalUpdate(true);
            }}
          />

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
                  functionDeleteMeasure(text.idmeasure).then((e) => {
                    if (e === true) {
                      messageSuccess("Correcto Elemento Borrado", 2);
                      functionReadMeasure();
                    } else {
                      messageError("Error, Intente mas Tarde", 2);
                    }
                  });
                },
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
      <div className="container-table-measure">
        <span className="title-table-measure">Medidas Actuales</span>
        <Table
          columns={columns}
          dataSource={arraymeasure}
          sorter={true}
          pagination={{ pageSize: 10, responsive: true }}
          scroll={{ x: 1200, y: "max-content" }}
          bordered
          className="table-measure"
        />
      </div>
    </Fragment>
  );
};

export default TableDataMeasure;
