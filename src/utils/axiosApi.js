import axios from 'axios';

const baseUrl = 'https://enigmatic-reef-71098.herokuapp.com';
// const baseUrl = 'http://127.0.0.1:3005';

function toHeader(token) {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
}

const userRequest = axios.create({
  baseURL: `${baseUrl}/user`,
});

const postRequest = axios.create({
  baseURL: `${baseUrl}/post`,
});

const postsRequest = axios.create({
  baseURL: `${baseUrl}/posts`,
});

export const apiUser = {
  signIn: (data) => userRequest.post('/sign_in', data),
  signUp: (data) => userRequest.post('/sign_up', data),
  check: (token) => userRequest.get('', toHeader(token)),
  updateProfile: (data, token) =>
    userRequest.patch('/profile', data, toHeader(token)),
  updatePassword: (data, token) =>
    userRequest.patch('/profile/pwd', data, toHeader(token)),
  getProfile: (id, token) => userRequest.get(`/profile/${id}`, toHeader(token)),
};

export const apiPost = {
  getAll: (filter = '', token) =>
    postsRequest.get(`/?${filter}`, toHeader(token)),
  upload: (data, token) => postRequest.post('', data, toHeader(token)),
  message: (id, data, token) =>
    postRequest.post(`/${id}`, data, toHeader(token)),
  like: (id, token) => postRequest.get(`/like/${id}`, toHeader(token)),
  update: (id, data, token) =>
    postRequest.patch(`/${id}`, data, toHeader(token)),
};
