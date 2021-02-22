  
import express from 'express';
import TodoController from '../controllers/todo.controller';
import checkAuth from '../middleware/checkAuth';


const router = express.Router();


router.post(
	'/create-todo',checkAuth,TodoController.createTodo
);
router.get(
	'/todos',checkAuth,TodoController.findAllTodos
);
router.get(
	'/todo/:todoId',checkAuth,TodoController.findSingleTodo
);



export default router;
