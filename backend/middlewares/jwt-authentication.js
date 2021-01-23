const jwt = require('jsonwebtoken');

const AuthenticateJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    if(!authHeader){
        return res.status(401).json({
            error: "AUTHORIZATION_HEADER_MISSING"
        });
    }
    const token = authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({
            error: "JWT_TOKEN_MISSING"
        });
    }
    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
        if(err){
            return res.status(403).json({
                error: "ACCESS DENIED"
            });
        }
        req.user = user;
        next();
    })
}

module.exports = AuthenticateJWT;