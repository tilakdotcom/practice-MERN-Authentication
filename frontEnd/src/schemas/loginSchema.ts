import { z } from "zod";


const email = z.string().min(6, {
  message: "Username must be at least 6 characters.",
});
const password = z.string().min(6, {
  message: "Password must be at least 6 characters.",
});

export const LoginSchma = z.object({
  email: email,
  password: password,
});