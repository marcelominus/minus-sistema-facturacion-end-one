import React, {
  Fragment,
  useState,
  useContext,
  useEffect,
  useRef,
} from "react";
import {
  Drawer,
  Button,
  Radio,
  Space,
  Row,
  Col,
  Input,
  Select,
  Table,
  Tag,
} from "antd";
import {
  UserOutlined,
  PlusCircleOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
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

//****************************************************************
//

//****************************************************************
//Creamos las variables de SELECT
const { Option } = Select;
const { TextArea } = Input;
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
  const {
    drawertop,
    functionOpenDrawerTop,
    functionArrayProductSelection,
  } = useContext(billContext);
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
    console.log(arrayproduct);
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
        title="Basic Drawer"
        placement={"top"}
        closable={false}
        onClose={handleCancel}
        visible={isDrawerVisible}
        key={"top"}
        height={500}
      >
        <Row>
          <Col span={12}>
            <Input placeholder="Basic usage" />
            <Button type="primary" onClick={onClickInput} ref={nombreRef}>
              INGRESAR
            </Button>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Table dataSource={arrayproduct} columns={columns} />;
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  );
};

export default DrawerTopBill;
