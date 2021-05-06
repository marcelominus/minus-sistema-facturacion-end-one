import {
  TOOL_SELECTION_INFORMATION_COMPANY,
  TOOL_SELECTION_INFORMATION_BUSINESS,
  TOOL_SELECTION_READ,
  TOOL_SELECTION,
  TOOL_SELECTION_READ_ALL,
  TOOL_SELECTION_INFORMATION_ROLE,
} from "../../utils/index";
//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    case TOOL_SELECTION_INFORMATION_COMPANY:
      localStorage.setItem("tokencompany", action.payload);
      return {
        ...state,
      };
    case TOOL_SELECTION_INFORMATION_BUSINESS:
      localStorage.setItem("tokenbusiness", action.payload);
      return {
        ...state,
      };
    case TOOL_SELECTION_INFORMATION_ROLE:
      localStorage.setItem("role", action.payload);
      return {
        ...state,
      };
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
    case TOOL_SELECTION_READ_ALL:
      return {
        ...state,
        arrayallselection: action.payload,
      };

    default:
      return state;
  }
};
