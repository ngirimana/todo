  
import express from 'express';
import TodoController from '../controllers/todo.controller';
import checkAuth from '../middleware/checkAuth';


const router = express.Router();


router.post(
	'/create-todo',checkAuth,TodoController.createTodo
);



export default router;
