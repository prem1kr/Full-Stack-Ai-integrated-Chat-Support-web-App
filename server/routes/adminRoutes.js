import express, { Router } from 'express';
import { getUsers } from '../controllers/admin.js';
import { isAdmin } from '../controllers/protected.js';

const adminRouter = express.Router();

adminRouter.get('/admin/user', getUsers);
adminRouter.post('/admin/isAdmin', isAdmin);

export default adminRouter;