const { registerUser, loginUser } = require('../controllers/user');

const router = require('express').Router();



router.post('/login', loginUser)
router.post('/register', registerUser)


module.exports = router;