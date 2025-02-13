import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Secret } from 'jsonwebtoken';

import config from '../../config';
import User from './auth.model';


export const authService = {
  // Register User
  async register(
    username: string,
    email: string,
    password: string,
    role: 'user' | 'admin',
  ) {
    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('User already exists');

    const user = new User({ username, email, password, role });
    await user.save();
    return user;
  },

  // Login User
  async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const accessToken = jwt.sign(
      { id: user.id, role: user.role },
      config.jwt.jwt_access_secret as Secret,
      {
        expiresIn: '1h',
      },
    );

    const refreshToken = jwt.sign(
      { id: user.id },
      config.jwt.refresh_token_secret as Secret,
      {
        expiresIn: '7d',
      },
    );

    return { accessToken, refreshToken, user };
  },

  // Verify Token
  verifyToken(token: string) {
    return jwt.verify(token, config.jwt.jwt_access_secret as Secret);
  },
};
