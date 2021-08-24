'use strict';

const models = require('./models/index.js');
const jwt = require('jsonwebtoken');
const idValidator = require('./idvalidator.js');
const passValidator = require('./passvalidator.js');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const env = process.env;
const token = require('./token.js');

function setStatusMsg(res, scode, content)
{
	res.status(scode);
	res.send({msg:content});
	res.end();
}

async function createNewUser(req)
{
	bcrypt.genSalt(saltRounds, (err, salt)=>{
		bcrypt.hash(req.body.password, salt, function(err, hash){
			models.User.create({id:req.body.id, password:hash});
					})
			});
}

function userSignUp(req, res, next)
{
	if (!idValidator(req.body.id))
		return (setStatusMsg(res, 400, "userid"));
	if (!passValidator(req.body.password))
		return (setStatusMsg(res, 400, "password"));
	models.User.findOne({where: {id : req.body.id}})
		.then((result) =>{
			if (result == null)
			{
				console.log("data is created");
				createNewUser(req)
					.then(()=>{setStatusMsg(res, 201, "Successfully signed up");})
					.catch(()=>{setStatusMsg(res, 500, "Server error");});
			}
			else
			{
				console.log("confilct");
				setStatusMsg(res, 409, "Conflict: The user is already registered");
			}})
		.catch((err)=>{
			console.log(err);
			setStatusMsg(res, 500, "Server Error");});
}


async function userSignIn(req, res, next)
{
	if (!req.body.id || !req.body.password)
		return setStatusMsg(res, 400, "Bad Request");
	try
	{
		const user = await	models.User.findOne({where: {id: req.body.id}});
		if (!user)
			return setStatusMsg(res, 401, "Wrong userid or password");
		bcrypt.compare(req.body.password, user.password, (err, result)=>{
		if (result == true)
		{
			console.log("success: log-in");
			res.cookie('jwt_access', token.issue(user.index, "30m"), {maxAge:30 *60 * 1000});
			const refresh = token.issue(user.index, "7d");
			res.cookie('jwt_refresh', refresh, {maxAge: 7 * 60 * 60 * 1000});
			user.update({'jwtkey' : refresh});
			setStatusMsg(res, 200, "Successfully signed in");
		}
		else
		{
			console.log("fail : log-in");
			setStatusMsg(res, 401, "Wrong userid or password");
		}});
	}
	catch (err)
	{
		console.log(err);
		setStatusMsg(res, 500, "Server Error");
	}


}

function userSignOut(req, res, next)
{		
	console.log("SIGN-OUT");
	const jwt_access = req.cookies.jwt_access;
	const jwt_refresh = req.cookies.jwt_refresh;
	if (!jwt_access || !jwt_refresh)
		return setStatusMsg(res, 401, "Not signed in");
	token.verify(jwt_access)
		.then(async (decoded_data)=>{
			const user = await models.User.findOne({where : {index : decoded_data["sub"]}});
			if (jwt_refresh !== user.jwtkey)
				return (setStatusMsg(res, 401, "Not signed in"));
			user.update({'jwtkey' : null});
			res.cookie('jwt_access', token.issue('', "0ms"), {maxAge : 0});
			res.cookie('jwt_refresh', token.issue('', "0ms"), {maxAge : 0});
			setStatusMsg(res, 200,  "Succesfully signed out");
				})
		.catch((err)=>{
				console.log(err);
				setStatusMsg(res, 401, "Not signed in");
			})
}

module.exports = {userSignUp, userSignIn, userSignOut}
