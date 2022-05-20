import axios from 'axios';

// const baseUrl = 'https://enigmatic-reef-71098.herokuapp.com';
const baseUrl = 'http://127.0.0.1:3005';

const usersRequest = axios.create({
  baseURL: `${baseUrl}/users`,
});

const postsRequest = axios.create({
  baseURL: `${baseUrl}/posts`,
});

function getToken() {
  return {
    headers: {
      Authorization: localStorage.getItem('metaWall'),
    },
  };
}

export const checkToken = () => {
  localStorage.getItem('metaWall') ? true : false;
};

export const apiUser = {
  signIn: (data) => usersRequest.post('/sign-in', data),
  signUp: (data) => usersRequest.post('/sign-up', data),
  check: () => usersRequest.get('/check', getToken()),
  updateProfile: (data) => usersRequest.patch('/profile', data, getToken()),
  updatePassword: (data) =>
    usersRequest.patch('/profile/pwd', data, getToken()),
  getProfile: (id) => usersRequest.get(`/profile/${id}`, getToken()),
};

export const apiPost = {
  getAll: (filter = '') => postsRequest.get(`/?${filter}`, getToken()),
  upload: (data) => postsRequest.post('', data, getToken()),
  comment: (id, data) => postsRequest.post(`/${id}`, data, getToken()),
  like: (id) => postsRequest.get(`/like/${id}`, getToken()),
  update: (id, data) => postsRequest.patch(`/${id}`, data, getToken()),
};
