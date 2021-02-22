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
	 *  @returns {object} server response
	 */

	static async createTodo(req, res) {
		const userId =parseInt(TokenUtil.userIdFromToken(req.header('Authorization')),10);
		try {
			const todoData = {
				title :req.body.title,
				description: req.body.description,
				priority:req.body.priority,
				user_id:userId
				
			};
			const todo = await TodoService.createTodo(todoData);
			return successResponse(res,201, 'Todo created successfully',todo );
			
		} catch (error) {
			errorResponse(res,500,error);
		}
	}
	/**
	 * 
	 * @param {object} req 
	 * @param {object} res 
	 *  @returns {object} server response
	 */

	static async findAllTodos(req,res){
		const userInfo =parseInt(TokenUtil.userIdFromToken(req.header('Authorization')),10);
		try{
			const allTodos= await TodoService.findAllTodos({user_id:userInfo});
			if(allTodos){
				return successResponse(res,200, 'Todos are retrieved successfully',allTodos );
			}
			errorResponse(res,404,'Todos is not found');
		}
		catch (error) {
			errorResponse(res,500,error);
		}
	}

	static async findSingleTodo(req,res){
		const userInfo =parseInt(TokenUtil.userIdFromToken(req.header('Authorization')),10);
		const {todoId}=req.params;
		try{
			const oneTodo= await TodoService.findTodo({id:todoId,user_id:userInfo});
			if(oneTodo){
				return successResponse(res,200, 'Todo is retrieved successfully',oneTodo );
			}
			errorResponse(res,404,'Todo is not found');
		}
		catch (error) {
			errorResponse(res,500,error);
		}
	}
}
export default TodoController;
