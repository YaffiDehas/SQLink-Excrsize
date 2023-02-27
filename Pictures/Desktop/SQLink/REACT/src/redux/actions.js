import * as types from "./actionType";
import axios from "axios";

export const loginUser= (user) => ({
  type: types.LOGIN_USER,
  payload: user
});


export const updateToken = (payload) => ({
  type: types.UPDATE_TOKEN,
  payload
});

export const setLoading = (payload) => ({
  type: types.SET_LOADING,
  payload
});

export const setProjects = (payload) => ({
  type: types.SET_PROJECTS,
  payload
})

