import axios from "axios";
import jwtDecode from "jwt-decode";
import { tokenName } from "config.json";

setJwt();

export function setJwt() {
  axios.defaults.headers.common["x-auth-token"] = getJwt();
}

export function login(jwt) {
  localStorage.setItem(tokenName, jwt);
}

export function logout() {
  localStorage.removeItem(tokenName);
}

export function getCurrentUser() {
  try {
    return jwtDecode(localStorage.getItem(tokenName)).data;
  } catch (error) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(tokenName);
}

export default {
  setJwt,
  login,
  logout,
  getCurrentUser,
  getJwt
};
