import React from "react";
//*******************************************************
//Importamos las ROUTE
import { Route, Redirect } from "react-router-dom";
//*******************************************************
//
import { rootroute } from "./routes";
// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const PrivateRoute = ({ component: Component, ...rest }) => {
  // =====================================================
  // INICIO DE COMPONENTE}
  // =====================================================
  return (
    <Route
      {...rest}
      render={(props) =>
        localStorage.getItem("login") === "true" ? (
          <Component {...props} />
        ) : (
          <Redirect to={rootroute} />
        )
      }
    />
  );
};

export default PrivateRoute;
