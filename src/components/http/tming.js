import { randStr } from "../utils/utils";
import axios from "axios";
import moment from "moment";

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

export const getNotices= ()=>{
  return axios.request({
    method: 'GET',
    url: `${url}/admin/notices`,
  });
};
export const getNotice= (id)=>{
  return axios.request({
    method: 'GET',
    url: `${url}/admin/notices/${id}`,
  });
};
export const createNotice= (auth, title, text)=>{
  const after30= moment().add(30, 'days').format("YYYY-MM-DD");

  return axios.request({
    method: 'POST',
    url: `${url}/admin/notices`,
    headers: {
      Authorization: 'Bearer '+ auth.token,
    },
    data: {
      title, text, until: after30,
    }
  });
};
export const getEvents= ()=>{
  return axios.request({
    method: 'GET',
    url: `${url}/admin/events`,
  });
};
export const getEvent= (id)=>{
  return axios.request({
    method: 'GET',
    url: `${url}/admin/events/${id}`,
  });
};
export const removeNotice= (auth, id)=>{
  return axios.request({
    method: 'DELETE',
    url: `${url}/admin/notices/${id}`,
    headers: {
      Authorization: 'Bearer '+ auth.token,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const createEvent= (auth, title, text, banner, startDate, endDate)=>{
  const data= new FormData();
  data.append('title', title);
  data.append('text', text);
  data.append('banner', banner);
  data.append('startDate', startDate);
  data.append('endDate', endDate);

  return axios.request({
    method: 'POST',
    url: `${url}/admin/events`,
    headers: {
      Authorization: 'Bearer '+ auth.token,
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};
export const removeEvent= (auth, id)=>{
  return axios.request({
    method: 'DELETE',
    url: `${url}/admin/events/${id}`,
    headers: {
      Authorization: 'Bearer '+ auth.token,
    },
  });
}

export const getMyProfile= (auth)=>{
  return axios.request({
    method: 'GET',
    url: `${url}/me`,
    headers: {
      Authorization: 'Bearer '+ auth.token,
    },
  });
};
export const uploadProfileImage= (auth, file)=>{
  const formdata = new FormData();
  formdata.append('image', file);

  return axios.patch(`${url}/me/picture`, formdata, {
    headers: {
      Authorization: 'Bearer '+ auth.token,
      'Content-Type': 'multipart/form-data',
    }
  })
};
