import axios from "axios";
import {
  USER_DETAILS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
} from "../constants/userConstants";
import { logIn, registerUser } from "../services/services.js";

export const login = (email, password, navigate) => async (dispatch) => {
  try {
    dispatch({ type: USER_LOGIN_REQUEST });
    const { user, token } = await logIn(email, password);
    dispatch({ type: USER_LOGIN_SUCCESS, payload: { user, token } });
    localStorage.setItem("userInfo", JSON.stringify(user));
    localStorage.setItem("token", token);
    navigate("/");
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const register =
  (name, email, password, navigate) => async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const { user, token } = await registerUser(name, email, password);
      dispatch({ type: USER_REGISTER_SUCCESS, payload: { user, token } });
      dispatch({ type: USER_LOGIN_SUCCESS, payload: { user, token } });
      localStorage.setItem("userInfo", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      dispatch({
        type: USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.token}`,
      },
    };
    const { data } = await axios.get(
      `http://localhost:5050/api/users/${id}`,
      config
    );

    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserProfile = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_UPDATE_PROFILE_REQUEST });
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.token}`,
      },
    };
    const { data } = await axios.put(
      `http://localhost:5050/api/users/profile`,
      user,
      config
    );
    const { updatedUser, token } = data;

    dispatch({
      type: USER_UPDATE_PROFILE_SUCCESS,
      payload: { updatedUser, token },
    });
  } catch (error) {
    dispatch({
      type: USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const logout = () => async (dispatch) => {
  localStorage.removeItem("userInfo");
  localStorage.removeItem("token");
  dispatch({ type: USER_LOGOUT });
};
