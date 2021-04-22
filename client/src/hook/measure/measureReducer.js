import {
  MEASURE_CREATE,
  MEASURE_READ,
  MEASURE_MODAL_UPDATE,
  MEASURE_ARRAY_UPDATE,
  MEASURE_UPDATE,
  MEASURE_DELETE,
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //ANADE AL ARRAY LA INFORMACION DE ARRAY DE INFORMACION PARA LA LISTA
    case MEASURE_CREATE: //REVISAR *************************************
      return {
        ...state,
        arraymeasure: [...state.arraymeasure, action.payload],
      };
    case MEASURE_READ:
      return {
        ...state,
        arraymeasure: action.payload,
      };
    case MEASURE_MODAL_UPDATE:
      return {
        ...state,
        modalupdatemeasure: action.payload,
      };
    case MEASURE_ARRAY_UPDATE:
      return {
        ...state,
        arrayupdatedosage: action.payload,
      };
    default:
      return state;
  }
};
