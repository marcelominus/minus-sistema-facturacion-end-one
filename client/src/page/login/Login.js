import React, { Fragment, useState, useEffect, useContext } from "react";
import "../../resource/scss/login/login.scss";
import "../../resource/scss/default.scss";
//****************************************************************
//Importamos funciones de FRAMER MOTION
import { motion } from "framer-motion";
import {
  pageTransitionLogin,
  pageVariantsLogin,
} from "../../resource/js/effects";

//****************************************************************
//Importamos las imagenes necesarios para el diseño
import imagenLogin from "../../resource/img/logo-login.png";

//****************************************************************
//Importamos los componentes de REACT ANTD
import { Row, Col, Input, Button, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
//****************************************************************
//
import logincontext from "../../hook/login/loginContext";

//*******************************************************
//
import Loading from "../../components/tools/Loading";

//================================================================
//INICIO DE CLASE
//================================================================
const Login = (props) => {
  //-----------------------------------------------------------------
  //STATE
  const [state, setState] = useState(false); //Funcion para poder realizar el LOADING SPINNER
  const [dataform, setDataForm] = useState({
    //Datos de poder enviar la informacion de USER PASS
    user: "",
    pass: "",
  });

  //-----------------------------------------------------------------
  //Cargar datos de ONCHANGE de las variables de
  const onChangeData = (e) => {
    setDataForm({ ...dataform, [e.target.name]: e.target.value });
  };
  const { user, pass } = dataform;

  //-----------------------------------------------------------------
  //Importamos los USECONTEXT
  const { funcionPeticionLogin } = useContext(logincontext);

  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    setTimeout(() => {
      if (state === false) {
        setState(true);
      }
    }, 2000);
  }, []);
  //-----------------------------------------------------------------
  //FUNCIONES Envio de informacion de USER PASS
  const onClickLogin = (e) => {
    e.preventDefault();

    if (user.trim() === "" || pass.trim() === "") {
      message.warning({
        content: "Entradas Vacias, Revise nuevamente los datos",
        duration: 2,
        className: "message-warning",
      });
    } else {
      funcionPeticionLogin(user, pass).then((e) => {
        if (e === "empty") {
          message.error({
            content: "Error, Usuario no encontrado",
            duration: 2,
            className: "message-error",
          });
        } else if (e === "fail-server") {
          message.warning({
            content: "Entradas Vacias, Revise nuevamente los datos",
            duration: 2,
            className: "message-warning",
          });
        } else {
          message.success({
            content: "Correcto, Bienvenido al sistema",
            duration: 2,
            className: "message-success",
          });
          //   Alert.success("Correcto, Bienvenido al sistema", 2000);
          setTimeout(() => {
            props.history.push("/start");
          }, 2000);
        }
      });
    }
  };
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      {state ? (
        <motion.div
          className="singin-contenedor"
          initial="out"
          animate="in"
          exit="out"
          variants={pageVariantsLogin}
          transition={pageTransitionLogin}
        >
          <Row className="grid-fluid-principal">
            <Col span={6} offset={9}>
              {/* --------------------------------------------------  */}
              <div className="card-login-usuario">
                <div className="row card-imagen-login">
                  <img
                    className="responsive-img imagen-login"
                    src={imagenLogin}
                    alt="LOGIN"
                  />
                </div>
              </div>
              {/* --------------------------------------------------  */}
              <div className="body-login">
                <div className="title-login">
                  <strong>Administrador</strong>
                </div>
                <hr />
                <div className="input-style">
                  <label htmlFor="user" className="label-login">
                    Usuario
                  </label>
                  <Input
                    placeholder="Ingrese su usuario"
                    prefix={<UserOutlined />}
                    className="input-style"
                    name="user"
                    onChange={onChangeData}
                    // onChange={(e) => setDataForm({ ...dataform, user: e })}
                  />
                </div>
                <div className="input-style">
                  <label htmlFor="user" className="label-login">
                    Password
                  </label>
                  <Input
                    placeholder="Ingrese su Password"
                    prefix={<LockOutlined />}
                    className="input-style"
                    name="pass"
                    onChange={onChangeData}

                    // onChange={(e) => setDataForm({ ...dataform, pass: e })}
                  />
                </div>
                {/* --------------------------------------------------  */}
                <Button
                  type="primary"
                  block
                  className="button-login"
                  onClick={onClickLogin}
                >
                  INGRESAR
                </Button>
                <hr />
                {/* --------------------------------------------------  */}
              </div>
            </Col>
          </Row>
        </motion.div>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
};

export default Login;
