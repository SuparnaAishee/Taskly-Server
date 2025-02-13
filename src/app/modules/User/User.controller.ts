// User.controller.ts
import { Request, Response } from 'express';
import { UserService } from './User.services';
import { IUser } from './User.interface';
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema,
} from './User.validation';
import { z } from 'zod';

// Create a new user
const createUser = async (req: Request, res: Response) => {
  try {
    const validatedData = createUserSchema.parse(req.body);
    const { username, email, password, role } = validatedData;

    const user: IUser = await UserService.createUser({
      username,
      email,
      password,
      role,
    });
    res.status(201).json({
      success: true,
      message: 'User created successfully',
      data: { username: user.username, email: user.email, role: user.role },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: error.errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login a user
const loginUser = async (req: Request, res: Response) => {
  try {
    const validatedData = loginUserSchema.parse(req.body);
    const { email, password } = validatedData;

    const { token, user } = await UserService.loginUser(email, password);
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: { username: user.username, email: user.email, role: user.role },
      },
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error :any) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: error.errors });
    }
    res.status(401).json({ success: false, message: error.message });
  }
};

// Get all users
const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users: IUser[] = await UserService.getAllUsers();
    res.status(200).json({
      success: true,
      message: 'Users retrieved successfully',
      data: users,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a user
const deleteUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedUser: IUser | null = await UserService.deleteUser(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: 'User not found' });
    }

    res.status(200).json({
      success: true,
      message: 'User deleted successfully',
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error:any) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update user
const updateUser = async (req: Request, res: Response) => {
  try {
    const validatedData = updateUserSchema.parse(req.body);
    const user: IUser = await UserService.updateUser(
      req.user.userId,
      validatedData,
    );

    res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: { username: user.username, email: user.email, role: user.role },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ success: false, message: error.errors });
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

export const UserController = {
  createUser,
  loginUser,
  updateUser,
  getAllUsers,
  deleteUser,
};
