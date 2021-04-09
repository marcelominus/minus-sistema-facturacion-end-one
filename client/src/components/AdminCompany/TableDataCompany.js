import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
//****************************************************************
//
import { Table, Tag, Input, Button, Space } from "antd";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
//****************************************************************
//
import companyContext from "../../hook/company/companyContext";
//================================================================
//INICIO DE CLASE
//================================================================
const TableDataCompany = () => {
  //-------------------------------------------------------
  //ZONE USE STATE
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  //-------------------------------------------------------
  //
  const { arraycompany, functionReadCompany } = useContext(companyContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    functionReadCompany().then((e) => {
      console.log(arraycompany);
    });
  }, []);

  //-------------------------------------------------------
  //
  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn("namecom");
  };

  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "namecom",
      key: "namecom",
      width: "30%",
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInput}
            placeholder={`Search "name"`}
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
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                this.setState({
                  searchText: selectedKeys[0],
                  searchedColumn: "namecom",
                });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
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
      title: "Age",
      dataIndex: "nitcom",
      key: "nitcom",
      width: "20%",
    },
    {
      title: "Address",
      dataIndex: "placecom",
      key: "placecom",
    },
    {
      title: "Actions",
      dataIndex: "identifiercom",
      key: "identifiercom",
      render: (placecom) => (
        <Button onClick={() => alert(placecom)} type="primary">
          {" "}
          INGRESAR
        </Button>
      ),
    },
  ];

  const data = [];
  for (let i = 0; i < 300; i++) {
    data.push({
      key: i,
      namecom: `Edward King v ${i}`,
      nitcom: 32,
      placecom: `London, Park Lane no. ${i}`,
    });
  }
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={arraycompany}
        sorter={true}
        pagination={{ pageSize: 10, responsive: true }}
        scroll={{ x: 1200, y: "max-content" }}
      />
    </Fragment>
  );
};

export default TableDataCompany;
