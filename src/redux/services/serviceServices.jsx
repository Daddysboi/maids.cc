import axiosClient from "../../services/api";

import { MAID_SERVICES, SERVICES } from "../constants";

export const GetAllServices = async () => {
  const res = await axiosClient.get(`${SERVICES}`);
  return res.data;
};

export const GetMaidServices = async (id) => {
  const res = await axiosClient.get(`${MAID_SERVICES}/${id}`);
  return res.data;
};

export const AssignMaid = async (data) => {
  const res = await axiosClient.post(`${MAID_SERVICES}`, data);
  return res.data;
};

export const CreateEditService = async (data, editing) => {
  if (editing) {
    const res = await axiosClient.put(`${SERVICES}`, data);
    return res.data;
  }
  const res = await axiosClient.post(`${SERVICES}`, data);
  return res.data;
};

export const DeleteAllServices = async () => {
  const res = await axiosClient.delete(`${SERVICES}`);
  return res.data;
};
