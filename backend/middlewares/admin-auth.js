const VerifyAdmin = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({
            error: "USER_FIELD_MISSING"
        });
    }
    if(req.user.role !== 'admin'){
        return res.status(401).json({
            error: "ACCESS_DENIED_ADMIN_PREVILEGE_REQUIRED"
        });
    }
    next();
}

module.exports = VerifyAdmin;