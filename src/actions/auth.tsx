import axios from "../helpers/axiosInterceptor";
import { authConstants } from "../helpers/constants";
import { alertActions } from "./alert";

export const login = (formData, history) => async (dispatch) => {
  try {
    dispatch(alertActions.page_loader(true));
    const response = await axios.post("/login", formData);
    const user_data = response.data;

    await dispatch({ type: authConstants.LOGIN_SUCCESS, payload: user_data });

    const fcm_token = localStorage.getItem("fcm_token");
    if (fcm_token) {
      await axios.post("/user/fcm_token", { fcm_token });
    }

    await dispatch(alertActions.page_loader(false));

    if (user_data.user.phone_verified) {
      history.replace("/");
    } else history.replace("/auth/verify");
  } catch (e) {
    const response = e.response.data;
    dispatch({ type: authConstants.LOGIN_FAILURE, payload: response.errors });
    dispatch(alertActions.page_loader(false));
  }
};

export const register = (formData, history) => async (dispatch) => {
  try {
    dispatch(alertActions.page_loader(true));
    const response = await axios.post("/register", formData);
    const data = response.data;
    console.log("data", data);
    dispatch({ type: authConstants.REGISTER_SUCCESS, payload: data });
    dispatch(alertActions.page_loader(false));

    if (data.user.verification_required) {
      history.replace("/auth/login");
    } else history.replace("/");
  } catch (e) {
    const response = e.response.data;
    dispatch({
      type: authConstants.REGISTER_FAILURE,
      payload: response.errors,
    });
    dispatch(alertActions.page_loader(false));
  }
};

export const verify = (formData, history) => async (dispatch) => {
  try {
    dispatch(alertActions.page_loader(true));
    const response = await axios.post("/verify_otp", formData);
    const auth_token = response.data.auth_token;

    dispatch({ type: authConstants.VERIFY_SUCCESS, payload: auth_token });
    dispatch(alertActions.page_loader(false));

    history.replace("/");
  } catch (e) {
    const response = e.response.data;
    dispatch({ type: authConstants.VERIFY_FAILURE, payload: response.errors });
    dispatch(alertActions.page_loader(false));
  }
};

function logout() {
  return { type: authConstants.LOGOUT };
}

function update_avatar(payload) {
  return { type: authConstants.UPDATE_AVATAR, payload: payload };
}

function set_address(payload) {
  return { type: authConstants.SET_DEFAULT_ADDRESS, payload: payload };
}

function set_fcm_token(payload) {
  return { type: authConstants.SET_FCM_TOKEN, payload: payload };
}

export default {
  login,
  verify,
  register,
  logout,
  update_avatar,
  set_address,
  set_fcm_token,
};
