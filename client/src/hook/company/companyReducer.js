import {
  COMPANY_READ,
  COMPANY_SAVE_COMPANY,
  COMPANY_MODAL_LOGO,
  COMPANY_MODAL_LOGAL_VIEW,
  COMPANY_MODAL_UPDATE,
  COMPANY_SAVE_COMPANY_UPDATE,
  COMPANY_DIRECTION_LOGO,
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    //-----------------------------------------------------------------
    //REDUCER PARA PODER GUARDAR EL ID COMPANY PARA PODER UTILIZARLO PARA ENVIAR INFORMACION DE LOGO ADD
    case COMPANY_SAVE_COMPANY:
      return {
        ...state,
        idcompany: action.payload,
      };

    //-----------------------------------------------------------------
    //REDUCER PARA PODER ABRIR EL MODAL DE ADD LOGO
    case COMPANY_MODAL_LOGO:
      return {
        ...state,
        modallogo: action.payload,
      };
    //----------------------------------------------------------------
    //REDUCER PARA PODER INGRESAR LA INFORMACION EN ESTE ARRAY PARA LA LISTA O TABLA DE INFORMACION
    //REEMPLAZA COMPLETAMENTE EL ARRAY DE USUARIO
    case COMPANY_READ:
      return {
        ...state,
        arraycompany: action.payload,
      };

    //-----------------------------------------------------------------
    //REDUCER PARA PODER ABRIR AUTOMATICAMENTE EL MODAL DE LOGO VIEW
    case COMPANY_MODAL_LOGAL_VIEW:
      return {
        ...state,
        modallogoview: action.payload,
      };

    //-----------------------------------------------------------------
    //REDUCER PARA PODER ABRIR EL MODAL DE FORMULARIO DE UPDATE
    case COMPANY_MODAL_UPDATE:
      return {
        ...state,
        modalupdate: action.payload,
      };

    //-----------------------------------------------------------------
    //REDUCER PARA PODER ACTUALIZAR EL ARRAY DE COMPANY
    case COMPANY_SAVE_COMPANY_UPDATE:
      return {
        ...state,
        idcompanyupdatearray: action.payload,
      };

    //****************************************************************
    // NO UTILIZADA
    case COMPANY_DIRECTION_LOGO:
      return {
        ...state,
        directionimglogo: action.payload,
      };

    default:
      return state;
  }
};
