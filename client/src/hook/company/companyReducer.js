import {
  COMPANY_CREATE,
  COMPANY_READ,
  COMPANY_UPDATE,
  COMPANY_DELETE,
  COMPANY_UPDATE_IMG,
  COMPANY_SAVE_COMPANY,
  COMPANY_SAVE_COMPANY_UPDATE,
  COMPANY_SAVE_ID_COMPANY_UPDATE,
  COMPANY_MODAL_LOGO,
  COMPANY_DIRECTION_LOGO,
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    //----------------------------------------------------------------
    case COMPANY_CREATE:
      return {
        ...state,
        arraycompany: [...state.arraycompany, action.payload],
      };
    case COMPANY_SAVE_COMPANY: //Guarda el ID de COMPANIA para poder rescartarla para el logo
      return {
        ...state,
        idcompany: action.payload,
      };
    case COMPANY_MODAL_LOGO: //STATE para poder abrir automaticamente el MODAL LOGO
      return {
        ...state,
        modallogo: action.payload,
      };
    //----------------------------------------------------------------
    case COMPANY_READ: //PETICION DE LECTURA DE INFORMACION
      return {
        ...state,
        arraycompany: action.payload,
      };
    //-----------------------------------------------------------------
    case COMPANY_SAVE_COMPANY:
      return {
        ...state,
        idcompany: action.payload,
      };
    case COMPANY_SAVE_COMPANY_UPDATE:
      return {
        ...state,
        idcompanyupdatearray: action.payload,
      };

    case COMPANY_DIRECTION_LOGO:
      return {
        ...state,
        directionimglogo: action.payload,
      };
    case COMPANY_SAVE_ID_COMPANY_UPDATE:
      return {
        ...state,
        idcompanyupdate: action.payload,
      };
    default:
      return state;
  }
};
