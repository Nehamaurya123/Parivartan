import Axios from "axios";
import { Config } from "../Config";
import session from "./session";

const API = Axios.create({
  baseURL: Config.API_BASE,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "",
  },
});

API.interceptors.request.use(
  function (config: any) {
    const token = session.getToken();
    if (token && !config.url.endsWith('login')) {
      config.headers["Authorization"] = `Bearer ${token}`;
    } else {
      delete config.headers["Authorization"];
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  function (response: any) {
    if (response.headers.authorization) {
      response.data.token = response.headers.authorization;
    }
    if (response.data.code && response.data.code == 401) {
      session.logout();
      window.location.reload();
    }
    return response.data;
  },
  function (error: any) {
    return Promise.reject(error);
  }
);

export default API;
