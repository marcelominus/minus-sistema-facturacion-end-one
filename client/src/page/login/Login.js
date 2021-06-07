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

//*******************************************************
//Importamos las funciones de MESSAGES
import {
  messageError,
  messageWarning,
  messageSuccess,
} from "../../resource/js/messages";

//****************************************************************
//Importamos los CONTEXT
import loginContext from "../../hook/login/loginContext";
import toolContext from "../../hook/tool/toolContext";

//*******************************************************
//Importamos el Componente de LOADING
import Loading from "../../components/tools/Loading";

//================================================================
//INICIO DE CLASE
//================================================================
const Login = (props) => {
  //-----------------------------------------------------------------
  //ZONE STATE
  const [state, setState] = useState(false); //Funcion para poder realizar el LOADING SPINNER
  const [dataform, setDataForm] = useState({
    //Datos de poder enviar la informacion de USER PASS
    user: "",
    pass: "",
  });

  //-----------------------------------------------------------------
  //Cargar datos de ONCHANGE de las variables de
  const onChangeData = (e) => {
    setDataForm({
      ...dataform,
      [e.target.name]: e.target.value,
    });
  };
  const { user, pass } = dataform;

  //-----------------------------------------------------------------
  //ZONE USE CONTEXT
  const { funcionPeticionLogin } = useContext(loginContext);
  const {
    functionSelectionInformationCompany,
    functionSelectionInformationBusiness,
    functionSelectionInformationRole,
  } = useContext(toolContext);
  //-------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //Le da un tiempo de 2 sengundos para el EFECTO LOADING
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

    //-----------------------------------------------------------------
    if (user.trim() === "" || pass.trim() === "") {
      messageWarning("Entradas Vacias, Revise nuevamente los datos", 2);
    } else {
      funcionPeticionLogin(user, pass).then((e) => {
        if (e === "empty") {
          messageError("Error, Usuario no encontrado", 3);
        } else if (e === "fail-server") {
          message("Fallo, Intente mas Tarde", 3);
        } else {
          messageSuccess("Correcto, Bienvenido al sistema", 3);
          let dataTokenRole = JSON.parse(localStorage.getItem("datauser"));
          switch (dataTokenRole[0].role) {
            case "master":
              functionSelectionInformationRole("master");
              break;
            case "admin-all":
              functionSelectionInformationCompany(
                dataTokenRole[0].identifiercom
              );
              functionSelectionInformationBusiness(
                dataTokenRole[0].identifierbus
              );
              functionSelectionInformationRole("admin-all");
              break;
            case "user":
              functionSelectionInformationCompany(
                dataTokenRole[0].identifiercom
              );
              functionSelectionInformationBusiness(
                dataTokenRole[0].identifierbus
              );
              functionSelectionInformationRole("user");
              break;
            default:
              break;
          }
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
