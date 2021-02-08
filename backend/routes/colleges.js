const express = require('express');
const collegesController = require('../controllers/collegesController');
const router = express.Router();
const AuthenticateJWT = require('../middlewares/jwt-authentication');
const AdminAuth = require('../middlewares/admin-auth');

router.post('/', AuthenticateJWT, AdminAuth, collegesController.register);

router.get('/', AuthenticateJWT, AdminAuth, collegesController.getColleges)

router.get('/counts', AuthenticateJWT, AdminAuth, collegesController.getCollegeCount);

router.put('/update/:id', AuthenticateJWT, AdminAuth, collegesController.updateCollege);

router.delete('/college/:id', AuthenticateJWT, AdminAuth, collegesController.deleteById);

router.use('/*', (req, res, next) => {
    res.status(404).json({
        error: "ROUTE_NOT_FOUND",
    });
});

module.exports = router;