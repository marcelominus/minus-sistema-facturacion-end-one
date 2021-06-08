import React, { Fragment } from "react";
import "../../resource/scss/components/tools/title.scss";
//================================================================
//INICIO DE CLASE
//================================================================
const Title = ({ title }) => {
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <div className="container-title">
        <span className="title">{title}</span>
        <hr />
      </div>
    </Fragment>
  );
};

export default Title;
