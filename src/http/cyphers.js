import axios from "axios";

const url= 'https://dev.cpsp.kr';
export const getCharacter= (nameEN)=>{
  return axios.request({
    method: 'GET',
    url: `${url}/characters/`,
    params: {
      nameEN
    }
  });
};

export const myRes= {
  url: 'https://res.cpsp.kr',
  getClearThumbnail: (nameEN)=>{
    return `${myRes.url}/thumbnail/text/${nameEN}.jpg`;
  },
  getPositionIcon: (position)=>{
    let name= position;
    switch (position) {
      case '근거리딜러':
        name= 'assassin';
        break;
      case '원거리딜러':
        name= 'ad';
        break;
      case '탱커':
        name= 'tanker';
        break;
      case '서포터':
        name= 'supporter';
        break;
    };

    return `${myRes.url}/position/${name}.png`;
  }
};
export const openApiRes= {
  getPositionIcon: (id)=>{
    return `https://img-api.neople.co.kr/cy/position-attributes/${id}`;
  }
};

export const getCharacterPosition= (nameKR)=>{
  return axios.request({
    method: 'GET',
    url: `${url}/positions/analyze.php`,
    params: {
      nameKR
    }
  });
}