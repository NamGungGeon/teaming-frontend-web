
export const formatToMoney = num => {
  if (num === 0) return '0';

  let money = '';
  while (num !== 0) {
    const checker = money.replace(',', '');
    if (checker.length !== 0 && checker.length % 3 === 0) money += ',';
    money += num % 10;
    num = parseInt(num / 10);
  }

  return money
    .split('')
    .reverse()
    .join('');
};

export const formatFromMoney = money => {
  const num = money.replaceAll(',', '');
  return parseInt(num);
};

