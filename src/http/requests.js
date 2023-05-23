import axios from 'axios';
// import qs from 'qs';
import { useAuthStore } from '../store/auth/auth';
import { apiUrl } from '../configs';

const openRoutes = ['login'];

const regexForOpenRoutes = new RegExp(`^(${openRoutes.join('|').replace(/\*/g,'(.*)')}$)`);

export function isAuthenticatedRoute(route) {
  const routeToEvaluate = new URL(`${window.location.origin}/${route}`).pathname;
  return !regexForOpenRoutes.test(routeToEvaluate);
}

export const $fetchHttp = (params) => {
  let url, method, data;
  if (typeof params === 'string') {
    url = params;
    method = 'GET';
    data = null;
  } else {
    ({ url, method, data } = params);
  }

  let extraHeaders = {};
  const fullUrl = `${apiUrl}/api${url}`;

  if (isAuthenticatedRoute(url)) {
    extraHeaders = {
      ...extraHeaders,
      Authorization: `Bearer ${localStorage.getItem('token') || null}`,
    };
  }
  if (method === 'PUT'){
    extraHeaders = {
      ...extraHeaders,
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    data = new URLSearchParams(data).toString(); 
  }
  return axios({
    method,
    url: fullUrl,
    headers: {
      ...extraHeaders,
    },
    data: data,
  })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      if (error.response && error.response.status == 401) {
        useAuthStore().actionClearLogin();
      }
      throw error;
    });
};