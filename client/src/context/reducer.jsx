import {
  CLEAR_ALERT,
  DISPLAY_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_ERROR,
  LOGIN_USER_BEGIN,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ERROR,
} from "./actions";

const reducer = (state, action) => {
  switch (action.type) {
    case DISPLAY_ALERT:
      return {
        ...state,
        showAlert: true,
        alertType: "danger",
        alertText: "Please provide all values",
      };

    case CLEAR_ALERT:
      return {
        ...state,
        showAlert: false,
        alertType: "",
        alertText: "",
      };

    case REGISTER_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertText: "User Created ! Redirecting ...",
        alertType: "success",
      };
    case REGISTER_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: true,
      };

    case LOGIN_USER_BEGIN:
      return {
        ...state,
        isLoading: true,
      };
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        token: action.payload.token,
        user: action.payload.user,
        userLocation: action.payload.location,
        jobLocation: action.payload.location,
        showAlert: true,
        alertText: "Login Successful ! Redirecting ...",
        alertType: "success",
      };
    case LOGIN_USER_ERROR:
      return {
        ...state,
        isLoading: false,
        alertText: action.payload.msg,
        alertType: "danger",
        showAlert: true,
      };
    default:
      return state;
  }
};

export default reducer;
