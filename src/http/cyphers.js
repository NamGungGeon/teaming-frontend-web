import axios from 'axios';
import { getFormData } from './util';
import moment from 'moment';

const url = 'https://dev.cpsp.kr';
const openapi = 'https://api.neople.co.kr';

export const getCharacter = nameEN => {
  return axios.request({
    method: 'GET',
    url: `${url}/characters/`,
    params: {
      nameEN
    }
  });
};

export const cyphersResource = {
  url: 'https://res.cpsp.kr',
  getClearThumbnail: nameEN => {
    return `${cyphersResource.url}/thumbnail/text/${nameEN}.jpg`;
  },
  getCypherThumbnail: nameEN => {
    return `${cyphersResource.url}/thumbnail/none/thum_login_${nameEN}.jpg`;
  },
  getPositionIcon: position => {
    let name = position;
    switch (position) {
      case '근거리딜러':
        name = 'assassin';
        break;
      case '원거리딜러':
        name = 'ad';
        break;
      case '탱커':
        name = 'tanker';
        break;
      case '서포터':
        name = 'supporter';
        break;
      default:
        break;
    }
    return `${cyphersResource.url}/position/${name}.png`;
  },
  getTierIcon: tierName => {
    if (!tierName) return `${cyphersResource.url}/tier/unrank.png`;

    return `${cyphersResource.url}/tier/${tierName.toLowerCase()}.png`;
  },
  getLegacyItemIcon: icoName => {
    if (icoName) {
      return (
        'http://static.cyphers.co.kr/img/item_box/icon_thum/' + icoName + '.png'
      );
    } else {
      return 'http://static.cyphers.co.kr/img/league/icon_nil.jpg';
    }
  }
};
export const openApiRes = {
  getPositionIcon: id => {
    return `https://img-api.neople.co.kr/cy/position-attributes/${id}`;
  },
  getCharacterIcon: id => {
    return `https://img-api.neople.co.kr/cy/characters/${id}`;
  }
};

export const getCharacterPosition = nameKR => {
  return axios.request({
    method: 'GET',
    url: `${url}/positions/analyze.php`,
    params: {
      nameKR
    }
  });
};

const proxy = (target, params) => {
  return axios.request({
    method: 'GET',
    url: `${url}/proxy/`,
    headers: {
      target,
      params
    }
  });
};

export const getPositionDetail = positionId => {
  return proxy(`${openapi}/cy/position-attributes/${positionId}`, '');
};

export const getCypherComments = (nameEN, limit) => {
  return axios.request({
    method: 'GET',
    url: `${url}/characters/comments.php`,
    params: {
      nameEN,
      limit
    }
  });
};
export const getRecommendItems = (nameEN, tier) => {
  return axios.request({
    method: 'GET',
    url: `${url}/statistics/items.php`,
    params: {
      nameEN,
      tier
    }
  });
};
export const getCypherRanker = characterId => {
  return proxy(
    `${openapi}/cy/ranking/characters/${characterId}/winCount`,
    'limit=5'
  );
};
export const createComment = (nameEN, comment) => {
  const formdata = getFormData({ nameEN, comment });
  return axios.request({
    method: 'POST',
    url: `${url}/characters/comments.php`,
    data: formdata
  });
};

export const getAttributes = () => {
  return axios.request({
    method: 'GET',
    url: `${url}/positions/`
  });
};

export const getPlayerId = nickname => {
  return axios.request({
    method: 'GET',
    url: `${url}/players/`,
    params: {
      nickname
    }
  });
};
export const getPlayerInfo = playerId => {
  return proxy(`${openapi}/cy/players/${playerId}`, 'limit=5');
};

export const getPlayerLog = (playerId, gameTypeId) => {
  const format = 'YYYY-MM-DD';
  const current = moment().format(format);
  const ago90days = moment()
    .add(-90, 'days')
    .format(format);

  return proxy(
    `${openapi}/cy/players/${playerId}/matches`,
    `startDate=${ago90days}&endDate=${current}&limit=100&gameTypeId=${gameTypeId}`
  );
};

export const getCharacterRanker = characterId => {
  return proxy(
    `${openapi}/cy/ranking/characters/${characterId}/winCount`,
    'limit=5'
  );
};

export const getPosts = category => {
  return axios.request({
    method: 'GET',
    url: `${url}/posts/`,
    params: {
      category
    }
  });
};
export const getPost = idx => {
  return axios.request({
    method: 'GET',
    url: `${url}/posts/`,
    params: {
      idx
    }
  });
};
export const getPostEvaluate = ref_postId => {
  return axios.request({
    method: 'GET',
    url: `${url}/posts/evaluate.php`,
    params: {
      ref_postId
    }
  });
};
export const evaluatePost = (ref_postId, evaluate) => {
  const formData = new FormData();
  formData.append('ref_postId', ref_postId);
  formData.append('evaluate', evaluate);
  return axios.request({
    method: 'POST',
    url: `${url}/posts/evaluate.php`,
    data: formData
  });
};

export const createErrorLog = (title, description) => {
  const formData = new FormData();
  formData.append('title', title);
  formData.append('description', description);
  formData.append('version', 'user-web');
  return axios.request({
    method: 'POST',
    url: `${url}/posts/`,
    data: formData
  });
};

export const getMatchup = nameKR => {
  return axios.request({
    method: 'GET',
    url: `${url}/statistics/matchup.php`,
    params: {
      nameKR
    }
  });
};
