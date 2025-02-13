import { Request, Response, NextFunction } from 'express';
import { authService } from './auth.service';


export const authController = {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, email, password, role } = req.body;
      const user = await authService.register(username, email, password, role);
      res.status(201).json({ message: 'User registered successfully', user });
    } catch (err) {
      next(err);
    }
  },

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const { accessToken, refreshToken, user } = await authService.login(
        email,
        password,
      );
      res.json({ accessToken, refreshToken, user });
    } catch (err) {
      next(err);
    }
  },
};
