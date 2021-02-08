const College = require('../models/college');

const register = (req, res, next) => {
    let college = new College({
        name: req.body.name,
        registrationNo: req.body.regNo
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

const updateCollege = (req, res, next) => {
    College.findOneAndUpdate(
        { _id: req.params.id },
        {
            name: req.body.name,
            registrationNo: req.body.regNo
        }
    )
    .then(() => {
        res.status(201).json({
            message: 'SUCCESS'
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
            error: err
        });
    });
}

const getColleges = (req, res, next) => {
    College.aggregate([
        { $sort: { name: 1 } }
    ])
    .then(colleges => {
        res.status(200).json({
            message: "SUCCESS",
            data: colleges
        })
    })
    .catch(err => {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
            error: err
        })
    })
}

const deleteById = (req, res, next) => {
    College.findByIdAndDelete({_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: "SUCCESS"
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
    getCollegeCount,
    getColleges,
    updateCollege,
    deleteById
}