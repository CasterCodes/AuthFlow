import express, {Router} from 'express';
import {signupUserController} from '../controllers/authController';
import {createSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler} from '../controllers/sessionController';
import {requireUser} from '../middleware/requireUser';
import validateUserRequest from '../middleware/validateUserRequest';
import deserializeUser from '../middleware/deserializeUser';
import {userSignupSchema, userLoginSchema} from '../schema/userSchema';

const router: Router = express.Router();

router.route('/login').post(validateUserRequest(userLoginSchema), createSessionHandler);
router.route('/signup').post(validateUserRequest(userSignupSchema), signupUserController);
router.route('/logout').delete(deserializeUser, requireUser, invalidateUserSessionHandler);
router.route('/sessions').get(deserializeUser, requireUser, getUserSessionsHandler);


export default router;