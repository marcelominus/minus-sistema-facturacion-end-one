import React, { useReducer } from "react";
//Importamos AXIOS
import clienteAxios from "../../config/axios";
//Importamos los CONTEXT
import productContext from "./productContext";
import productReducer from "./productReducer";

// Importamos los TYPES
import {
  PRODUCT_CREATE,
  PRODUCT_READ,
  PRODUCT_UPDATE,
  PRODUCT_MODAL_UPDATE,
  PRODUCT_ARRAY_UPDATE,
  PRODUCT_DELETE,
} from "../../utils/index";
// Importamos las direcciones de LOGIN
import {
  direction_admin_product_create,
  direction_admin_product_read,
  direction_admin_product_update,
  direction_admin_product_delete,
} from "../../resource/js/directions";
//Importamos la variable de FUNCION de TOKEN que permite INGREASAR HEAD AXIOS
import tokenAuth from "../../config/token";

//================================================================
//INICIO DE CLASE
//================================================================
const ProductState = (props) => {
  const initialState = {
    arrayproduct: [], //ARRAY PRINCIPAL CONTENEDOR DE COMPANIAS
    modalupdateproduct: false,
    arrayupdateproduct: [
      {
        shortdescriptionpro: "",
        longdescriptionpro: "",
        unitmeasurepro: "",
        pricepro: "0",
      },
    ],
  };
  const [state, dispatch] = useReducer(productReducer, initialState);
  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  //-----------------------------------------------------------------
  //
  const functionCreateProduct = async (value_1, value_2, value_3, value_4) => {
    //Extraer el TOKEN del LOCAL STORE
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_product_create;
      const petitionCreateProduct = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
        shortdescriptionpro: value_1,
        longdescriptionpro: value_2,
        unitmeasurepro: value_3,
        pricepro: value_4,
      });

      const solutionPetitionCreate = petitionCreateProduct.data;
      if (solutionPetitionCreate.response == "success") {
        return solutionPetitionCreate.data;
      } else {
        return solutionPetitionCreate.response;
      }
    } catch (error) {
      return false;
    }
  };
  //******************************************************************************
  const functionReadProduct = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_product_read;
      const petitionReadProduct = await clienteAxios.post(url, {
        identifierbus: dataTokenBusiness,
      });
      const solutionPetitionRead = petitionReadProduct.data;
      if (solutionPetitionRead.response == "empty") {
        dispatch({
          type: PRODUCT_READ,
          payload: [],
        });
        return false;
      } else {
        dispatch({
          type: PRODUCT_READ,
          payload: solutionPetitionRead.data,
        });
        return true;
      }
    } catch (error) {
      console.log(error);
    }
  };

  //-----------------------------------------------------------------
  //Function de CAMBIO DE BUSINESS
  const functionUpdateProduct = async (
    value_1,
    value_2,
    value_3,
    value_4,
    value_5
  ) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      let dataTokenBusiness = localStorage.getItem("tokenbusiness");
      const url = direction_admin_product_update;
      const petitionUpdateProduct = await clienteAxios.post(url, {
        shortdescriptionpro: value_1,
        longdescriptionpro: value_2,
        unitmeasurepro: value_3,
        pricepro: value_4,
        identifierpro: value_5,
      });
      const solutionPetitionUpdate = petitionUpdateProduct.data;
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

  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  const functionModalUpdate = (valor) => {
    dispatch({
      type: PRODUCT_MODAL_UPDATE,
      payload: valor,
    });
  };
  //-----------------------------------------------------------------
  //FUNCION PAR APODER COPIAR EL LINK SELECCIONADO
  const functionArrayUpdateProduct = (valor) => {
    dispatch({
      type: PRODUCT_ARRAY_UPDATE,
      payload: valor,
    });
  };
  //-----------------------------------------------------------------
  //FUNCION BORRAR COMPANY
  const functionDeleteProduct = async (valor) => {
    const token = localStorage.getItem("token");
    if (token) {
      //Se ingresa el TOKEN y se introduce en el HEADER del CLIENTE AXIOS
      tokenAuth(token);
    }
    try {
      const url = direction_admin_product_delete;
      const petitionDeleteProduct = await clienteAxios.post(url, {
        identifierpro: valor,
      });
      const solutionPetitionDelete = petitionDeleteProduct.data;
      if (solutionPetitionDelete.response == "success") {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
    }
  };
  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <productContext.Provider
      value={{
        arrayproduct: state.arrayproduct,
        modalupdateproduct: state.modalupdateproduct,
        arrayupdateproduct: state.arrayupdateproduct,
        functionCreateProduct,
        functionReadProduct,
        functionUpdateProduct,
        functionModalUpdate,
        functionArrayUpdateProduct,
        functionDeleteProduct,
      }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
