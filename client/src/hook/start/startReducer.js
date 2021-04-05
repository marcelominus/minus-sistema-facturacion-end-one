// import {
//   PETITION_LOGIN,
//   PETITION_AUTHENTICATED,
//   ERROR_LOGUEO,
// } from "../../utils/index";

//Zona de SWITCH
export default (state, action) => {
  switch (action.type) {
      
    // case PETITION_LOGIN:
    //   localStorage.setItem("token", action.payload);
    //   return {
    //     ...state,
    //     authenticated: true,
    //   };
    // case PETITION_AUTHENTICATED:
    //   localStorage.setItem("datauser", JSON.stringify(action.payload));
    //   return {
    //     ...state,
    //     authenticated: true,
    //     informationUser: action.payload,
    //   };
    // case ERROR_LOGUEO:
    //   localStorage.removeItem("token");
    //   return {
    //     ...state,
    //     authenticated: false,
    //   };

    default:
      return state;
  }
};
