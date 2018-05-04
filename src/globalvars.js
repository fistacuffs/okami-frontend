/**
 * @file
 * globalvars.js
 * This file contains global variables for the application.
 *
 * @author Nicholas Weitzel
 * @since 1.0.0
 */
import { HOUR } from './constants';

export const globalvars = {
  // master coin list
  coinList: [],

  // information for logged in user
  userId: null,
  username: null,
  userTimeStamp: null,
  userCoinList: [],

  /**
   * isLoggedIn:
   * This function will check if the user's timestamp and userId is valid. If
   * the timestamp has expired, all user information is overwritten with falsey
   * values.
   */
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
