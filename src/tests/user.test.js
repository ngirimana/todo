// import jwt from 'jsonwebtoken';
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../index';
import users from "./usercases";

const { expect } = chai;
chai.use(chaiHttp);

describe('0. Welcome', () => {
	it('should return welcome ', async () => {
		try {
			const res = await chai.request(app)
				.get('/')
				.set('Accept', 'application/json');
			expect(res.body).to.be.an('object');
			expect(res.body.status).to.equal(200);
			expect(res.status).to.equal(200);
			expect(res.body.message).to.equal('Welcome To Todo');
		} catch (err) {
			(() => { throw err; }).should.throw();
		}
	});
});
describe('1 . POST signup,/api/v1/auth/signup', () => {
	it('should return name is required if it is empty', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/auth/signup')
				.set('Accept', 'application/json')
				.send(users[0]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(400);
			expect(res.body.status).to.equal(400);
			expect(res.body.error).to.equal('"name" is not allowed to be empty' );
		
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return email must not be empty ', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/auth/signup')
				.set('Accept', 'application/json')
				.send(users[1]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(400);
			expect(res.body.status).to.equal(400);
			expect(res.body.error).to.equal('"email" is not allowed to be empty')
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return invalid email', async () => {
		try {
		  const res = await chai.request(app)
				.post('/api/v1/auth/signup')
				.set('Accept', 'application/json')
				.send(users[2]);
		  expect(res.body).to.be.an('object');
		  expect(res.status).to.equal(400);
		  expect(res.body.error).to.equal('"email" must be a valid email');
		} catch (error) {
		  (() => { throw error; }).should.throw();
		}
	  });
	it('should return password is required if it is empty', async () => {
		try {
		  const res = await chai.request(app)
				.post('/api/v1/auth/signup')
				.set('Accept', 'application/json')
				.send(users[3]);
		  expect(res.body).to.be.an('object');
		  expect(res.status).to.equal(400);
		  expect(res.body.status).to.equal(400);
		  expect(res.body.error).to.equal('"password" is not allowed to be empty');
		} catch (error) {
		  (() => { throw error; }).should.throw();
		}
	  });
	it('should return "password" with value "Te12345" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,20}$/', async () => {
		try {
		  const res = await chai.request(app)
				.post('/api/v1/auth/signup')
				.set('Accept', 'application/json')
				.send(users[4]);
		  expect(res.body).to.be.an('object');
		  expect(res.status).to.equal(400);
			expect(res.body.error).to.equal('"password" with value "Te12345" fails to match the required pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[#$^+=!*()@%&]).{8,20}$/');
		} catch (error) {
		  (() => { throw error; }).should.throw();
		}
	  });
	  
	 it('should return signup successful', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/auth/signup')
				.set('Accept', 'application/json')
				.send(users[5]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(201);
			expect(res.body.status).to.equal(201);
			expect(res.body.message).to.equal('User created successfully')
			expect(res.body.data).to.have.property('token');
			expect(res.body.data.id).to.equal(1);
			expect(res.body.data.name).to.equal("test");
			expect(res.body.data.email).to.equal('test@gmail.com');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	it('should return signup successful', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/auth/signup')
				.set('Accept', 'application/json')
				.send(users[6]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(201);
			expect(res.body.status).to.equal(201);
			expect(res.body.message).to.equal('User created successfully')
			expect(res.body.data).to.have.property('token');
			expect(res.body.data.id).to.equal(2);
			expect(res.body.data.name).to.equal("test");
			expect(res.body.data.email).to.equal('test1@gmail.com');
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
	  it('should return Email already in use', async () => {
		try {
			const res = await chai.request(app)
				.post('/api/v1/auth/signup')
				.set('Accept', 'application/json')
				.send(users[7]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(409);
			expect(res.body.status).to.equal(409);
			expect(res.body.error).to.equal('Email already in use')
		} catch (error) {
			(() => { throw error; }).should.throw();
		}
	});
})
describe('2 .POST signin  api/v1/auth/signin', () => {
	it('should return User signed in successfully', async () => {
		  try {
			const res = await chai.request(app)
			  .post('/api/v1/auth/signin')
			  .set('Accept', 'application/json')
			  .send(users[8]);
			expect(res.body).to.be.an('object');
			expect(res.body.status).to.equal(200);
			expect(res.status).to.equal(200);
			expect(res.body.message).to.equal('Logged in successfully!');
			expect(res.body.data).to.have.property('token');
			expect(res.body.data.id).to.equal(1);
			expect(res.body.data.name).to.equal('test');
			expect(res.body.data.email).to.equal('test@gmail.com');
		  } catch (error) {
			(() => { throw error; }).should.throw();
		  }
	});
	it('should return Incorrect email or password', async () => {
		  try {
			const res = await chai.request(app)
			  .post('/api/v1/auth/signin')
			  .set('Accept', 'application/json')
			  .send(users[9]);
			expect(res.body).to.be.an('object');
			expect(res.status).to.equal(403);
			expect(res.body.status).to.equal(403);
			expect(res.body.error).to.equal('Your password is incorrect');
		  } catch (error) {
			(() => { throw error; }).should.throw();
		  }
	});
	it('should return Incorrect email or password', async () => {
		try {
		  const res = await chai.request(app)
				.post('/api/v1/auth/signin')
				.set('Accept', 'application/json')
				.send(users[10]);
		  expect(res.body).to.be.an('object');
		  expect(res.status).to.equal(401);
		  expect(res.body.status).to.equal(401);
	 	expect(res.body.error).to.equal('You are not authorized to access this resouces');
		} catch (error) {
		  (() => { throw error; }).should.throw();
		}
	  });
});
