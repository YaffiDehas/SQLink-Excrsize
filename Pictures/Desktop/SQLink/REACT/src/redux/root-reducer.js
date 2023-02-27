import { combineReducers } from "redux";
import usersReducers from "./reducer";
import projectReducer from "./projects";

const rootReducer = combineReducers({
  user: usersReducers,
  projects: projectReducer
});

export default rootReducer;
