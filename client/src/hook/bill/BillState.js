import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import billContext from "../../hook/bill/billContext";
import billReducer from "../../hook/bill/billReducer";
// Importamos los TYPES
import {
  BILL_MODAL_UNIQUE,
  BILL_ARRAY_PRODUCT,
  BILL_TOTAL_PRODUCT,
  BILL_ARRAY_RESET,
  BILL_MODAL_SELECTION,
  BILL_ARRAY_BILL_PRINT,
  BILL_DRAWER_TOP,
  BILL_ARRAY_PRODUCT_SELECTION,
  BILL_ARRAY_SELECTION_RESET,
  BILL_TABLE_READ,
  BILL_ARRAY_PRODUCT_SET,
  BILL_OPEN_LOADING,
} from "../../utils/index";
// Importamos las direcciones de LOGIN
import {
  direction_admin_bill_create,
  direction_admin_bill_read,
  direction_admin_bill_read_unique,
  direction_admin_bill_update_condition,
} from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";

//================================================================
//INICIO DE CLASE
//================================================================
const BillState = (props) => {
  //
  const initialState = {
    modalbillunique: false,
    arrayproductbill: [],
    totalproduct: "",
    modalbillselection: false,
    arraybillprint: [],
    drawertop: false,
    arrayproductselection: [
      {
        idproduct: "",
        identifierbus: "",
        identifierpro: "",
        shortdescriptionpro: "",
        unitmeasurepro: "",
        amountpro: "1",
        pricepro: "",
      },
    ],
    arraybill: [],
    openspin: false,
  };
  //
  const [state, dispatch] = useReducer(billReducer, initialState);

  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  const functionModalBillUnique = (valor) => {
    dispatch({
      type: BILL_MODAL_UNIQUE,
      payload: valor,
    });
  };

  const functionArrayProductBill = (valor) => {
    dispatch({
      type: BILL_ARRAY_PRODUCT,
      payload: valor,
    });
  };

  const functionTotalProductBill = (valor) => {
    dispatch({
      type: BILL_TOTAL_PRODUCT,
      payload: valor,
    });
  };

  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  //-----------------------------------------------------------------
  //
  const functionCreateBill = async (
    value_1,
    value_2,
    value_3,
    value_4,
    value_5,
    value_6
  ) => {
    //Extraer el TOKEN del LOCAL STORE
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenCompany = localStorage.getItem("tokencompany");
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_bill_create;
      const petitionCreateBill = await clienteAxios.post(url, {
        identifiercom: dataTokenCompany,
        identifierbus: dataTokenBusiness,
        nitbill: value_1,
        datepresentbill: value_2,
        reasonbill: value_3,
        paymenttypebill: value_4,
        productsbill: value_5,
        conditionbill: value_6,
      });

      const solutionPetitionCreate = petitionCreateBill.data;
      console.log(solutionPetitionCreate);
      if (solutionPetitionCreate.response == "success") {
        return solutionPetitionCreate.data;
      } else {
        return solutionPetitionCreate.response;
      }
    } catch (error) {
      return false;
    }
  };

  const functionArrayProductBillReset = () => {
    dispatch({
      type: BILL_ARRAY_RESET,
    });
  };
  //
  const functionModalBillSelection = (value) => {
    dispatch({
      type: BILL_MODAL_SELECTION,
      payload: value,
    });
  };
  const functionArrayBillPrint = (value) => {
    dispatch({
      type: BILL_ARRAY_BILL_PRINT,
      payload: value,
    });
  };

  const functionOpenDrawerTop = (value) => {
    dispatch({
      type: BILL_DRAWER_TOP,
      payload: value,
    });
  };

  const functionArrayProductSelection = (value) => {
    dispatch({
      type: BILL_ARRAY_PRODUCT_SELECTION,
      payload: value,
    });
  };

  const functionArrayProductSelectionReset = () => {
    dispatch({
      type: BILL_ARRAY_SELECTION_RESET,
    });
  };

  const functionReadBill = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_bill_read;
      const petitionReadBill = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
      });
      const solutionPetitionRead = petitionReadBill.data;
      if (solutionPetitionRead.response == "empty") {
        dispatch({
          type: BILL_TABLE_READ,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: BILL_TABLE_READ,
          payload: solutionPetitionRead.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const functionSetArrayProductBill = (value) => {
    dispatch({
      type: BILL_ARRAY_PRODUCT_SET,
      payload: value,
    });
  };

  const functionReadBillCopy = async (value) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_bill_read_unique;
      const petitionReadBill = await clienteAxios.post(url, {
        identifierbill: value,
      });
      const solutionPetitionReadCopy = petitionReadBill.data;
      console.log(solutionPetitionReadCopy.data);
      if (solutionPetitionReadCopy.response == "fail-server") {
        return false;
      } else {
        return solutionPetitionReadCopy.data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const functionUpdateConditionBill = async (value_1, value_2) => {
    //direction_admin_bill_update_condition
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_bill_update_condition;
      const petitionUpdateBillCondition = await clienteAxios.post(url, {
        identifierbill: value_1,
        conditionbill: value_2,
      });
      const solutionPetitionUpdate = petitionUpdateBillCondition.data;
      console.log(solutionPetitionUpdate);
      if (solutionPetitionUpdate.response == "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const functionOpenSpin = (value) => {
    dispatch({
      type: BILL_OPEN_LOADING,
      payload: value,
    });
  };
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <billContext.Provider
      value={{
        modalbillunique: state.modalbillunique,
        arrayproductbill: state.arrayproductbill,
        totalproduct: state.totalproduct,
        modalbillselection: state.modalbillselection,
        arraybillprint: state.arraybillprint,
        drawertop: state.drawertop,
        arrayproductselection: state.arrayproductselection,
        arraybill: state.arraybill,
        openspin: state.openspin,
        functionModalBillUnique,
        functionArrayProductBill,
        functionTotalProductBill,
        functionCreateBill,
        functionArrayProductBillReset,
        functionModalBillSelection,
        functionArrayBillPrint,
        functionOpenDrawerTop,
        functionArrayProductSelection,
        functionArrayProductSelectionReset,
        functionReadBill,
        functionSetArrayProductBill,
        functionReadBillCopy,
        functionUpdateConditionBill,
        functionOpenSpin,
      }}
    >
      {props.children}
    </billContext.Provider>
  );
};

export default BillState;
