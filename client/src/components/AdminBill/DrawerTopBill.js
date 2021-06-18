import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import "../../resource/scss/components/bill/drawertopbill.scss";
//*******************************************************
//
import { Drawer, Button, Row, Col, Input, Select, Table } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
//****************************************************************
//Importamos la libreria de MOMENT
import moment from "moment";

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
  //
  const nombreRef = useRef(null);
  //-----------------------------------------------------------------
  //
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const [dataform, setDataForm] = useState({
    unitmeasure: "",
    descriptionmeasure: "",
  });
  const { unitmeasure, descriptionmeasure } = dataform;

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
    }
  }, [drawertop]);

  useEffect(() => {
    functionReadProduct().then((e) => {
      console.log(arrayproduct);
    });
  }, []);
  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN

  const handleCancel = () => {
    setIsDrawerVisible(false);
    functionOpenDrawerTop(false);
  };

  const onClickInput = () => {
    let greaterTen2 = arrayproduct.filter((number) =>
      number.shortdescriptionpro.includes("bo")
    );
    //results = mi_array.filter(function (mi_array) { return mi_array[pos].toUpperCase().startsWith(valor.toUpperCase()); })
    console.log(greaterTen2);
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
              />
              <Button
                type="primary"
                onClick={onClickInput}
                ref={nombreRef}
                block
              >
                INGRESAR
              </Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <div className="container-table-bill">
                <span className="title-table-bill">Productos Actuales</span>
                <Table
                  dataSource={arrayproduct}
                  columns={columns}
                  className="table-bill"
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
