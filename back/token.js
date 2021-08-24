'use strict'

const jwt = require('jsonwebtoken');
const env = process.env;


function issue(content, timelimit)
{
	let token;

	token = jwt.sign({
				sub: content},
				env.SECRET_KEY, {
				expiresIn: timelimit
				});
	return (token);
}


function verify(token)
{
	return new Promise((resolve, reject)=>{
	jwt.verify(token, env.SECRET_KEY, (err, decoded)=>{
		if (err)
			reject(err);
		resolve(decoded);});
	});
}

module.exports = {issue, verify}
