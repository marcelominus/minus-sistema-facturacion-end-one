import {
  PETITION_LOGIN,
  PETITION_AUTHENTICATED,
  PETITION_EXIT_LOGIN,
} from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    case PETITION_LOGIN:
      //Creamos las variables de LOCALSTORAGE
      localStorage.setItem("login", "true");
      localStorage.setItem("token", action.payload);
      localStorage.setItem("datauser", JSON.stringify([]));
      localStorage.setItem("role", "");
      return {
        ...state,
        authenticated: true,
      };
    case PETITION_AUTHENTICATED:
      localStorage.setItem("datauser", JSON.stringify(action.payload));
      return {
        ...state,
        authenticated: true,
        informationUser: action.payload,
      };
    case PETITION_EXIT_LOGIN:
      localStorage.removeItem("login");
      localStorage.removeItem("token");
      localStorage.removeItem("tokencompany");
      localStorage.removeItem("tokenbusiness");
      localStorage.removeItem("datauser");
      localStorage.removeItem("role");
      return {
        ...state,
      };
    default:
      return state;
  }
};
