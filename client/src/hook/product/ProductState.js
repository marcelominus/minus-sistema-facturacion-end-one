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
        identifierbus: "",
        unitmeasure: "",
        descriptionmeasure: "",
      },
    ],
  };
  const [state, dispatch] = useReducer(measureReducer, initialState);
  //-----------------------------------------------------------------
  //FUNCION PAR APODER ABRIR AUTOMATICAMENTE EL MODAL
  //-----------------------------------------------------------------
  //

  //================================================================
  //INICIO DE COMPONENTE
  //================================================================
  return (
    <productContext.Provider
      value={{
        arrayproduct: state.arrayproduct,
        modalupdateproduct: state.modalupdateproduct,
        arrayupdateproduct: state.arrayupdateproduct,
      }}
    >
      {props.children}
    </productContext.Provider>
  );
};

export default ProductState;
