import axios from "axios";

const http = axios.create({
  timeout: 60 * 1000,
  withCredentials: true,
});

const catchError = (error) => {
  if (error && (error.status === 401 || (error.data || {}).code === 401)) {
    console.error(`认证失败...`);
  }
  return Promise.reject(error);
};

http.interceptors.request.use((config) => {
  return config;
}, catchError);

http.interceptors.response.use((resp) => {
  const data = resp.data || {};
  if (resp.status !== 200) {
    return catchError(resp);
  }
  return data;
}, catchError);

const wr = (urlStr) => {
  const now = Date.now();
  if (/\\?\S+?=/.test(urlStr)) {
    return `${urlStr}&_t=${now}`;
  }
  return `${urlStr}?_t=${now}`;
};

const post = (url, data, params) => {
  return http.post(wr(url), data, { params });
};

const put = (url, data, params) => {
  return http.put(wr(url), data, { params });
};

const get = (url, params) => {
  return http.get(wr(url), { params });
};

const del = (url, config) => {
  return http.delete(wr(url), config);
};

const patch = (url, data, params) => {
  return http.patch(wr(url), data, { params });
};

export default {
  post,
  get,
  put,
  del,
  patch,
};
