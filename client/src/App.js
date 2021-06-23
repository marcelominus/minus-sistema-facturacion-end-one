import React, { Fragment, useState, useEffect, useContext } from "react";
//Importamos el react router dom
import { Route, Switch, useLocation } from "react-router-dom";
//Importamos FRAMER MOTION para colocar animaciones
import { AnimatePresence } from "framer-motion";
//****************************************************************
//Importamos los COMPONENTES
import Login from "./page/login/Login";
import AdminBusiness from "./page/admin/AdminBusiness";
import AdminCompany from "./page/admin/AdminCompany";
import AdminDosage from "./page/admin/AdminDosage";
import AdminInvoice from "./page/admin/AdminInvoice";
import AdminStart from "./page/admin/AdminStart";
import AdminUser from "./page/admin/AdminUser";
import AdminSelection from "./page/admin/AdminSelection";
import AdminProduct from "./page/admin/AdminProduct";
import AdminBill from "./page/admin/AdminBill";
import AdminAddBill from "./page/admin/AdminAddBill";
import AdminReport from "./page/admin/AdminReport";
import Error404 from "./page/error/Error404";

import PrivateRoute from "./routes/PrivateRoute";
//****************************************************************
//Importamos las ROUTAS
import {
  rootroute,
  businessroute,
  companyroute,
  dosageroute,
  invoiceroute,
  startroute,
  userroute,
  selectionroute,
  productroute,
  billroute,
  billaddroute,
  reportroute,
} from "./routes/routes";
// =====================================================
// INICIO DE CLASE  */}
// =====================================================
const App = () => {
  //Invocamos LOCATION para saber en que direccion se encuentra el navegador
  const location = useLocation();

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <Fragment>
      <AnimatePresence exitBeforeEnter>
        <Switch location={location} key={location.pathname}>
          <Route path={rootroute} exact={true} component={Login} />
          <PrivateRoute
            path={businessroute}
            exact={true}
            component={AdminBusiness}
          />
          <PrivateRoute
            path={companyroute}
            exact={true}
            component={AdminCompany}
          />
          <PrivateRoute
            path={dosageroute}
            exact={true}
            component={AdminDosage}
          />
          <PrivateRoute
            path={invoiceroute}
            exact={true}
            component={AdminInvoice}
          />
          <PrivateRoute path={startroute} exact={true} component={AdminStart} />
          <PrivateRoute path={userroute} exact={true} component={AdminUser} />
          <PrivateRoute
            path={selectionroute}
            exact={true}
            component={AdminSelection}
          />
          <PrivateRoute
            path={productroute}
            exact={true}
            component={AdminProduct}
          />
          <PrivateRoute path={billroute} exact={true} component={AdminBill} />
          <PrivateRoute
            path={billaddroute}
            exact={true}
            component={AdminAddBill}
          />
          <PrivateRoute
            path={reportroute}
            exact={true}
            component={AdminReport}
          />
          <PrivateRoute component={Error404} />
        </Switch>
      </AnimatePresence>
    </Fragment>
  );
};

export default App;
