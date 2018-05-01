/* Variables required by all components */
import { HOUR } from './constants';

export const globalvars = {
  userId: null,
  username: null,
  userTimeStamp: null,
  userCoinList: [],
  coinList: [],
  isLoggedIn: () => {
    const now = new Date();
    if (globalvars.userTimeStamp
      && now.getTime() - HOUR > globalvars.userTimeStamp) {
      globalvars.userId = null;
      globalvars.username = null;
      globalvars.userTimeStamp = null;
      globalvars.userCoinList = [];
    } // end if
    if (globalvars.userId === null) {
      return false;
    } // end if
    return true;
  }, // end isLoggedIn()
}; // end globalvars

export default globalvars;
