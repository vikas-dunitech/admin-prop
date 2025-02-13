import axios from "axios";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export const requests = {
  get: (url: string, config?: any) => axios.get(url, config),
  post: (url: string, body: {}, config?: any) => axios.post(url, body, config),
  put: (url: string, body: {}, config?: any) => axios.put(url, body, config),
  patch: (url: string, body: {}, config?: any) =>
    axios.patch(url, body, config),
  delete: (url: string, config?: any) => axios.delete(url, config),
};

const apiConstants = {
    apiEndPoint: apiBaseUrl,
    auth: apiBaseUrl + "/auth",
}

export const publicRequestUrls = {
    // Public
    login: apiConstants.auth + "/login",
}