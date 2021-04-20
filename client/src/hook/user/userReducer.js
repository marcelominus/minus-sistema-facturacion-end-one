//****************************************************************
//Importamos los TYPES
import {
  USER_CREATE,
  USER_READ,
  USER_UPDATE,
  USER_MODAL_UPDATE,
  USER_ARRAY_UPDATE,
  USER_DELETE,
} from "../../utils/index";
//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    case USER_CREATE:
      return {
        ...state,
        arrayuser: [...state.arrayuser, action.payload],
      };
    case USER_READ:
      return {
        ...state,
        arrayuser: action.payload,
      };
    case USER_MODAL_UPDATE:
      return {
        ...state,
        modalupdateuser: action.payload,
      };
    case USER_ARRAY_UPDATE:
      return {
        ...state,
        arrayupdateuser: action.payload,
      };
    default:
      return state;
  }
};
