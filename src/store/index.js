import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import auth from "./auth";
import users from "./users";
import projects from "./projects";
import teams from "./teams";

const reducer = combineReducers({
  auth,
  users,
  projects,
  teams,
});

const store = createStore(reducer, applyMiddleware(thunk, logger));

export default store;

export * from "./auth";
export * from "./users";
export * from "./projects";
export * from "./teams";
