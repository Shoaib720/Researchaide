const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/user');

const studentSignup = (req, res, next) => {
    if (req.body && req.body.contact) {
        bcrypt.hash(req.body.contact, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    name: req.body.name,
                    contact: req.body.contact,
                    college: req.body.college,
                    registeredBy: req.body.registeredBy,
                    role: 'student',
                    password: hash
                });
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'SUCCESS',
                            data: result._id
                        });
                    })
                    .catch(err => {
                        if (err.errors) {
                            if (err.errors.email) {
                                if (err.errors.email.name) {
                                    if (err.errors.email.name === "ValidatorError") {
                                        res.status(500).json({
                                            message: "EMAIL_ALREADY_EXISTS"
                                        });
                                    }
                                }
                            }
                        }
                        res.status(500).json({
                            message: "INTERNAL_SERVER_ERROR",
                            error: err
                        });
                    });
            })
            .catch(err => {
                res.status(500).json({
                    message: "INTERNAL_SERVER_ERROR",
                    error: err
                });
            });
    }

}

const spocSignup = (req, res, next) => {
    if (req.body && req.body.contact) {
        bcrypt.hash(req.body.contact, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    name: req.body.name,
                    contact: req.body.contact,
                    college: req.body.college,
                    registeredBy: req.body.registeredBy,
                    role: 'spoc',
                    password: hash
                });
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'SUCCESS',
                            data: result._id
                        });
                    })
                    .catch(err => {
                        if (err.errors) {
                            if (err.errors.email) {
                                if (err.errors.email.name) {
                                    if (err.errors.email.name === "ValidatorError") {
                                        res.status(500).json({
                                            message: "EMAIL_ALREADY_EXISTS"
                                        });
                                    }
                                }
                            }
                        }
                        res.status(500).json({
                            message: "INTERNAL_SERVER_ERROR",
                            error: err
                        });
                    });
            })
            .catch(err => {
                res.status(500).json({
                    message: "INTERNAL_SERVER_ERROR",
                    error: err
                });
            });
    }

}

const adminSignup = (req, res, next) => {
    if (req.body && req.body.contact) {
        bcrypt.hash(req.body.contact, 10)
            .then(hash => {
                const user = new User({
                    email: req.body.email,
                    name: req.body.name,
                    contact: req.body.contact,
                    college: req.body.college,
                    registeredBy: req.body.registeredBy,
                    role: 'admin',
                    password: hash
                });
                user.save()
                    .then(result => {
                        res.status(201).json({
                            message: 'SUCCESS',
                            data: result._id
                        });
                    })
                    .catch(err => {
                        if (err.errors) {
                            if (err.errors.email) {
                                if (err.errors.email.name) {
                                    if (err.errors.email.name === "ValidatorError") {
                                        res.status(500).json({
                                            message: "EMAIL_ALREADY_EXISTS"
                                        });
                                    }
                                }
                            }
                        }
                        res.status(500).json({
                            message: "INTERNAL_SERVER_ERROR",
                            error: err
                        });
                    });
            })
            .catch(err => {
                res.status(500).json({
                    message: "INTERNAL_SERVER_ERROR",
                    error: err
                });
            });
    }

}

const signupFirstAdmin = (req, res, next) => {
    if (req.body && req.body.contact && req.body.secretKey === process.env.ADMIN_SIGNUP_KEY) {
        bcrypt.hash(req.body.contact, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                contact: req.body.contact,
                role: 'admin',
                password: hash
            });
            user.save()
                .then(result => {
                    res.status(201).json({
                        message: 'SUCCESS',
                        data: result._id
                    });
                })
                .catch(err => {
                    if (err.errors) {
                        if (err.errors.email) {
                            if (err.errors.email.name) {
                                if (err.errors.email.name === "ValidatorError") {
                                    res.status(500).json({
                                        message: "EMAIL_ALREADY_EXISTS"
                                    });
                                }
                            }
                        }
                    }
                    res.status(500).json({
                        message: "INTERNAL_SERVER_ERROR",
                        error: err
                    });
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "INTERNAL_SERVER_ERROR",
                error: err
            });
        });
    }
}

