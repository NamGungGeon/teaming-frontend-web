//axios extention
// param e is passed argument from catch in axios.catch(e=>{})
export const responseCode = e => {
  try {
    return e.response.response;
  } catch (e) {
    return 0;
  }
};
export const errMsg = e => {
  try {
    return e.response.data.detail;
  } catch (e) {
    return e.toString();
  }
};

export const getFormData = object => {
  let formdata = new FormData();
  Object.keys(object).map(key => {
    formdata.append(key, object[key]);
  });

  return formdata;
};
