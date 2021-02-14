const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const AuthenticateJWT = require('../middlewares/jwt-authentication');
const AdminAuth = require('../middlewares/admin-auth');
const SPOCAuth = require('../middlewares/spoc-auth');

router.post('/student-signup', AuthenticateJWT, SPOCAuth, usersController.studentSignup);

router.post('/spoc-signup', AuthenticateJWT, AdminAuth, usersController.spocSignup);

router.post('/admin-signup', AuthenticateJWT, AdminAuth, usersController.adminSignup);

router.post('/first-admin-signup', usersController.signupFirstAdmin);

router.post('/login', usersController.login);

router.get('/students-by-college/:collegeId', AuthenticateJWT, SPOCAuth, usersController.getStudentsByCollegeId);

// router.get('/spocs', AuthenticateJWT, AdminAuth, usersController.getSPOCs);
router.get('/spocs', usersController.getSPOCs);

router.get('/admins', AuthenticateJWT, AdminAuth, usersController.getAdmins);

router.get('/counts', AuthenticateJWT, AdminAuth, usersController.getCountsByRoles);

router.put('/update-admin/:id', AuthenticateJWT, AdminAuth, usersController.update);

router.put('/update-password', AuthenticateJWT, usersController.updatePassword);

router.put('/update-student/:id', AuthenticateJWT, SPOCAuth, usersController.update);

router.put('/update-spoc/:id', AuthenticateJWT, AdminAuth, usersController.update);

router.delete('/student/:id', AuthenticateJWT, SPOCAuth, usersController.deleteById);

router.delete('/spoc/:id', AuthenticateJWT, AdminAuth, usersController.deleteById);

router.delete('/admin/:id', AuthenticateJWT, AdminAuth, usersController.deleteById);

router.use('/*', (req, res, next) => {
    res.status(404).json({
        error: "ROUTE_NOT_FOUND",
    });
});

module.exports = router;

