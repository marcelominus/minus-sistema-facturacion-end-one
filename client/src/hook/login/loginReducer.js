import { PETITION_LOGIN, PETITION_AUTHENTICATED } from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
    case PETITION_LOGIN:
      localStorage.setItem("login", "true");
      localStorage.setItem("token", action.payload);
      localStorage.setItem("tokencompany", "");
      localStorage.setItem("tokenbusiness", "");
      localStorage.setItem("tokendosage", "");
      localStorage.setItem("datauser", JSON.stringify([]));
      localStorage.setItem("role","")
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
    default:
      return state;
  }
};
