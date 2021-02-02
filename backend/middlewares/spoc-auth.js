const VerifySPOC = (req, res, next) => {
    if(!req.user){
        return res.status(401).json({
            message: "USER_FIELD_MISSING"
        });
    }
    if(req.user.role !== 'spoc'){
        return res.status(401).json({
            message: "ACCESS_DENIED"
        });
    }
    next();
}

module.exports = VerifySPOC;