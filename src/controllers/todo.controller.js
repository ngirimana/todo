import {errorResponse,successResponse} from '../helpers/response';
import TodoService from '../services/todo.service';
import TokenUtil from '../helpers/token';


/**
 * Auth controller Class
 */
class TodoController {

	/**
	 * function to create todo
	 * @param {object} req 
	 * @param {object} res 
	 *  @returns {object} data for created todo
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
			return errorResponse(res,500,error);
		}
	}
	/**
	 * function to get all todos
	 * @param {object} req 
	 * @param {object} res 
	 *  @returns {object} obecjted for all user todos
	 */

	static async findAllTodos(req,res){
		const userInfo =parseInt(TokenUtil.userIdFromToken(req.header('Authorization')),10);
		try{
			const allTodos= await TodoService.findAllTodos({user_id:userInfo});
			if(allTodos.length){
				return successResponse(res,200, 'Todos are retrieved successfully',allTodos );
			}
			errorResponse(res,404,'Todos are not found');
		}
		catch (error) {
			return errorResponse(res,500,error);
		}
	}

	/**
	 * function to get one todo
	 * @param {object} req 
	 * @param {object} res 
	 *  @returns {object} data for retrieved todo
	 */

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
			return	errorResponse(res,500,error);
		}
	}
	/**
	 * function to update todo
	 * @param {object} req 
	 * @param {object} res 
	 *  @returns {object} data for updated todo
	 */

	static async updateTodo(req, res) {
		const userDataId =parseInt(TokenUtil.userIdFromToken(req.header('Authorization')),10);
		const {todoId}=req.params;
		try {
			const todoData = {
				title :req.body.title,
				description: req.body.description,
				priority:req.body.priority,
				
			};
			const updatedTodo = await TodoService.updateTodo({id:todoId,user_id:userDataId},todoData);
			if(updatedTodo[0]){
				return successResponse(res,200, 'Todo updated successfully',updatedTodo );
			}
			errorResponse(res,404,'Todo is not found');
		} catch (error) {
			return errorResponse(res,500,error);
		}
	}
	/**
	 * function to delete todo
	 * @param {object} req 
	 * @param {object} res 
	 *  @returns {object} data for deleted todo
	 */

	static async deleteSingleTodo(req,res){
		const userDataId =parseInt(TokenUtil.userIdFromToken(req.header('Authorization')),10);
		const {todoId}=req.params;
		try{
			const deletedTodo= await TodoService.DeleteTodo({id:todoId,user_id:userDataId});
			if(deletedTodo){
				return successResponse(res,200, 'Todo is deleted successfully',deletedTodo );
			}
			errorResponse(res,404,'Todo is not available');
		}
		catch (error) {
			return errorResponse(res,500,error);
		}
	}
}
export default TodoController;
