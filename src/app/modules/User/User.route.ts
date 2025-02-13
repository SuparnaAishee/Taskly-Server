// src/routes/user.routes.ts
import express from 'express';
import { UserController } from './User.controller';



const router = express.Router();

// Public routes
router.post('/create', UserController.createUser);
router.post('/login', UserController.loginUser);

// Protected routes (middleware added to protect these routes)
router.get('/users', UserController.getAllUsers); 
router.delete('/users/:userId', UserController.deleteUser); 
router.put('/users/:userId', UserController.updateUser); 

export const userRoutes=router;
