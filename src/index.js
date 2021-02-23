import express from 'express';
import bodyParse from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route';
import todoRoute from './routes/todo.route';
import swaggerDocument from '../app.json';

dotenv.config({ path: './.env' });

const app = express();


app.use(cors());
app.use(bodyParse.json());
app.use("/api/v1/auth",authRoute);
app.use("/api/v1/",todoRoute);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/', (req, res) => {
	res.status(200).send({
		status: 200,
		message: 'Welcome To Todo',
	});
});

const port = process.env.PORT||3000;
app.listen(port, () => process.stdout.write(
	`Listening on port ${port} ... \n`,
));
export default app;