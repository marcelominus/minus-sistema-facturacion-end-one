import {
  BUSINESS_CREATE,
  BUSINESS_READ,
  BUSINESS_UPDATE,
  BUSINESS_MODAL_UPDATE,
  BUSINESS_ARRAY_UPDATE,
  BUSINESS_DELETE
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //ANADE AL ARRAY LA INFORMACION DE ARRAY DE INFORMACION PARA LA LISTA
    case BUSINESS_CREATE:
      return {
        ...state,
        arraybusiness: [...state.arraybusiness, action.payload],
      };
    case BUSINESS_READ:
      return {
        ...state,
        arraybusiness: action.payload,
      };
    case BUSINESS_MODAL_UPDATE:
      return {
        ...state,
        modalupdatebusiness: action.payload,
      };
    case BUSINESS_ARRAY_UPDATE:
      return {
        ...state,
        arrayupdatebusiness: action.payload,
      };
    default:
      return state;
  }
};
