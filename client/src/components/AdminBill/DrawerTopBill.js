import React, { Fragment, useState, useContext, useEffect } from "react";
import "../../resource/scss/components/bill/drawertopbill.scss";
//*******************************************************
//
import { Drawer, Button, Row, Col, Input, Select, Table } from "antd";
import { CloudUploadOutlined, SearchOutlined } from "@ant-design/icons";
//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";

//*******************************************************
//Importamos los CONTEXT
import billContext from "../../hook/bill/billContext";
import productContext from "../../hook/product/productContext";

//================================================================
//INICIO DE CLASE
//================================================================
const DrawerTopBill = () => {
  //-----------------------------------------------------------------
  //ZONE USE STATE
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [datasearch, setDataSearch] = useState("");
  const [arrayproductend, setArrayProductEnd] = useState([]);
  const onChangeDataSearch = (e) => {
    setDataSearch(e.target.value);
  };
  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  const { drawertop, functionOpenDrawerTop, functionArrayProductSelection } =
    useContext(billContext);
  const { arrayproduct, functionReadProduct } = useContext(productContext);

  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if (drawertop === true) {
      setIsDrawerVisible(true);
      setArrayProductEnd(arrayproduct);

    }
  }, [drawertop]);

  useEffect(() => {
    functionReadProduct().then((e) => {
      setArrayProductEnd(arrayproduct);
    });
  }, []);
  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN

  const handleCancel = () => {
    setIsDrawerVisible(false);
    functionOpenDrawerTop(false);
    setArrayProductEnd(arrayproduct);
    setDataSearch("");
  };

  const onClickInput = () => {
    let search = arrayproduct.filter((number) =>
      number.shortdescriptionpro
        .toLowerCase()
        .includes(datasearch.toLowerCase())
    );
    setArrayProductEnd(search);
  };

  const onClickReset = () => {
    setArrayProductEnd(arrayproduct);
    setDataSearch("");
  };
  const columns = [
    {
      title: "Producto",
      dataIndex: "shortdescriptionpro",
      key: "shortdescriptionpro",
    },
    {
      title: "Descripcion",
      dataIndex: "longdescriptionpro",
      key: "longdescriptionpro",
    },
    {
      title: "Unidad de Medida",
      dataIndex: "unitmeasurepro",
      key: "unitmeasurepro",
    },
    {
      title: "Precio",
      dataIndex: "pricepro",
      key: "pricepro",
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
                (e) => e.identifierpro == text.identifierpro
              );
              setIsDrawerVisible(false);
              functionOpenDrawerTop(false);
              functionArrayProductSelection(resultFilterUpdate);
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
      {/* <Button type="primary" onClick={openDrawerUser}>
      Open
    </Button> */}
      <Drawer
        title="Seleccione el Producto"
        placement={"top"}
        closable={false}
        onClose={handleCancel}
        visible={isDrawerVisible}
        key={"top"}
        height={600}
      >
        <div className="container-drawer-product">
          <Row>
            <Col span={8}>
              <h4>Buscar Producto</h4>
              <Input
                placeholder="Ingrese el Nombre del Producto"
                className="input-product-bill"
                onChange={onChangeDataSearch}
                value={datasearch}
              />
              <Button
                type="primary"
                onClick={onClickInput}
                block
                icon={<SearchOutlined />}
                shape="round"
              >
                Buscar
              </Button>
              <Button
                type="primary"
                onClick={onClickReset}
                block
                icon={<SearchOutlined />}
                shape="round"
                className="button-reset-search"
              >
                Reset
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="container-table-bill">
                <span className="title-table-bill">Productos Actuales</span>
                <Table
                  dataSource={arrayproductend}
                  columns={columns}
                  className="table-bill"
                  pagination={{ pageSize: 4, responsive: true }}
                />
                ;
              </div>
            </Col>
          </Row>
        </div>
      </Drawer>
    </Fragment>
  );
};

export default DrawerTopBill;
