const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const SuperUser = require('../models/super-user');
const mongoose = require('mongoose');

const studentSignup = (req, res, next) => {
    if(req.body && req.body.contact){
        bcrypt.hash(req.body.contact, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                contact: req.body.contact,
                college: req.body.collegeId,
                registeredBy: req.body.registeredBy,
                role: 'student',
                password: hash
            });
            user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User Created!',
                    data: result._id
                });
            })
            .catch(err => {
                if(err.errors.email.name && err.errors.email.name === "ValidatorError"){
                    res.status(500).json({
                        error: "EMAIL_ALREADY_EXISTS"
                    });
                }
                res.status(500).json({
                    error: err
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
    
}

const spocSignup = (req, res, next) => {
    if(req.body && req.body.contact){
        bcrypt.hash(req.body.contact, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                contact: req.body.contact,
                college: req.body.collegeId,
                registeredBy: req.body.registeredBy,
                role: 'spoc',
                password: hash
            });
            user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User Created!',
                    data: result._id
                });
            })
            .catch(err => {
                if(err.errors.email.name && err.errors.email.name === "ValidatorError"){
                    res.status(500).json({
                        error: "EMAIL_ALREADY_EXISTS"
                    });
                }
                res.status(500).json({
                    error: err
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
    
}

const adminSignup = (req, res, next) => {
    if(req.body && req.body.contact){
        bcrypt.hash(req.body.contact, 10)
        .then(hash => {
            const user = new User({
                email: req.body.email,
                name: req.body.name,
                contact: req.body.contact,
                college: req.body.collegeId,
                registeredBy: req.body.registeredBy,
                role: 'admin',
                password: hash
            });
            user.save()
            .then(result => {
                res.status(201).json({
                    message: 'User Created!',
                    data: result._id
                });
            })
            .catch(err => {
                if(err.errors.email.name && err.errors.email.name === "ValidatorError"){
                    res.status(500).json({
                        error: "EMAIL_ALREADY_EXISTS"
                    });
                }
                res.status(500).json({
                    error: err
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
    
}

const signupSuperUser = (req, res, next) => {
    if(req.body && req.body.suKey === process.env.SUPER_USER_KEY){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const su = new User({
                email: req.body.email,
                password: hash
            });
            su.save()
            .then(result => {
                res.status(201).json({
                    message: 'Super User Created!',
                    data: result._id
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                });
            });
        })
        .catch(err => {
            res.status(500).json({
                error: err
            });
        });
    }
}

const loginSuperUser = (req, res, next) => {
    let fetchedUser;
    SuperUser.findOne({ email: req.body.email })
    .then(su => {
        if(!su){
            return res.status(401).json({
                error: 'AUTHENTICATION_FAILED'
            });
        }
        fetchedUser = su;
        return bcrypt.compare(req.body.password, su.password);
    })
    .then(comparisonResult => {
        if(!comparisonResult){
            return res.status(401).json({
                error: 'AUTHENTICATION_FAILED'
            });
        }
        const token = jwt.sign(
            { userId: fetchedUser._id, email: fetchedUser.email, role: 'super-user' },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3h' }
        );
        res.status(200).json({
            uid: fetchedUser._id,
            email: fetchedUser.email,
            token: token,
            expiresIn: 3600*3
        });
    })
    .catch(err => {
        return res.status(401).json({
            error: err
        })
    });
}

const login = (req, res, next) => {
    let fetchedUser;
    User.findOne({email : req.body.email})
    .populate('college', 'name')
    .exec()
    .then(
        fUser => {
            if(!fUser){
                return res.status(401).json({
                    error: 'AUTHENTICATION_FAILED'
                });
            }
            fetchedUser = fUser;
            return bcrypt.compare(req.body.password, fUser.password);
        }
    )
    .then(result => {
        if(!result){
            return res.status(401).json({
                error: 'AUTHENTICATION_FAILED'
            });
        }
        const token = jwt.sign(
            { userId: fetchedUser._id, email: fetchedUser.email, collegeId: fetchedUser.college, role: fetchedUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '3h' }
        );
        res.status(200).json({
            uid: fetchedUser._id,
            email: fetchedUser.email,
            name: fetchedUser.name,
            role: fetchedUser.role,
            college: fetchedUser.college,
            token: token,
            expiresIn: 3600*3
        });
    })
    .catch(err => {
        return res.status(401).json({
            error: err
        });
    });
}

const getStudentsByCollegeId = (req, res, next) => {
    User.find({ college: req.params.collegeId, role: 'student' })
    .then(students => {
        res.status(200).json({
            message: "Success",
            data: students
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const getSPOCs = (req, res, next) => {
    User.find({ role: 'spoc' })
    .then(students => {
        res.status(200).json({
            message: "Success",
            data: students
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const getCountsByRoles = (req, res, next) => {
    User.aggregate([
        { $group: { _id: '$role' , count: { $sum: 1 }} },
        { $project: { _id: 0, role: '$_id', count: 1 } }
    ])
    .then(counts => {
        res.status(200).json({
            message: "Success",
            data: counts
        });
    })
    .catch(err => {
        res.status(500).json({
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
            message: 'User Updated!',
            data: result
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}

const updatePassword = (req, res, next) => {
    User.findOne({ _id: req.params.id })
    .then(fUser => {
        if(!fUser){
            res.status(401).json({
                error: 'AUTHENTICATION_FAILED'
            })
        }
        return bcrypt.compare(req.body.oldPassword, fUser.password);
    })
    .then(comparisonResult => {
        if(!comparisonResult){
            return res.status(401).json({
            error: 'AUTHENTICATION_FAILED'
            });
        }
        bcrypt.hash(req.body.newPassword, 10)
        .then(hash => {
            User.updateOne(
                { _id: req.params.id },
                {
                    password: hash
                }
            )
            .then(() => {
                res.status(201).json({
                    message: 'Password Updated!'
                });
            })
            .catch(err => {
                res.status(500).json({
                    error : err
                });
            });
        });
    })
    .catch(err => {
        res.status(500).json({
            error : err
        });
    });
}

const deleteById = (req, res, next) => {
    User.findByIdAndDelete( {_id: req.params.id})
    .then(() => {
        res.status(200).json({
            message: "Deleted Successfully"
        });
    })
    .catch(err => {
        res.status(500).json({
            error: err
        });
    });
}


module.exports = {
    studentSignup,
    spocSignup,
    adminSignup,
    signupSuperUser,
    loginSuperUser,
    login,
    getStudentsByCollegeId,
    getSPOCs,
    getCountsByRoles,
    update,
    updatePassword,
    deleteById
}