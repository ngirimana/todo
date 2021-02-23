# Todo

Create a To-Do API. The To-Do API should allow the following operations on a todo item:
Authenitaction(Signup and Signin) Create, Update, Read, Delete


[![Build Status](https://travis-ci.com/ngirimana/todo.svg?branch=develop)](https://travis-ci.com/ngirimana/todo)
[![Coverage Status](https://coveralls.io/repos/github/ngirimana/todo/badge.svg?branch=ch-sagger-documentation)](https://coveralls.io/github/ngirimana/todo?branch=ch-sagger-documentation)
[![Maintainability](https://api.codeclimate.com/v1/badges/1f85e712cfb4bf8bc8d6/maintainability)](https://codeclimate.com/github/ngirimana/todo/maintainability)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

### Prerequisites
- [Node JS](https://nodejs.org/)
- [Postgresql](https://www.postgresql.org/download/)
- [Postman](https://www.getpostman.com/downloads/)
- For windows O.S user,we recommend to download and install [Git bash](https://git-scm.com/downloads) for interacting with GitHub
- Text editor: you can choose whatever you are familiar with but I prefer [VS Code](https://code.visualstudio.com/download)


### Features

| HTTP Method | Endpoint                   | Description                                     |
| :---------- | :------------------------- | :---------------------------------------------- |
| GET         | /                          | Default route                                   |
| POST        | /api/v1/auth/signup        | User can create an account                      |
| POST        | /api/v1/auth/signin        | User can sign in                                |
| POST        | /api/v1/create-todo        | User can create a todo                          |
| PATCH       | /api/v1/todo/:todoId       | User can edit a todo                            |
| GET         | /api/v1/todos              | User can get all todos                          |
| GET         | /api/v1/todo/:todoId       | User can get one  todo                          |
| DELETE      | /api/v1/todo/:todoId       | User can delete one  todo  |


### Installation

1.  First download and install [Node JS](https://nodejs.org/en/download/)
2.  Download and install [Postman](https://www.getpostman.com/downloads/)
3.  Download and install [Postgresql](https://www.postgresql.org/)

4.  Clone repository [Todo](https://github.com/ngirimana/todo) by running
    `git clone https://github.com/ngirimana/todo`
5.  Run `npm install` (`sudo apt install` for linux users) command for installing all project dependencies

### Set up environment variable

- SALT_ROUNDS : for password hashing round salt
- SECRET: secrete word use when system is generating token
- DATABASE_URL: database connection string. example: postgresql://postgres:12345@localhost/todo
- DATABASE_URL_TEST: database connection string. example: postgresql://postgres:12345@localhost/todo_test


### Running

- Run `npm run migrate ` to create migration
- Run `npm run dev-start` to start server

* Running API test 

    - Run `npm test` in terminal

### Deployment
- [Heroku](https://todo-challenge-awosomity.herokuapp.com/)
- [API Documentation](https://todo-challenge-awosomity.herokuapp.com/api-docs/)

### Tools used

- Server side Framework: [Node JS](https://nodejs.org/)/[Express](https://expressjs.com/)
- Linting Library: [ESLint](https://eslint.org)
- Style Guide: [Airbnb](https://github.com/airbnb/javascript) and [Prettier](https://prettier.io/)
- Testing Framework: [Mocha](https://mochajs.org/)
- TDD assertion library: [Chai](https://www.chaijs.com)
- Documentation Tools: [Swagger](https://swagger.io/tools/swagger-ui/)
- Database : [postgresql](https://www.postgresql.org/)
- ORM : [SQuelize](https://sequelize.org/)

### Author

[NGIRIMANA Schadrack](https://github.com/ngirimana/)

