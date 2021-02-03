const College = require('../models/college');

const register = (req, res, next) => {
    let college = new College({
        name: req.body.name,
        registrationNo: req.body.registrationNo
    });
    college.save()
    .then(result => {
        res.status(201).json({
            message: "SUCCESS",
            data: result._id
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
            error: err
        });
    });
}

const getCollegeCount = (req, res, next) => {
    College.aggregate([ { $count: 'count' } ])
    .then(count => {
        res.status(200).json({
            message: "SUCCESS",
            data: count
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
            error: err
        });
    });
}

module.exports = {
    register,
    getCollegeCount
}