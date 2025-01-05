import API from "@/config/axiousInstance";
import { LoginData, SignupData } from "@/types/apiRequestTypes";

export const loginRequest = async (data: LoginData) => {
  API.post("/auth/login", data);
};

export const signupRequest = async (data: SignupData) => {
  API.post("/auth/signup", data);
};

export const verifyEmailRequest = async (code: string) => {
  API.get(`/auth/verify/${code}`);
};

export const forgotPasswordRequest = async (email: string) => {
  API.post("/auth/forgot-password", { email });
};

export const verifyPasswordTokenRequest = async (
  token: string,
  newPassword: string
) => {
  API.patch(`/auth/verify-password-token/${token}`, { newPassword });
};

export const logoutRequest = async () => {
  API.get("/auth/logout");
};

export const refreshTokenRequest = async () => {
  API.get("/auth/refresh-token");
};
