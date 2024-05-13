import axiosClient from "../../services/api";

import { LOGIN, REGISTER, SEND_OTP } from "../constants";

export const Signin = async ({ email, password }) => {
  const loginData = { email, password };
  const resp = await axiosClient.post(`${LOGIN}`, loginData);
  const data = resp.data;
  return data;
};

export const SendOtp = async ({ email }) => {
  const otpData = {
    email,
  };
  const response = await axiosClient.post(`${SEND_OTP}`, otpData);
  return response.data;
};

export const Register = async ({
  firstName,
  lastName,
  email,
  password,
  role,
  otp,
}) => {
  const registerData = {
    firstName,
    lastName,
    email,
    password,
    role,
    otp,
  };

  const response = await axiosClient.post(`${REGISTER}`, registerData);
  return response.data;
};
