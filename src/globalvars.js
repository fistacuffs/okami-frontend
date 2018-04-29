/* Variables required by all components */
import { HOUR } from './constants';

export const globalvars = {
  userId: null,
  username: null,
  userTimeStamp: null,
  userCoinList: null,
  userCoinListPromise: null,
  coinList: null,
  coinListPromise: null,
  currentView: 'LandingPage',
  isLoggedIn: () => {
    if (globalvars.userId === null
      || ((new Date()).getTime() - HOUR > globalvars.userTimeStamp.getTime())) {
      return false;
    } // end if
    return true;
  }, // end isLoggedIn()
}; // end globalvars

export default globalvars;
