import axios from "axios";

const url= `http://ddragon.leagueoflegends.com/cdn/10.1.1`;

const champions= null;
export const getChampions= (nameEN)=>{
  if(champions)
    return new Promise((resolve, reject) => {
      resolve(champions);
    });

  return axios.request({
    method: 'GET',
    url: `${url}/data/ko_KR/champion${nameEN? `/${nameEN}`: ''}.json`,
  });
};

export const championSquareImage= (nameEN)=>{
  return `http://ddragon.leagueoflegends.com/cdn/10.1.1/img/champion/${nameEN}.png`;
};
