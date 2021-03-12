import * as ActionTypes from "./type";

export const login = (profile, id) => (dispatch) => {
  if (profile && id) {
    dispatch({
      type: ActionTypes.LOG_IN,
      profile,
      id,
    });
  }
};