import mongoose from 'mongoose';
import { ITask } from './Task.interface';
import Task from './Task.model';

class TaskService {
  static async getTasks(userId: string): Promise<ITask[]> {
    return await Task.find({ userId }).exec();
  }

  static async getTaskById(
    taskId: string,
    userId: string,
  ): Promise<ITask | null> {
    return await Task.findOne({ _id: taskId, userId }).exec();
  }

  static async createTask(
    taskData: Partial<ITask>,
    userId: string,
  ): Promise<ITask | null> {
    const task = new Task({
      ...taskData,
      userId: new mongoose.Types.ObjectId(userId),
    });
    return await task.save();
  }

  static async updateTask(
    taskId: string,
    taskData: Partial<ITask>,
    userId: string,
  ): Promise<ITask | null> {
    return await Task.findOneAndUpdate(
      { _id: taskId, userId },
      { $set: taskData },
      { new: true, runValidators: true },
    ).exec();
  }

  static async deleteTask(taskId: string, userId: string): Promise<void> {
    await Task.findOneAndDelete({ _id: taskId, userId }).exec();
  }
}

export default TaskService;
