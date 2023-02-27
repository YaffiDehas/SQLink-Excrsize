import {
  takeLatest,
  put,
  call,
  fork,
  all
} from "redux-saga/effects";
import {
  updateToken,
  setLoading,
  setProjects
} from "./actions";
import {
  getUserProjectsApi,
  loginUserApi
} from "./api";


import * as types from "./actionType";

function* onUserLoginAsync(action) {
  try {
    yield put(setLoading(true)); 
    const response = yield call(loginUserApi, action.payload);
    if (response.status === 200 || response.status === 201) {
      if (response.data.token) {
        const projects = yield call(getUserProjectsApi, response.data.token);
        yield put(setLoading(false));
        yield put(updateToken(response.data));
        yield put(setProjects(projects));
      }
    }
  } catch (error) {
    yield put(setLoading(false));
    yield put(updateToken(error));
  }
}

export function* onUserLogin(payload) {
  yield takeLatest(types.LOGIN_USER, payload => onUserLoginAsync(payload));
}
const userSagas = [
  fork(onUserLogin)
];

export default function* rootSaga() {
  yield all([...userSagas]);
}
