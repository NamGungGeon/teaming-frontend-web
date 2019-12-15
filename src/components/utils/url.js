
//only use for apache
import queryString from "query-string";

const root = '';

export const getPath = path => {
  if (path.includes(root)) {
    return path;
  }
  return root + path;
};


export const resPath= 'https://res.tming.kr';

export const urlQuery= (location)=>{
  return queryString.parse(location.search);
};