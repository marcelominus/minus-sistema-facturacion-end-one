import {
  TOOL_SELECTION_INFORMATION_COMPANY,
  TOOL_SELECTION_INFORMATION_BUSINESS,
  TOOL_SELECTION_READ,
  TOOL_SELECTION,
} from "../../utils/index";
//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    case TOOL_SELECTION_INFORMATION_COMPANY:
      localStorage.setItem("tokencompany", action.payload);
      return {};
    case TOOL_SELECTION_INFORMATION_BUSINESS:
      localStorage.setItem("tokenbusiness", action.payload);
      return {};
    case TOOL_SELECTION_READ:
      return {
        ...state,
        arrayselection: action.payload,
      };
    case TOOL_SELECTION:
      return {
        ...state,
        tableselection: action.payload,
      };
    default:
      return state;
  }
};
