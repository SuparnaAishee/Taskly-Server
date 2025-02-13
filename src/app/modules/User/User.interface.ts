// User.interface.ts
import { Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  username: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;

  comparePassword(password: string): Promise<boolean>; // Method for comparing passwords
  generateAuthToken(): string; // Method for generating JWT token
}
