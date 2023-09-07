const router = require('express').Router();
const {checkAuth} = require('../middleware/auth.js')
const singUp = require('../controllers/AuthController.js')
const {validateLoginMiddleware, validate} = require('../middleware/validatorLogin.middleware.js')

//*users/////
router.post('/login',validateLoginMiddleware, validate,singUp.signup);
router.post('/singDecode',singUp.singDecode);

module.exports = router;
