//only use for apache
import queryString from 'query-string';

export const resPath = 'https://res.tming.kr';

export const urlQuery = location => {
  return queryString.parse(location.search);
};
