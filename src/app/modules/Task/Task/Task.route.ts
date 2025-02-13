import { Router } from 'express';
import {
  createTask,
  deleteTask,
  getTasks,
  getTaskById,
  updateTask,
} from './Task.controller';
import { createTaskSchema, updateTaskSchema } from './Task.validation';
import auth from '../../middlewares/auth';
import validateRequest from '../../middlewares/validateRequest';
import { USER_ROLE } from '../User/User.constant';

const router = Router();

router.get('/', auth(), getTasks);
router.get('/:id', auth(), getTaskById);
router.post('/', auth(USER_ROLE.user,USER_ROLE.admin), validateRequest(createTaskSchema), createTask);
router.put('/:id', auth(), validateRequest(updateTaskSchema), updateTask);
router.delete('/:id', auth(), deleteTask);

export const taskRoutes = router;
