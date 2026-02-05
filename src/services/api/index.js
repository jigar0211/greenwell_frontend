import axios from "./httpRequest";

// region Auth
// ===================== Auth  =====================
export const getAuthUser = () => {
  const url = `auth/user`;
  return axios({ method: "GET", url });
};

export const accountLogin = (data) => {
  const url = `auth/login`;
  return axios({ method: "POST", url, data });
};

export const accountLogout = () => {
  const url = `auth/logout`;
  return axios({ method: "DELETE", url });
};

export const logoutSession = (sessionId, token = null) => {
  const url = `auth/sessions/${sessionId}`;
  const config = { method: "DELETE", url };
  if (token) {
    config.headers = { Authorization: token };
  }
  return axios(config);
};
// end region