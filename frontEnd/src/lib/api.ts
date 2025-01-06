import API from "@/config/axiousInstance";
import { LoginData, SignupData } from "@/types/apiRequestTypes";
import { errorToast } from "./toast";

export const loginRequest = async (data: LoginData) => {
  return API.post("/auth/login", data);
};

export const signupRequest = async (data: SignupData) => {
  return API.post("/auth/signup", data);
};

export const verifyEmailRequest = async (code: string) => {
  try {
    const response = await API.get(`/auth/verify/${code}`);
    if (response.status === 401) {
      errorToast("Verification expired");
      return;
    }
    return response.data;
  } catch (error) {
    console.log("Verification expired", error);
    errorToast("Verification expiredd");
    return;
  }
};

export const forgotPasswordRequest = async (email: string) => {
  return API.post("/auth/forgot-password", { email });
};

export const verifyPasswordTokenRequest = async (
  token: string,
  newPassword: string
) => {
  return API.patch(`/auth/verify-password-token/${token}`, { newPassword });
};

export const logoutRequest = async () => {
  return API.get("/auth/logout");
};

export const refreshTokenRequest = async () => {
  return API.get("/auth/refresh-token");
};
