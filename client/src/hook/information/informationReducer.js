import {
  INFORMATION_OPEN_MODAL,
  INFORMATION_ARRAY_INFORMATION,
  INFORMATION_ARRAY_INFORMATION_BILL,
  INFORMATION_OPEN_SPIN,
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    //----------------------------------------------------------------
    //ANADE AL ARRAY LA INFORMACION DE ARRAY DE INFORMACION PARA LA LISTA
    case INFORMATION_OPEN_MODAL:
      return {
        ...state,
        modalopeninformation: action.payload,
      };
    case INFORMATION_ARRAY_INFORMATION:
      return {
        ...state,
        arrayinformation: action.payload,
      };
    case INFORMATION_ARRAY_INFORMATION_BILL:
      return {
        ...state,
        arrayinformationbill: action.payload,
      };
    case INFORMATION_OPEN_SPIN:
      return {
        ...state,
        openspin: action.payload,
      };
    default:
      return state;
  }
};
