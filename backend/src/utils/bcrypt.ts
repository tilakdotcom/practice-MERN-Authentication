import bcrypt from "bcryptjs"


export const passwwordHasher = async (pass:string)=>{
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pass, salt);
}

export const passwordValidator = async (pass:string, hashedPass:string)=>{
  return await bcrypt.compare(pass, hashedPass);
}