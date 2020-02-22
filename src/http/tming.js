import { authorized } from '../utils/utils';
import axios from 'axios';
import moment from 'moment';

//base
const baseURL = `${
  process.env.NODE_ENV === 'development'
    ? 'http://localhost:4000'
    : 'https://api.tming.kr'
}`;
// const baseURL = `https://api.tming.kr`;
const version = 'v0.1';

const url = `${baseURL}/${version}`;

export const image = filename =>
  `https://teaming-kr-bucket.s3.ap-northeast-2.amazonaws.com/${process.env.NODE_ENV}/boards/${filename}`;

/**
 * @param {string} gender gender is one of [M,f].
 * @param {string} username username is nickname.
 */
export const signup = (email, password, username, gender) =>
  axios.post(`${url}/auth/register`, {
    user: { email, password },
    profile: { username, gender }
  });

/**
 * @param {string} gender gender is one of [M,f].
 * @param {string} username username is nickname.
 */
export const signin = (email, password) =>
  axios.post(`${url}/auth/login`, { email, password });

export const socialSignUp = (
  provider,
  uid,
  email,
  username,
  gender,
  birthday
) =>
  axios.post(`${url}/auth/register/social`, {
    provider,
    uid,
    email,
    username,
    gender,
    birthday
  });

export const socialSignIn = (provider, uid) =>
  axios.post(`${url}/auth/login/social`, { provider, uid });

export const registerFCM = (fcmToken, auth) =>
  axios.patch(
    `${url}/auth/fcm`,
    { token: fcmToken },
    { headers: { Authorization: `Bearer ${auth.token}` } }
  );

export const getTrashes = () => {
  return axios.request({
    method: 'GET',
    url: `${url}/feelings`
  });
};

export const createTrash = (password, text) => {
  return axios.request({
    method: 'POST',
    url: `${url}/feelings`,
    data: {
      text,
      password
    }
  });
};

export const getTrashComments = id => {
  return axios.request({
    method: 'GET',
    url: `${url}/feelings/${id}/replies`,
    params: {
      limit: 10000
    }
  });
};

export const createTrashComment = (password, id, text) => {
  return axios.request({
    method: 'POST',
    url: `${url}/feelings/${id}/replies`,
    data: {
      text,
      password
    }
  });
};

export const deleteTrashComment = (password, feelId, replyId) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/feelings/${feelId}/replies/${replyId}`,
    headers: {
      'x-modify-code': password
    }
  });
};

export const updateTrashComment = (password, feelId, replyId, text) => {
  return axios.request({
    method: 'PUT',
    url: `${url}/feelings/${feelId}/replies/${replyId}`,
    headers: {
      'x-modify-code': password
    },
    data: {
      text
    }
  });
};

export const getNotices = () => {
  return axios.request({
    method: 'GET',
    url: `${url}/admin/notices`
  });
};

export const getNotice = id => {
  return axios.request({
    method: 'GET',
    url: `${url}/admin/notices/${id}`
  });
};

export const createNotice = (auth, title, text) => {
  const after30 = moment()
    .add(30, 'days')
    .format('YYYY-MM-DD');

  return axios.request({
    method: 'POST',
    url: `${url}/admin/notices`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      title,
      text,
      until: after30
    }
  });
};

export const getEvents = () => {
  return axios.request({
    method: 'GET',
    url: `${url}/admin/events`
  });
};

export const getEvent = id => {
  return axios.request({
    method: 'GET',
    url: `${url}/admin/events/${id}`
  });
};

export const removeNotice = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/admin/notices/${id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`,
      'Content-Type': 'multipart/form-data'
    }
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
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`,
      'Content-Type': 'multipart/form-data'
    },
    data
  });
};

export const removeEvent = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/admin/events/${id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const getMyProfile = auth => {
  return axios.request({
    method: 'GET',
    url: `${url}/me`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const disableProfile = auth => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/me`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const getPostLogs = (auth, limit) => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/boards`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    params: {
      limit
    }
  });
};

export const getCommentLogs = (auth, limit) => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/comments`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    params: {
      limit
    }
  });
};

