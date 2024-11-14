import { Router } from 'express';
import * as authControllers from '../controllers/auth.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import validateBody from '../middlewares/validateBody.js';
import { authRegisterSchema, authLoginSchema } from '../validation/auth.js';

const authRouter = Router();

authRouter.post(
  '/register',
  validateBody(authRegisterSchema),
  ctrlWrapper(authControllers.registerUserController),
);
authRouter.post(
  '/login',
  validateBody(authLoginSchema),
  ctrlWrapper(authControllers.loginUserController),
);
authRouter.post(
  '/refresh',
  ctrlWrapper(authControllers.refreshUserSessionController),
);
authRouter.post('/logout', ctrlWrapper(authControllers.logoutUserController));

export default authRouter;
