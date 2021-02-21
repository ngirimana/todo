import express from 'express';
import bodyParse from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoute from './routes/auth.route';


dotenv.config({ path: './.env' });

const app = express();


app.use(cors());
app.use(bodyParse.json());
app.use("/api/v1/auth",authRoute);
app.use('/', (req, res) => {
	res.status(200).send({
		status: 200,
		message: 'Welcome To Todo ',
	});
});

const port = process.env.PORT||3000;
app.listen(port, () => process.stdout.write(
	`Listening on port ${port} ... \n`,
));
export default app;