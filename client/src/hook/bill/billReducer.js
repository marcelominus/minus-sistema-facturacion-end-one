import {
  BILL_MODAL_UNIQUE,
  BILL_ARRAY_PRODUCT,
  BILL_TOTAL_PRODUCT,
  BILL_ARRAY_RESET,
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    //----------------------------------------------------------------
    //ANADE AL ARRAY LA INFORMACION DE ARRAY DE INFORMACION PARA LA LISTA
    case BILL_MODAL_UNIQUE:
      return {
        ...state,
        modalbillunique: action.payload,
      };
    case BILL_ARRAY_PRODUCT:
      return {
        ...state,
        arrayproductbill: [...state.arrayproductbill, action.payload],
      };
    case BILL_ARRAY_RESET:
      return {
        ...state,
        arrayproductbill: [],
      };
    case BILL_TOTAL_PRODUCT:
      return {
        ...state,
        totalproduct: action.payload,
      };
    default:
      return state;
  }
};
