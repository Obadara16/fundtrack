const express =require("express")
const router = express.Router()
const {createTransaction, getTransactionById} = require('../controllers/transactionController')
const { requireAuth,  requireAuthAndAdmin } = require("../middlewares/requireAuth");



router.post('/', requireAuth, createTransaction)
router.get('/:transactionId', requireAuth, getTransactionById)


module.exports = router