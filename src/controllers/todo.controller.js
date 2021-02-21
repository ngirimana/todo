import {errorResponse,successResponse} from '../helpers/response';
import TodoService from '../services/todo.service';
import TokenUtil from '../helpers/token';

/**
 * Auth controller Class
 */
class TodoController {
	
	/**
	 * 
	 * @param {object} req 
	 * @param {object} res 
	 */

	static async createTodo(req, res) {
		const userId =parseInt(TokenUtil.userIdFromToken(req.header('Authorization')),10);
		try {
			const todoData = {
				title :req.body.title,
				description: req.body.description,
				priority:req.body.priority,
				userId
				
			};
			const todo = await TodoService.createTodo(todoData);
			return successResponse(res,201, 'Todo created successfully',todo );
			
		} catch (error) {
			errorResponse(res,500,error);
		}
	}
}
export default TodoController;
