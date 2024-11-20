import api from "./apiClient";

const authApi = {
  login: (body) => {
    return api.login("/auth/login", body);
  },
};

export default authApi;
