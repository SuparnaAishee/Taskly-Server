import jwt, { JwtPayload, Secret } from 'jsonwebtoken';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateToken = (payload: any, secret: Secret, expiresIn: number) => {
  const token = jwt.sign(payload, secret, {
    algorithm: 'HS256',
    expiresIn,
  });

  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelpers = {
  generateToken,
  verifyToken,
};
