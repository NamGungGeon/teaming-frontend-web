import moment from "moment";

export const checkEmail = email => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

export const randStr = length => {
  let text = '';
  const possible =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const endIdx = length ? length : 10;
  for (let i = 0; i < endIdx; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
};

export const delay = ms => {
  return new Promise((rs, rj) => {
    window.setTimeout(rs, ms);
  });
};

export const updateState = (compoenent, obj) => {
  if (!compoenent.state) compoenent.state = {};

  compoenent.setState({
    ...compoenent.state,
    ...obj
  });
};

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

export const getDays = milliSecond => {
  const ms = Math.abs(milliSecond);
  return parseInt(ms / (1000 * 60 * 60 * 24));
};

export const scrollToBottom = ref => {
  //console.log('scroll go!');
  const { scrollHeight, clientHeight } = ref;
  ref.scrollTop = scrollHeight - clientHeight;
};

export const scrollToTop= ()=>{
  window.scrollTo(0,0);
}

export const isEndScroll = ref => {
  const { scrollHeight, clientHeight } = ref;
  //console.log(`scrollTop: ${ref.scrollTop}`, `subtract: ${scrollHeight-clientHeight}`, `hit: ${ref.scrollTop>= scrollHeight-clientHeight}`);

  return ref.scrollTop >= scrollHeight - clientHeight;
};

export const authorized= auth=>{
 return auth && auth.token && auth.refresh && auth.id;
};

export const randNum= limit=>{
  return parseInt(Math.random()*10000%limit);
};

export const beautifyDate= (stringDateTime)=>{
  return moment(stringDateTime, 'YYYY-MM-DD[T]HH:mm:ss.SSS[Z]').format('YYYY[년]MM[월]DD[일 ]HH[시]mm[분]');
};

export const fuckHTML= (html)=>{
  return html.replace(/(<([^>]+)>)/ig, "");
}