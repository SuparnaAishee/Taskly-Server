/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt, { JwtPayload } from 'jsonwebtoken';

import { USER_ROLE} from '../modules/User/User.constant';
import ApiError from '../errors/ApiError';

export const createToken = (
  jwtPayload: {
    _id?: string;
    name: string;
    email: string;
    role: keyof typeof USER_ROLE;
  },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};

export const verifyToken = (
  token: string,
  secret: string,
): JwtPayload | Error => {
  try {
    return jwt.verify(token, secret) as JwtPayload;
  } catch (error: any) {
    throw new ApiError(401, 'You are not authorized!');
  }
};
