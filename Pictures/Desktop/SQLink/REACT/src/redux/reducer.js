import * as types from "./actionType";
const initialState = {
  projects: [],
  user: {},
  loading: false,
};

const usersReducers = (state = initialState, action) => {
  switch (action.type) {
    case types.UPDATE_TOKEN: 
      return {
        ...state,
        user: action.payload
      };
    case types.SET_LOADING:
      return {
        ...state,
        loading: action.payload
      };
      case types.SET_PROJECTS:
        return {
          ...state,
          projects: action.payload
        };
    default:
      return state;
  }
};

export default usersReducers;
