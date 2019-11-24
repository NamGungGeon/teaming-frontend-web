import { randStr } from "../utils/utils";
import axios from "axios";

//base
const url= `https://api.tming.kr/v0.1`;

/**
 * @param {string} gender gender is one of [M,f].
 * @param {string} username username is nickname.
 */
export const signup= (email, password, username, gender)=>{
  return axios.request({
    method: 'POST',
    url: `${url}/auth/register`,
    data: {
      user: {
        email, password,
      },
      profile: {
        username, gender
      },
    }
  });
};
/**
 * @param {string} gender gender is one of [M,f].
 * @param {string} username username is nickname.
 */
export const signin= (email, password)=>{
  return axios.request({
    method: 'POST',
    url: `${url}/auth/login`,
    data: {
      email, password,
    }
  });
};
