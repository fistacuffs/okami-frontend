/* Backend URL and routes */
export const backendUrl = 'http://localhost:8080/';
/* export const backendUrl = 'https://mighty-fortress-28903.herokuapp.com/'; */
export const coinListRoute = 'coinlist';
export const loginRoute = 'login';
export const registrationRoute = 'register';
export const userCoinsRoute = 'user/coins';
export const addUserCoinRoute = 'user/addcoin/';
export const removeUserCoinRoute = 'user/removecoin/';

/* Crypto-compare API URL and routes */
export const ccApiUrl = 'https://min-api.cryptocompare.com/data/';
export const priceRoute = 'price';
export const dailyHistoryRoute = 'histoday';
export const multiplePriceRoute = 'pricemulti';

/* time constants */
export const HOUR = 3600000;
export const WEEK = 7;
export const MONTH = 30;
export const YEAR = 365;

/* view constants */
export const viewEnum = {
  LANDINGPAGE: 1,
  LOGINPAGE: 2,
  REGISTRATIONPAGE: 3,
  COINPAGE: 4,
};
