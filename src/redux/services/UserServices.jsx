import axiosClient from "../../services/api";
import axios from "axios";
import {
  UPDATE_USER_PROFILE,
  CHANGE_PASSWORD,
  CLIENTS,
  MAIDS,
  USERS,
  RECORDS,
} from "../constants";

export const GetUserById = async (userId) => {
  const id = JSON.parse(userId);
  // console.log(id);

  // Created this so that i can later pass roles into the url for processing requests
  // var url = "users";
  // switch (user.role) {
  //   case "maids":
  //     url = "MAIDS";
  //     break;
  //   case "clients":
  //     url = "CLIENTS";
  //     break;
  //   case "admin":
  //     url = "users";
  //     break;
  // }

  const response = await axios.get(`https://reqres.in/api/users/${id}`);
  return response.data;
};

export const UpdateUserProfile = async ({
  userId,
  firstName,
  lastName,
  phoneNumber,
  profilePicture,
}) => {
  const data = { userId, firstName, lastName, phoneNumber, profilePicture };
  const response = await axiosClient.patch(`${UPDATE_USER_PROFILE}`, data);
  return response.data;
};

export const UpdatePassword = async ({ userId, oldPassword, newPassword }) => {
  const details = { userId, oldPassword, newPassword };
  const response = await axiosClient.patch(`${CHANGE_PASSWORD}`, details);
  return response.data;
};

//create user
export const CreateUser = async (user, editing) => {
  if (editing) {
    if (user.role == "maid") {
      const res = await axiosClient.put(`${MAIDS}/${user.maidId}`, user);
      return res.data;
    } else {
      const res = await axiosClient.put(`${CLIENTS}/${user.clientId}`, user);
      return res.data;
    }
  }
  console.log(user);

  const res = await axiosClient.post(`${USERS}`, user);

  return res.data;
};

export const GetMaidById = async (id) => {
  const res = await axiosClient.get(`${CLIENTS}/${id}`);
  return res.data;
};

export const GetClientById = async (id) => {
  const res = await axiosClient.get(`${MAIDS}/${id}`);
  return res.data;
};

export const GetMaidRecords = async () => {
  const res = await axiosClient.get(`${CLIENTS}/${RECORDS}`);
  return res.data;
};

export const GetClientRecords = async () => {
  const res = await axiosClient.get(`${MAIDS}/${RECORDS}`);
  return res.data;
};

export const GetAllMaids = async (page) => {
  const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return res.data;
};

export const GetAllClients = async (page) => {
  const res = await axios.get(`https://reqres.in/api/users?page=${page}`);
  return res.data;
};

export const DeleteClient = async (id) => {
  const res = await axiosClient.delete(`${MAIDS}/${id}`);
  return res.data;
};

export const DeleteMaid = async (id) => {
  const res = await axiosClient.delete(`${CLIENTS}/${id}`);
  return res.data;
};
