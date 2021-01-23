const College = require('../models/college');

const register = (req, res, next) => {
    let college = new College({
        name: req.body.name,
        registrationNo: req.body.registrationNo
    });
    college.save()
    .then(result => {
        res.status(201).json({
            message: "College registered!",
            data: result._id
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

module.exports = {
    register
}