// User.interface.ts
import { Document, Model } from 'mongoose';

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
};

export interface IUserModel extends Model<IUser> {
  isUserExistsByEmail(id: string): Promise<IUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTimestamp: Date,
    jwtIssuedTimestamp: number,
  ): boolean;
}