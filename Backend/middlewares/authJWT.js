const { access_verifiy } = require('../jwt-util/jwt-utils')

const authJWT = (req, res, next)=>{
    const access_token = req.cookies.access;
    console.log(access_token);
    const result = access_verifiy(access_token);
    if (result.ok) {
        req.id = result.id;
        next();
    }
    else {
        res.status(401).json({
            message : result.message
        })
    }
}

module.exports = authJWT;