import Sequelize from "sequelize";
import models from "../database/models";

const { Todo} = models;
const {Op} = Sequelize

/**
 * Todo service class
*/
class Todos {
	/**
    * create todo function
	 * @param {object} todo  todo information details
	 * @returns {object} function to display a todo
	*/

	static createTodo(todo) {
		return Todo.create(todo);
	}

	/**
     * findone todo function
	 * @param {object} attribute
	 * @returns {object} function to display a todo
	*/

	static findTodo(attribute) {
		return Todo.findOne({
			 where: attribute
		});
	}
	/**
     * function to get all todoes
     * @param {object} attribute
	 * @returns {object} function to display a all todoes
     */

	static findAllTodos(attribute) {
		return Todo.findAll({where:attribute});
	}

	/**
	 * @param {integer} data
	 * @param {string} property
	 * @returns {object} function to display a todo
	*/
	static updateTodo(data, property) {
		return Todo.update(property, {
			where: data,
			returning: true,
		});
	}

	/**
     * delete todo function
	 * @param {object} attribute
	 * @returns {object} function to display a todo
	*/
	static DeleteTodo(attribute) {
		return Todo.destroy({ where: attribute });
	}

	
}

export default Todos;
