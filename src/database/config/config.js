import 'regenerator-runtime/runtime';
import { config } from 'dotenv';

config();

export const development = {
	url: process.env.DATABASE_URL,
	dialect: 'postgres',
	logging: false,
};

export const test = {
	url: process.env.DATABASE_URL_TEST,
	dialect: 'postgres',
	logging: false,
};
export const production = {
	url: process.env.DATABASE_URL,
	dialect: 'postgres',
	logging: false,
};



