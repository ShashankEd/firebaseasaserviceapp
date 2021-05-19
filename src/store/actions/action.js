  import {actionTypes} from '../actionTypes'
  /**
 * Action which will store the flag specifying whethere the user is logged in or not
 * @param flag
 */
   export const storeWhetherUserLoggedIn = (loginObj) => {
    return {
      type: actionTypes.IS_LOGGED_IN,
      payload: loginObj,
    };
   };