import React, { Fragment } from "react";
//****************************************************************
//
import { Table, Tag, Space } from "antd";
//****************************************************************
//
const { Column, ColumnGroup } = Table;

//================================================================
//INICIO DE CLASE
//================================================================
const TableDataCompany = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: 150,
    },
    {
      title: "Address",
      dataIndex: "address",
    },
  ];

  const data = [];
  for (let i = 0; i < 300; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{ pageSize: 100 }}
        scroll={{ x: 1200, y: 240 }}
      />
    </Fragment>
  );
};

export default TableDataCompany;
