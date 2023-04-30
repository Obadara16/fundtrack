const express =require("express")
const router = express.Router()
const {getWalletBalance, addFunds, withdrawFunds} = require('../controllers/walletController')
const { requireAuth,  requireAuthAndAdmin } = require("../middlewares/requireAuth");



router.get('/:userId', requireAuth, getWalletBalance);
router.post('/add', requireAuth, addFunds);
router.post('/withdraw', requireAuth, withdrawFunds);



module.exports = router