export const uploadProfileImage = (auth, file) => {
  const data = new FormData();
  data.append('image', file);

  return axios.patch(`${url}/me/picture`, data, {
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`,
      'Content-Type': 'multipart/form-data'
    }
  });
};

export const getBoardPosts = (
  category,
  limit,
  offset,
  searchField,
  search,
  ordering
) => {
  const options = {};
  if (searchField && search) {
    options.searchField = searchField;
    options.search = search;
  }

  return axios.request({
    method: 'GET',
    url: `${url}/boards`,
    params: {
      ordering,
      category: category.toUpperCase(),
      limit,
      offset,
      ...options
    }
  });
};
export const createBoardPosts = (auth, category, title, body, code, media) => {
  if (media) {
    // media 는 무조건 array 임
    //formed data
    const data = new FormData();
    data.append('category', category.toUpperCase());
    data.append('title', title);
    data.append('body', body);

    if (code) {
      data.append('modifyCode', code);
    }

    media.forEach((file, index) => {
      const extension = file.name.split('.').pop();
      data.append('media', file, `${index}.${extension}`);
    });

    return axios.request({
      method: 'POST',
      url: `${url}/boards`,
      'Content-Type': 'multipart/form-data',
      headers: {
        Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
      },
      data
    });
  } else {
    return axios.request({
      method: 'POST',
      url: `${url}/boards`,
      headers: {
        Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
      },
      data: {
        category: category.toUpperCase(),
        title,
        body,
        modifyCode: code
      }
    });
  }
};
export const getBoardPost = id => {
  return axios.request({
    method: 'GET',
    url: `${url}/boards/${id}`
  });
};

export const updateBoardPost = (
  auth,
  id,
  category,
  title,
  body,
  code,
  media
) => {
  if (media) {
    //formed data
    const data = new FormData();
    data.append('category', category.toUpperCase());
    data.append('title', title);
    data.append('body', body);
    data.append('modifyCode', code);

    media.forEach((file, index) => {
      const extension = file.name.split('.').pop();
      data.append('media', file, `${index}.${extension}`);
    });

    return axios.request({
      method: 'PUT',
      url: `${url}/boards/${id}`,
      'Content-Type': 'multipart/form-data',
      headers: {
        Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`,
        'x-modify-code': code ? code : ''
      },
      data
    });
  } else {
    return axios.request({
      method: 'PUT',
      url: `${url}/boards/${id}`,
      headers: {
        Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`,
        'x-modify-code': code ? code : ''
      },
      data: {
        category: category.toUpperCase(),
        title,
        body
      }
    });
  }
};

export const deleteBoardPost = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/boards/${id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const goodToPost = (auth, id) => {
  return axios.request({
    method: 'POST',
    url: `${url}/boards/${id}/likes`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};
export const badToPost = (auth, id) => {
  return axios.request({
    method: 'POST',
    url: `${url}/boards/${id}/dislikes`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const createPostComment = (auth, id, text) => {
  return axios.request({
    method: 'POST',
    url: `${url}/boards/${id}/comments`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      text
    }
  });
};
export const getPostComments = id => {
  return axios.request({
    method: 'GET',
    url: `${url}/boards/${id}/comments`,
    params: {
      limit: 99999
    }
  });
};
export const deletePostComment = (auth, postId, commentId) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/boards/${postId}/comments/${commentId}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};
export const updatePostComment = (auth, postId, commentId, text) => {
  return axios.request({
    method: 'PUT',
    url: `${url}/boards/${postId}/comments/${commentId}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      text
    }
  });
};

export const getFriends = auth => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/friends`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};
export const agreeFriend = (auth, target) => {
  return axios.request({
    method: 'POST',
    url: `${url}/me/friends`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      target
    }
  });
};
export const requestFriend = (auth, target) => {
  return axios.request({
    method: 'POST',
    url: `${url}/me/friendRequests`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      target
    }
  });
};
export const deleteFriend = (auth, relationship_id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/me/friends/${relationship_id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const getBlocks = auth => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/blocks`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    params: {
      limit: 99999
    }
  });
};
export const createBlock = (auth, target) => {
  return axios.request({
    method: 'POST',
    url: `${url}/me/blocks`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      target
    }
  });
};
export const removeBlock = (auth, relationship_id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/me/blocks/${relationship_id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const getNotifications = (auth, limit) => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/notifications`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    params: {
      limit
    }
  });
};
export const readNotification = (auth, id) => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/notifications/${id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};
export const removeNotification = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/me/notifications/${id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

//auth is nullable
export const createCase = (auth, title, text, media, replyEmail) => {
  if (media) {
    const data = new FormData();
    data.append('text', text);
    data.append('title', title);

    if (replyEmail) {
      data.append('replyEmail', replyEmail);
    }

    media.forEach((file, index) => {
      const extension = file.name.split('.').pop();
      data.append('media', file, `${index}.${extension}`);
    });

    return axios.request({
      method: 'POST',
      url: `${url}/complains`,
      headers: {
        Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`,
        'Content-Type': 'multipart/form-data'
      },
      data
    });
  } else {
    return axios.request({
      method: 'POST',
      url: `${url}/complains`,
      headers: {
        Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
      },
      data: {
        text,
        replyEmail
      }
    });
  }
};

//for admin
export const getComplains = auth => {
  return axios.request({
    method: 'GET',
    url: `${url}/complains`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    params: {
      offset: 0,
      limit: 99999
    }
  });
};

//for user
export const getMyComaplins = auth => {
  return axios.request({
    method: 'GET',
    url: `${url}/me/complains`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    params: {
      offset: 0,
      limit: 99999
    }
  });
};

export const replyComplain = (auth, id, text) => {
  return axios.request({
    method: 'POST',
    url: `${url}/complains/${id}/reply`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      text
    }
  });
};

export const updateMyPassword = (auth, oldPassword, newPassword) => {
  return axios.request({
    method: 'PATCH',
    url: `${url}/me/password`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      oldPassword,
      newPassword
    }
  });
};

export const getMessages = auth => {
  return axios.request({
    method: 'GET',
    url: `${url}/messages`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    params: {
      limit: 9999
    }
  });
};

export const getMessage = (auth, id) => {
  return axios.request({
    method: 'GET',
    url: `${url}/messages/${id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const createMessage = (auth, target, text) => {
  return axios.request({
    method: 'POST',
    url: `${url}/messages`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      target,
      text
    }
  });
};

export const deleteMessage = (auth, id) => {
  return axios.request({
    method: 'DELETE',
    url: `${url}/messages/${id}`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    }
  });
};

export const createChatRating = (auth, opponent, rating, detail) => {
  return axios.request({
    method: 'POST',
    url: `${url}/chatRatings`,
    headers: {
      Authorization: `${authorized(auth) ? `Bearer ${auth.token}` : ''}`
    },
    data: {
      opponent,
      rating,
      detail
    }
  });
};
