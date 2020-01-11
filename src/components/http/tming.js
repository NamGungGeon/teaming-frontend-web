import {randStr} from "../utils/utils";
import axios from "axios";
import moment from "moment";

//base
const url = 'https://api.tming.kr/v0.1';

export const image = (filename) => {
  return `https://teaming-kr-bucket.s3.ap-northeast-2.amazonaws.com/production/boards/${filename}`;
};
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

export const getNotices = () => {
  return axios.request({
    method: 'GET',
    url: `${url}/admin/notices`,
  });
};
export const getNotice = (id) => {
  return axios.request({
    method: 'GET',
    url: `${url}/admin/notices/${id}`,
  });
};
export const createNotice = (auth, title, text) => {
  const after30 = moment().add(30, 'days').format("YYYY-MM-DD");

  return axios.request({
    method: 'POST',
    url: `${url}/admin/notices`,
    headers: {
      Authorization: 'Bearer ' + auth.token,
    },
    data: {
      title, text, until: after30,
    }
  });
};
export const getEvents = () => {
  return axios.request({
    method: 'GET',
    url: `${url}/admin/events`,
  });
};
export const getEvent = (id) => {
  return axios.request({
    method: 'GET',
    url: `${url}/admin/events/${id}`,
  });
};
export const removeNotice = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/admin/notices/${id}`,
    headers: {
      Authorization: 'Bearer ' + auth.token,
      'Content-Type': 'multipart/form-data',
    },
  });
};
export const createEvent = (auth, title, text, banner, startDate, endDate) => {
  const data = new FormData();
  data.append('title', title);
  data.append('text', text);
  data.append('banner', banner);
  data.append('startDate', startDate);
  data.append('endDate', endDate);

  return axios.request({
    method: 'POST',
    url: `${url}/admin/events`,
    headers: {
      Authorization: 'Bearer ' + auth.token,
      'Content-Type': 'multipart/form-data',
    },
    data,
  });
};
export const removeEvent = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/admin/events/${id}`,
    headers: {
      Authorization: 'Bearer ' + auth.token,
    },
  });
}

export const getMyProfile = (auth) => {
  return axios.request({
    method: 'GET',
    url: `${url}/me`,
    headers: {
      Authorization: 'Bearer ' + auth.token,
    },
  });
};
export const uploadProfileImage = (auth, file) => {
  const formdata = new FormData();
  formdata.append('image', file);

  return axios.patch(`${url}/me/picture`, formdata, {
    headers: {
      Authorization: 'Bearer ' + auth.token,
      'Content-Type': 'multipart/form-data',
    }
  });
};

const isValidCategory = (category) => {
  const validCategory = ["GENERAL", "ANONYMOUS", "LOL", "OVERWATCH", "PUBG"];
  return validCategory.includes(category.toUpperCase());
}

export const getBoardPosts = (category, anonymous, limit, offset) => {
  //filter
  isValidCategory(category);

  return axios.request({
    method: 'GET',
    url: `${url}/boards`,
    params: {
      category: category.toUpperCase()
      , anonymous, limit, offset,
    }
  });
};
export const createBoardPosts = (auth, category, title, body, code, media) => {
  isValidCategory(category);

  if (media) {
    //formed data
    const data = new FormData();
    data.append("category", category.toUpperCase());
    data.append("title", title);
    data.append("body", body);
    if(code)
      data.append("modifyCode", code);
    media.map(file=>{
      data.append("media", file);
    });
    return axios.request({
      method: 'POST',
      url: `${url}/boards`,
      'Content-Type': 'multipart/form-data',
      headers: {
        Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
      },
      data
    });
  } else {
    return axios.request({
      method: 'POST',
      url: `${url}/boards`,
      headers: {
        Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
      },
      data: {
        category: category.toUpperCase(),
        title, body, modifyCode: code
      }
    });
  }
};
export const getBoardPost = (id) => {
  return axios.request({
    method: 'GET',
    url: `${url}/boards/${id}`,
  });
};

export const updateBoardPost = (auth, id, category, title, body, code, media) => {
  isValidCategory(category);
  if (media) {
    //formed data
    const data = new FormData();
    data.append("category", category.toUpperCase());
    data.append("title", title);
    data.append("body", body);
    console.log(media);
    media.map(file=>{
      data.append("media", file);
    });
    return axios.request({
      method: 'PUT',
      url: `${url}/boards/${id}`,
      'Content-Type': 'multipart/form-data',
      headers: {
        Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
        'x-modify-code': code ? code : '',
      },
      data
    });
  }else{
    return axios.request({
      method: 'PUT',
      url: `${url}/boards/${id}`,
      headers: {
        Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
        'x-modify-code': code ? code : '',
      },
      data: {
        category: category.toUpperCase(),
        title, body,
      }
    });
  }
};

export const deleteBoardPost = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/boards/${id}`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
  });
};

export const createPostComment = (auth, id, text) => {
  return axios.request({
    method: 'POST',
    url: `${url}/boards/${id}/comments`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
    data: {
      text,
    }
  });
};
export const getPostComments = (id) => {
  return axios.request({
    method: 'GET',
    url: `${url}/boards/${id}/comments`,
    params: {
      limit: 99999,
    }
  });
};
export const deletePostComment = (auth, postId, commentId) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/boards/${postId}/comments/${commentId}`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
  });
};
export const updatePostComment = (auth, postId, commentId, text) => {
  return axios.request({
    method: 'PUT',
    url: `${url}/boards/${postId}/comments/${commentId}`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
    data: {
      text
    }
  });
};

export const getFriends = (auth) => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/friends`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    }
  });
};
export const requestFriend = (auth, target) => {
  return axios.request({
    method: 'POST',
    url: `${url}/me/friendRequests`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
    data: {
      target,
    }
  });
};
export const deleteFriend = (auth, relationship_id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/me/friends`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
    data: {
      relationship_id
    }
  });
};

export const getBlocks = (auth) => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/blocks`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
    params: {
      limit: 99999,
    }
  });
};
export const createBlock = (auth, id) => {
  return axios.request({
    method: 'POST',
    url: `${url}/me/blocks`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
    data: {
      id,
    }
  });
};

export const getNotifications = (auth, limit) => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/notifications`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    },
    data: {
      limit,
    }
  });
};
export const removeNotification = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/me/notifications/${id}`,
    headers: {
      Authorization: `${auth ? `Bearer ${auth.token}` : ''}`,
    }
  });
};