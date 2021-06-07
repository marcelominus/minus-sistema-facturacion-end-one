import React, { Fragment, useEffect, useState } from "react";
//****************************************************************
//
import imageinvoice from "../../resource/img/image-invoice-two.jpg";
//****************************************************************
//
import { Row, Col, Input, Button, message } from "antd";

//================================================================
//INICIO DE CLASE
//================================================================
const CardStartUser = () => {
  //-----------------------------------------------------------------
  //ZONE USE STATE
  const [datauser, setDataUser] = useState({
    avatar: "",
    email: "",
    name: "",
    surname: "",
    role: "",
  });
  const { avatar, email, name, surname, role } = datauser;
  //-----------------------------------------------------------------
  //ZONE USE EFFECT
  useEffect(() => {
    //VARIABLES de TOKEN
    let dataTokenUser = JSON.parse(localStorage.getItem("datauser"));
    setDataUser({
      avatar: dataTokenUser[0].avatar,
      email: dataTokenUser[0].email,
      name: dataTokenUser[0].name,
      surname: dataTokenUser[0].surname,
      role: dataTokenUser[0].role,
    });
  }, []);
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <Row
        className="grid-fluid-principal"
        style={{ background: "transparent" }}
      >
        <Col span={12} style={{ background: "yellow" }}>
          <img
            src={imageinvoice}
            alt=""
            style={{ width: "100%", borderRadius: "2rem" }}
          />
        </Col>
        <Col span={12} style={{ background: "transparent", padding: "2rem" }}>
          <Row>
            <Col span={8}>
              <img
                src={avatar}
                alt=""
                style={{ width: "40%", borderRadius: "50%" }}
              />
            </Col>
            <Col span={16} style={{ textAlign: "left" }}>
              <h4>
                <strong>Bienvenido</strong>
              </h4>
              <h4 style={{ textTransform: "capitalize" }}>
                {name} {surname}
              </h4>
            </Col>
          </Row>
          <hr />
          <h4>
            <strong>Email : </strong>
            {email}
          </h4>
          <h4>
            <strong>Rol : </strong>
            {role}
          </h4>
        </Col>
      </Row>
    </Fragment>
  );
};

export default CardStartUser;
