const express =require("express")
const router = express.Router()
const {loginUser, registerUser, verifyEmail, changePassword, resetPassword, forgotPassword, refreshTokens, requestNewOTP} = require('../controllers/authController')
const {requireAuthAndAuthorization} = require("../middlewares/requireAuth")

router.post('/login', loginUser)
router.post('/signup', registerUser)
router.post('/refresh-token', refreshTokens)
router.post('/verify-email', verifyEmail);
router.post('/request-otp', requestNewOTP);
router.put('/:id/change-password', requireAuthAndAuthorization ,changePassword)// Route for resetting password
router.post('/reset-password/:resetToken', resetPassword);
router.post('/forgot-password', forgotPassword);


module.exports = router