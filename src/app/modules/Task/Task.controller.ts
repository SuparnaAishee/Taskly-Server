import { Request, Response } from 'express';

import TaskService from './Task.services';
import { catchAsync } from '../../utils/catchAsync';


export const getTasks = catchAsync(async (req: Request, res: Response) => {
  const tasks = await TaskService.getTasks(req.user._id);
  res.status(200).json(tasks);
});

export const getTaskById = catchAsync(async (req: Request, res: Response) => {
  const task = await TaskService.getTaskById(req.params.id, req.user._id);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json(task);
});

export const createTask = catchAsync(async (req: Request, res: Response) => {
  const task = await TaskService.createTask(req.body, req.user._id);
  res.status(201).json(task);
});

export const updateTask = catchAsync(async (req: Request, res: Response) => {
  const task = await TaskService.updateTask(
    req.params.id,
    req.body,
    req.user._id,
  );
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.status(200).json(task);
});

export const deleteTask = catchAsync(async (req: Request, res: Response) => {
  await TaskService.deleteTask(req.params.id, req.user._id);
  res.status(204).send();
});
