import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import {config} from "dotenv";
import app from '../index';
import entries from './todocases';

config();
const { expect } = chai;
chai.use(chaiHttp);
const emptyToken = '';
const nonExistToken = jwt.sign({
	Id: 70,
	userEmail: 'test@gmail.com',
}, process.env.SECRET);
const token = jwt.sign({
	Id: 1,
	userEmail: 'test@gmail.com',
}, process.env.SECRET);
const notYoursToken = jwt.sign({
	Id: 2,
	userEmail: 'test1@gmail.com',
}, process.env.SECRET);
const badroute = '/api/v1/todo/70';
const invalidToken = 'hsgbs shgbhsbd dhbfhsdbfbds fhsbhfbhsbfhbdsf sfdhsdbfdbshdbf';

describe(' 3. POST todo ,/api/v1/create-todo', () => {
	it('should return "title" is not allowed to be empty ', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/create-todo')
				.set('Accept', 'application/json')
				.set('Authorization', token)
				.send(entries[0]);
				
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(400);
			expect(res.body.status).to.equal(400);
			expect(res.body.error).to.equal('"title" is not allowed to be empty');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return "Description" is not allowed to be empty', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/create-todo')
				.set('Authorization', token)
				.set('Accept', 'application/json')
				.send(entries[1]);
			
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(400);
			expect(res.body.status).to.equal(400);
			expect(res.body.error).to.equal('"description" is not allowed to be empty');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return "priority" is not allowed to be empty', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/create-todo')
				.set('Authorization', token)
				.set('Accept', 'application/json')
				.send(entries[2]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(400);
			expect(res.body.status).to.equal(400);
			expect(res.body.error).to.equal('"priority" is not allowed to be empty');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return You haven\'t provide your token', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/create-todo')
				.set('Authorization', emptyToken)
				.set('Accept', 'application/json')
				.send(entries[0]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(400);
			expect(res.body.status).to.equal(400);
			expect(res.body.error).to.equal('You haven\'t provide your token');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return Unauthorized,create account first', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/create-todo')
				.set('Authorization', nonExistToken)
				.set('Accept', 'application/json')
				.send(entries[0]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(401);
			expect(res.body.status).to.equal(401);
			expect(res.body.error).to.equal('Unauthorized,create account first');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return jwt malformed', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/create-todo')
				.set('Authorization', invalidToken)
				.set('Accept', 'application/json')
				.send(entries[0]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(400);
			expect(res.body.status).to.equal(400);
			// expect(res.body.error).to.equal('jwt malformed');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return Your todos  are not found!', async () => {
		try {
			const res = await chai.request(app)
				.get('/api/v1/todos')
				.set('Authorization', token)
				.set('Accept', 'application/json');
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(404);
			expect(res.body.status).to.equal(404);
			expect(res.body.error).to.equal('Todos are not found');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return Todo created successfully', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/create-todo')
				.set('Authorization', token)
				.set('Accept', 'application/json')
				.send(entries[3]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(201);
			expect(res.body.status).to.equal(201);
			expect(res.body.message).to.equal('Todo created successfully');
			expect(res.body.data).to.have.property('createdAt');
			expect(res.body.data).to.have.property('updatedAt');
			expect(res.body.data.id).to.equal(1);
			expect(res.body.data.title).to.equal('Assignment');
			expect(res.body.data.description).to.equal('Java');
			expect(res.body.data.priority).to.equal('High');
			expect(res.body.data.user_id).to.equal(1);
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
});
describe(' 4. PATCH todo ,/api/v1//todo/:todoId', () => {
	it('should return id is not found ', async () => {
		try {
			const res = await chai.request(app)
				.patch(badroute)
				.set('Authorization', token)
				.set('Accept', 'application/json')
				.send(entries[3]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(404);
			expect(res.body.status).to.equal(404);
			expect(res.body.error).to.equal('Todo is not found');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	
	it('should return Todo updated successfully', async () => {
		try {
			const res = await chai.request(app)
				.patch('/api/v1//todo/1')
				.set('Authorization', token)
				.set('Accept', 'application/json')
				.send(entries[4]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(200);
			expect(res.body.status).to.equal(200);
			expect(res.body.message).to.equal('Todo updated successfully');
			expect(res.body.data[1][0].id).to.equal(1);
			expect(res.body.data[1][0].title).to.equal('Class assignment');
			expect(res.body.data[1][0].description).to.equal('Java for Android');
			expect(res.body.data[1][0].priority).to.equal('High');
			expect(res.body.data[1][0].user_id).to.equal(1);
			
			
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
});
describe(' 5. GET todos /api/v1/todos', () => {
	it('should return todos are not found!', async () => {
		try {
			const res = await chai.request(app)
				.get('/api/v1/todos')
				.set('Authorization', token)
				.set('Accept', 'application/json');
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(200);
			expect(res.body.status).to.equal(200);
			 expect(res.body.message).to.equal('Todos are retrieved successfully');
			 expect(res.body.data[0].id).to.equal(1);
			expect(res.body.data[0].title).to.equal('Class assignment');
			expect(res.body.data[0].description).to.equal('Java for Android');
			expect(res.body.data[0].priority).to.equal('High');
			expect(res.body.data[0].user_id).to.equal(1);
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
});
describe(' 6. GET  specific v1 ,/api/v1/todo/todoId', () => {
	
	it('should return todo is not found ', async () => {
		try {
			const res = await chai.request(app)
				.get('/api/v1//todo/100')
				.set('Authorization', token)
				.set('Accept', 'application/json');
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(404);
			expect(res.body.status).to.equal(404);
			expect(res.body.error).to.equal('Todo is not found');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return todo is not found!', async () => {
		try {
			const res = await chai.request(app)
				.get('/api/v1/todo/1')
				.set('Authorization', token)
				.set('Accept', 'application/json');
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(200);
			expect(res.body.status).to.equal(200);
			 expect(res.body.message).to.equal('Todo is retrieved successfully');
			 expect(res.body.data.id).to.equal(1);
			expect(res.body.data.title).to.equal('Class assignment');
			expect(res.body.data.description).to.equal('Java for Android');
			expect(res.body.data.priority).to.equal('High');
			expect(res.body.data.user_id).to.equal(1);
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
});

describe('7 . DELETE  specific v1 ,/api/v1/todo/todoId', () => {

	it('should return todo is not found! ', async () => {
		try {
			const res = await chai.request(app)
				.delete('/api/v1/todo/100')
				.set('Authorization', token)
				.set('Accept', 'application/json');
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(404);
			expect(res.body.status).to.equal(404);
			expect(res.body.error).to.equal('Todo is not available');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return todo is deleted successfully', async () => {
		try {
			const res = await chai.request(app)
				.delete('/api/v1/todo/1')
				.set('Authorization', token)
				.set('Accept', 'application/json');
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(200);
			expect(res.body.status).to.equal(200);
			expect(res.body.message).to.equal('Todo is deleted successfully');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
});