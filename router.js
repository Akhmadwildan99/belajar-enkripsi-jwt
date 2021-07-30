const router = require('express').Router();
const auth = require('./controllers/authcontroller');
const restrict = require('./middlewares/restrict')

router.post('/api/v1/auth/register', auth.register)
router.post('/api/v1/auth/login', auth.login);

router.get('/api/v1/auth/whoami', restrict, auth.whoami)

module.exports = router;