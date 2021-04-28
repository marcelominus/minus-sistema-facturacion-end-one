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
import { UserOutlined, PlusCircleOutlined } from "@ant-design/icons";
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
  //Carga la informacion de COMPANY
  const onChangeAddMeasure = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };

  //-------------------------------------------------------
  //ZONE USE - CONTEXT
  //   const { functionCreateUser, functionReadUser } = useContext(userContext);
  //   const {modalmeasure, functionCreateMeasure, functionReadMeasure, functionModal } = useContext(
  //     measureContext
  //   );
  const { drawertop, functionOpenDrawerTop } = useContext(billContext);
  //-----------------------------------------------------------------
  //ZONE USE - EFFECT
  useEffect(() => {
    if (drawertop === true) {
      setIsDrawerVisible(true);
    }
  }, [drawertop]);

  //-----------------------------------------------------------------
  //Funciones de usuario
  const onClickBillProduct = (e) => {
    e.preventDefault();
  };

  //-----------------------------------------------------------------
  //ZONE - FUNCTION
  //Funcion CERRAR MODAL de ADD COMPATN

  const handleCancel = () => {
    setIsDrawerVisible(false);
    functionOpenDrawerTop(false);
  };

  const onClickInput = () => {
    alert(nombreRef.current.value);
  };

  //Funcion para RESETEAR las entradas del FORMULARIO
  const resetForm = () => {
    setDataForm({
      unitmeasure: "",
      descriptionmeasure: "",
    });
  };

  const dataSource = [
    {
      key: "1",
      name: "Mike",
      age: 32,
      address: "10 Downing Street",
    },
    {
      key: "2",
      name: "John",
      age: 42,
      address: "10 Downing Street",
    },
  ];

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Age",
      dataIndex: "age",
      key: "age",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
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
            <Table dataSource={dataSource} columns={columns} />;
          </Col>
        </Row>
      </Drawer>
    </Fragment>
  );
};

export default DrawerTopBill;
