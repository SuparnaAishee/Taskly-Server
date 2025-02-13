// User.services.ts
import { IUser } from './User.interface';
import { User } from './User.model';


class UserService {
  // Create a new user
  static async createUser(data: {
    username: string;
    email: string;
    password: string;
    role?: 'user' | 'admin';
  }): Promise<IUser> {
    const { username, email, password, role = 'user' } = data;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create a new user
    const user = new User({
      username,
      email,
      password,
      role,
    });

    await user.save();
    return user;
  }

  // Login a user by email and password
  static async loginUser(
    email: string,
    password: string,
  ): Promise<{ token: string; user: IUser }> {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      throw new Error('User not found');
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new Error('Invalid password');
    }

    // Generate Auth Token
    const token = user.generateAuthToken();
    return { token, user };
  }

  // Get all users (for admin or super admin role)
  static async getAllUsers(): Promise<IUser[]> {
    const users = await User.find();
    return users;
  }

  // Delete a user by ID
  static async deleteUser(userId: string): Promise<IUser | null> {
    const user = await User.findByIdAndDelete(userId);
    return user;
  }

  // Update a user
  static async updateUser(
    userId: string,
    data: Partial<IUser>,
  ): Promise<IUser> {
    const user = await User.findByIdAndUpdate(userId, data, { new: true });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }
}

export { UserService };
