
//only use for apache
const root = '';

export const getPath = path => {
  if (path.includes(root)) {
    return path;
  }
  return root + path;
};


export const resPath= 'https://res.tming.kr';