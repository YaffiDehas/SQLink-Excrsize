import axios from "axios";

export const getUserProjectsApi = async (token) =>
  await axios.get(`http://localhost:52892/api/user/get?token=${token}`);

export const loginUserApi = async (user) =>
  await axios.post(`http://localhost:52892/api/user/get`, user);