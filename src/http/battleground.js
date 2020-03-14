export const battlegroundResource = {
  url: 'https://res.tming.kr/battleground',
  tierImage: tier => {
    return `${battlegroundResource.url}/tier/${tier}.png`;
  }
};
