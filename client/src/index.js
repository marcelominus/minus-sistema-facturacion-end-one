import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "antd/dist/antd.css"; //Importamos ANTD
//-----------------------------------------------------------------
import LoginState from "./hook/login/LoginState";
import ToolsState from "./hook/tool/ToolState";
import StartState from "./hook/start/StartState";
import CompanyState from "./hook/company/CompanyState";
import BusinessState from "./hook/business/BusinessState";
//-----------------------------------------------------------------

ReactDOM.render(
  <BrowserRouter>
    <ToolsState>
      <LoginState>
        <StartState>
          <CompanyState>
            <BusinessState>
              <App />
            </BusinessState>
          </CompanyState>
        </StartState>
      </LoginState>
    </ToolsState>
  </BrowserRouter>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
