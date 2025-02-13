import express from 'express';
import { userRoutes } from '../modules/User/User.route';
import { authRoutes } from '../modules/Auth/auth.route';


const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: userRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
