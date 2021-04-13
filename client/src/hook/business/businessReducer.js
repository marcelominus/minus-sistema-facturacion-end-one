import { BUSINESS_CREATE, BUSINESS_READ } from "../../utils/index";

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

    default:
      return state;
  }
};