const login = (req, res, next) => {
    let fetchedUser;
    User.findOne({ email: req.body.email })
    .then(
        fUser => {
            if (!fUser) {
                return res.status(401).json({
                    message: 'AUTHENTICATION_FAILED'
                });
            }
            fetchedUser = fUser;
            return bcrypt.compare(req.body.password, fUser.password);
        }
    )
    .then(result => {
        if (!result) {
            return res.status(401).json({
                message: 'AUTHENTICATION_FAILED'
            });
        }
        const token = jwt.sign(
            {
                uid: fetchedUser._id,
                email: fetchedUser.email,
                name: fetchedUser.name,
                role: fetchedUser.role,
                cid: fetchedUser.college || null,
                expiresIn: 3600 * 3
            },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3h' }
        );
        res.status(200).json({
            data: token
        });
    })
    .catch(err => {
        return res.status(401).json({
            message: 'AUTHENTICATION_FAILED'
        });
    });
}

const getAdmins = (req, res, next) => {
    User.aggregate([
        { $match: { role: 'admin' } },
        { $sort: { name: 1 } }
    ])
        .then(admins => {
            res.status(200).json({
                message: "SUCCESS",
                data: admins
            });
        })
        .catch(err => {
            res.status(500).json({
                message: "INTERNAL_SERVER_ERROR",
                error: err
            });
        });
}

const getStudentsByCollegeId = (req, res, next) => {
    User.find({ college: req.params.collegeId, role: 'student' })
    .sort({ name: 1 })
    .populate('college')
    .exec(
        (err, result) => {
            if (!err && result) {
                res.status(200).json({
                    message: "SUCCESS",
                    data: result
                });
            }
            else {
                res.status(500).json({
                    message: "INTERNAL_SERVER_ERROR",
                    error: err
                });
            }
        }
    )
}

const getSPOCs = (req, res, next) => {
    User.find({ role: 'spoc' })
    .sort({ name: 1 })
    .populate('college')
    .exec((err, spocs) => {
        if(!err && spocs){
            res.status(200).json({
                message: "SUCCESS",
                data: spocs
            });
        }
        else{
            res.status(404).json({
                message: "NOT_FOUND",
                error: err
            });
        }
    })
}

const getCountsByRoles = (req, res, next) => {
    User.aggregate([
        { $group: { _id: '$role', count: { $sum: 1 } } },
        { $project: { _id: 0, role: '$_id', count: 1 } }
    ])
    .then(counts => {
        res.status(200).json({
            message: "SUCCESS",
            data: counts
        });
    })
    .catch(err => {
        res.status(500).json({
            message: "INTERNAL_SERVER_ERROR",
            error: err
        });
    });
}

const update = (req, res, next) => {
    User.updateOne(
        { _id: req.params.id },
        {
            email: req.body.email,
            name: req.body.name,
            contact: req.body.contact
        }
    )
    .then(result => {
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

const updatePassword = (req, res, next) => {
    User.findOne({ email: req.body.email })
        .then(fUser => {
            if (!fUser) {
                res.status(401).json({
                    message: 'AUTHENTICATION_FAILED'
                })
            }
            return bcrypt.compare(req.body.oldPassword, fUser.password);
        })
        .then(comparisonResult => {
            if (!comparisonResult) {
                return res.status(401).json({
                    message: 'AUTHENTICATION_FAILED'
                });
            }
            bcrypt.hash(req.body.newPassword, 10)
                .then(hash => {
                    User.updateOne(
                        { email: req.body.email },
                        {
                            password: hash
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
                });
        })
        .catch(err => {
            res.status(500).json({
                message: "INTERNAL_SERVER_ERROR",
                error: err
            });
        });
}

const deleteById = (req, res, next) => {
    User.findByIdAndDelete({ _id: req.params.id })
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
    studentSignup,
    spocSignup,
    adminSignup,
    signupFirstAdmin,
    login,
    getAdmins,
    getStudentsByCollegeId,
    getSPOCs,
    getCountsByRoles,
    update,
    updatePassword,
    deleteById
}