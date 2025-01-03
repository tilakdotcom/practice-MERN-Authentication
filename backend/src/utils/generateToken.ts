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
