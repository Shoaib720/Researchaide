const express = require('express');
const collegesController = require('../controllers/collegesController');
const router = express.Router();

router.post('/', collegesController.register);

router.use('/*', (req, res, next) => {
    res.status(404).json({
        error: "ROUTE_NOT_FOUND",
    });
});

module.exports = router;