const { registerVehicle } = require('../controllers/transaction');

const router = require('express').Router();

router.post('/vehicle/:id', registerVehicle);

module.exports = router;