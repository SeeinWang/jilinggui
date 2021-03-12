import * as ActionTypes from "../action/type";

const initialState = {
  loggedIn: false,
};

function userReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.LOG_IN:
      return {
        ...state,
        loggedIn: true,
        id: action.id,
        profile: action.profile,
      };
    default: {
      return state;
    }
  }
}

export default userReducer;
