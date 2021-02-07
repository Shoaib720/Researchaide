const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const AuthenticateJWT = require('../middlewares/jwt-authentication');
const SUAuth = require('../middlewares/super-user-auth');
const AdminAuth = require('../middlewares/admin-auth');
const SPOCAuth = require('../middlewares/spoc-auth');
const StudentAuth = require('../middlewares/student-auth');

// router.post('/student-signup', AuthenticateJWT, SPOCAuth, usersController.studentSignup);
router.post('/student-signup', usersController.studentSignup);

// router.post('/spoc-signup', AuthenticateJWT, AdminAuth, usersController.spocSignup);
router.post('/spoc-signup', usersController.spocSignup);

// router.post('/admin-signup', AuthenticateJWT, SUAuth, usersController.adminSignup);
router.post('/admin-signup', usersController.adminSignup);

router.post('/su-signup', usersController.signupSuperUser);

router.post('/su-login', usersController.loginSuperUser);

router.post('/login', usersController.login);

router.get('/students-by-college/:collegeId', AuthenticateJWT, SPOCAuth, usersController.getStudentsByCollegeId);
// router.get('/students-by-college/:collegeId', usersController.getStudentsByCollegeId);

router.get('/spocs', AuthenticateJWT, AdminAuth, usersController.getSPOCs);
// router.get('/spocs', usersController.getSPOCs);

router.get('/admins', AuthenticateJWT, SUAuth, usersController.getAdmins);

router.get('/counts', AuthenticateJWT, AdminAuth, usersController.getCountsByRoles);
// router.get('/counts', usersController.getCountsByRoles);

router.put('/update-admin/:id', AuthenticateJWT, SUAuth, usersController.update);
// router.put('/update-admin/:id', usersController.update);

router.put('/update-password', AuthenticateJWT, usersController.updatePassword);

router.put('/update-student/:id', AuthenticateJWT, SPOCAuth, usersController.update);
// router.put('/update-student/:id', usersController.update);

router.put('/update-spoc/:id', AuthenticateJWT, AdminAuth, usersController.update);
// router.put('/update-spoc/:id', usersController.update);

router.delete('/student/:id', AuthenticateJWT, SPOCAuth, usersController.deleteById);
// router.delete('/student/:id', usersController.deleteById);

router.delete('/spoc/:id', AuthenticateJWT, AdminAuth, usersController.deleteById);
// router.delete('/spoc/:id', usersController.deleteById);

router.delete('/admin/:id', AuthenticateJWT, SUAuth, usersController.deleteById);

router.use('/*', (req, res, next) => {
    res.status(404).json({
        error: "ROUTE_NOT_FOUND",
    });
});

module.exports = router;

