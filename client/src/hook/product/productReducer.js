import {
  PRODUCT_CREATE,
  PRODUCT_READ,
  PRODUCT_MODAL_UPDATE,
  PRODUCT_ARRAY_UPDATE,
  PRODUCT_UPDATE,
  PRODUCT_DELETE,
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //ANADE AL ARRAY LA INFORMACION DE ARRAY DE INFORMACION PARA LA LISTA
    case PRODUCT_CREATE: //REVISAR *************************************
      return {
        ...state,
        arrayproduct: [...state.arrayproduct, action.payload],
      };
    case PRODUCT_READ:
      return {
        ...state,
        arrayproduct: action.payload,
      };
    case PRODUCT_MODAL_UPDATE:
      return {
        ...state,
        modalupdateproduct: action.payload,
      };
    case PRODUCT_ARRAY_UPDATE:
      return {
        ...state,
        arrayupdateproduct: action.payload,
      };
    default:
      return state;
  }
};
