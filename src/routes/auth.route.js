  
import express from 'express';
import UsersController from '../controllers/auth.controller';
import signUpValidation from '../middleware/user.validation';
import checkUserExists from "../middleware/checkUserExist"

const router = express.Router();


router.post(
	'/signup',
	signUpValidation,
	checkUserExists,
	UsersController.signup
);
router.post('/signin',UsersController.login);

export default router;
