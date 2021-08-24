const express = require('express');
const app = express(); //server create
const cookieParser = require('cookie-parser');
const {sequelize} = require('./models/index');
const router = require('./route.js');
const cors = require('cors');
const port = process.env.EXPRESS_PORT;

async function main()
{
	const driver = ()=>{
		sequelize.sync({})
				.then(()=>{console.log("init table");})
				.catch((err)=>{console.log(err);})
		}
	try
	{
		await sequelize.authenticate();
		console.log("DB connected successfully");
		await driver();
	}
	catch (err)
	{
		console.error(err);
	}
	let corsOptions = {
		origin: "http://localhost:4200"
	}
	app.use(express.json());
	app.use(cookieParser());
	app.use('/', cors(corsOptions), router);
	app.listen(port, ()=>{});
}

main();
