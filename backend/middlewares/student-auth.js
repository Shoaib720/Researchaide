const VerifyStudent = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({
            error: "USER_FIELD_MISSING"
        });
    }
    if(req.user.role !== 'student'){
        return res.status(401).json({
            error: "ACCESS_DENIED_STUDENT_PREVILEGE_REQUIRED"
        });
    }
    next();
}

module.exports = VerifyStudent;