const VerifySuperUser = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({
            error: "USER_FIELD_MISSING"
        });
    }
    if(req.user.role !== 'super-user'){
        return res.status(401).json({
            error: "ACCESS_DENIED_SUPER_USER_PREVILEGE_REQUIRED"
        });
    }
    next();
}

module.exports = VerifySuperUser;