import API from "@/config/axiousInstance";



interface LoginData {
  username: string;
  password: string;
}

export const loginRequest = async (data: LoginData)=>{
  API.post("/api/login", data)
}