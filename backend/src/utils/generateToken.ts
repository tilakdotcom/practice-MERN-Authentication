import jwt from "jsonwebtoken";

interface user {
  id: string;
  email?: string;
  name?: string;
}

const generateToken = (
  { email, id, name }: user,

  secret: string,
  expire: string
) => {
  console.log("generating token: " + name + id + email + expire + secret);
  return jwt.sign(
    {
      id,
      name,
      email,
    },
    secret,
    { expiresIn: expire }
  );
};

export default generateToken;
