import React, { Fragment, useState, useEffect, useContext } from "react";
//Importamos el react router dom
import { Route, Switch, useLocation } from "react-router-dom";
//Importamos FRAMER MOTION para colocar animaciones
import { AnimatePresence } from "framer-motion";
//****************************************************************
//
import Login from "./page/login/Login";
import AdminBusiness from "./page/admin/AdminBusiness";
import AdminCompany from "./page/admin/AdminCompany";
import AdminDosage from "./page/admin/AdminDosage";
import AdminInvoice from "./page/admin/AdminInvoice";
import AdminStart from "./page/admin/AdminStart";
import AdminUser from "./page/admin/AdminUser";
import AdminSelection from "./page/admin/AdminSelection";
import AdminProduct from './page/admin/AdminProduct';
import Error404 from "./page/error/Error404";
//****************************************************************
//
import logincontext from "./hook/login/loginContext";

// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const App = () => {
  //Invocamos LOCATION para saber en que direccion se encuentra el navegador
  const location = useLocation();
  const [state, setState] = useState(false);
  //-----------------------------------------------------------------
  //Importamos los USECONTEXT
  const { authenticated, funcionStartFast } = useContext(logincontext);

  //-------------------------------------------------------
  //
  useEffect(() => {
    let loginUser = localStorage.getItem("login");
    if (loginUser == "true") {
      setState(true);
    }
  }, []);

  useEffect(() => {
    if (authenticated !== false) {
      setTimeout(() => {
        setState(true);
      }, 3000);
    }
  }, [authenticated]);

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path="/" exact={true} component={Login} />
          <Route path="/business" exact={true} component={AdminBusiness} />
          <Route path="/company" exact={true} component={AdminCompany} />
          <Route path="/dosage" exact={true} component={AdminDosage} />
          <Route path="/invoice" exact={true} component={AdminInvoice} />
          <Route path="/start" exact={true} component={AdminStart} />
          <Route path="/user" exact={true} component={AdminUser} />
          <Route path="/selection" exact={true} component={AdminSelection} />
          <Route path="/product" exact={true} component={AdminProduct} />

          <Route component={Error404} />
        </Switch>
      </AnimatePresence>
    </Fragment>
  );
};

export default App;
