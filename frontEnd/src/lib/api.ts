import API from "@/config/axiousInstance";



interface LoginData {
  email: string;
  password: string;
}

export const loginRequest = async (data: LoginData)=>{
  API.post("/auth/login", data)
}