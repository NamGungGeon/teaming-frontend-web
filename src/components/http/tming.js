import { randStr } from '../utils/utils';
import axios from 'axios';

//base
const url = 'https://api.tming.kr/v0.1';

/**
 * @param {string} gender gender is one of [M,f].
 * @param {string} username username is nickname.
 */
export const signup = (email, password, username, gender) => {
  return axios.request({
    method: 'POST',
    url: `${url}/auth/register`,
    data: {
      user: {
        email,
        password
      },
      profile: {
        username,
        gender
      }
    }
  });
};
/**
 * @param {string} gender gender is one of [M,f].
 * @param {string} username username is nickname.
 */
export const signin = (email, password) => {
  return axios.request({
    method: 'POST',
    url: `${url}/auth/login`,
    data: {
      email,
      password
    }
  });
};

export const getTrashes = auth => {
  return axios.request({
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + auth.token
    },
    url: `${url}/feelings`
  });
};

export const createTrash = (auth, text) => {
  return axios.request({
    method: 'POST',
    url: `${url}/feelings`,
    headers: {
      Authorization: 'Bearer ' + auth.token
    },
    data: {
      text
    }
  });
};
export const getTrashComments = (auth, id) => {
  return axios.request({
    method: 'GET',
    url: `${url}/feelings/${id}/replies`,
    headers: {
      Authorization: 'Bearer ' + auth.token
    },
    params: {
      limit: 10000
    }
  });
};
export const createTrashComment = (auth, id, text) => {
  return axios.request({
    method: 'POST',
    url: `${url}/feelings/${id}/replies`,
    headers: {
      Authorization: 'Bearer ' + auth.token
    },
    data: {
      text
    }
  });
};
export const deleteTrashComment = (auth, feelId, replyId) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/feelings/${feelId}/replies/${replyId}`,
    headers: {
      Authorization: 'Bearer ' + auth.token
    }
  });
};
