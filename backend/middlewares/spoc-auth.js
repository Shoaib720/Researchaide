const VerifySPOC = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({
            error: "USER_FIELD_MISSING"
        });
    }
    if(req.user.role !== 'spoc'){
        return res.status(401).json({
            error: "ACCESS_DENIED_SPOC_PREVILEGE_REQUIRED"
        });
    }
    next();
}

module.exports = VerifySPOC;