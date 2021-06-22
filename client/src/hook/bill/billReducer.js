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
    case BILL_MODAL_SELECTION:
      return {
        ...state,
        modalbillselection: action.payload,
      };
    case BILL_ARRAY_BILL_PRINT:
      return {
        ...state,
        arraybillprint: action.payload,
      };
    case BILL_DRAWER_TOP:
      return {
        ...state,
        drawertop: action.payload,
      };
    case BILL_ARRAY_PRODUCT_SELECTION:
      return {
        ...state,
        arrayproductselection: action.payload,
      };
    case BILL_ARRAY_SELECTION_RESET:
      return {
        ...state,
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
      };
    case BILL_TABLE_READ:
      return {
        ...state,
        arraybill: action.payload,
      };
    case BILL_ARRAY_PRODUCT_SET:
      return {
        ...state,
        arrayproductbill: action.payload,
      };
    case BILL_OPEN_LOADING:
      return {
        ...state,
        openspin: action.payload,
      };
    default:
      return state;
  }
};
