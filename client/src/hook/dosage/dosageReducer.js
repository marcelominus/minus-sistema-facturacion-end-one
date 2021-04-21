import {
  DOSAGE_CREATE,
  DOSAGE_READ,
  DOSAGE_MODAL_UPDATE,
  DOSAGE_ARRAY_UPDATE,
  DOSAGE_UPDATE,
  DOSAGE_DELETE,
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    //----------------------------------------------------------------
    //----------------------------------------------------------------
    //ANADE AL ARRAY LA INFORMACION DE ARRAY DE INFORMACION PARA LA LISTA
    case DOSAGE_CREATE: //REVISAR *************************************
      return {
        ...state,
        arraydosage: [...state.arraydosage, action.payload],
      };
    case DOSAGE_READ:
      return {
        ...state,
        arraydosage: action.payload,
      };
    case DOSAGE_MODAL_UPDATE:
      return {
        ...state,
        modalupdatedosage: action.payload,
      };
    case DOSAGE_ARRAY_UPDATE:
      return {
        ...state,
        arrayupdatedosage: action.payload,
      };
    default:
      return state;
  }
};
