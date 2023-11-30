const express = require('express')
const router = express.Router()

const {capturePayment, verifySignature} = require('../controllers/Payment')
const {auth, isStudent, isInstructor, isAdmin} = require('../middlewares/auth')

router.post('/verifySignature', verifySignature)
router.post('/capturePayment', capturePayment)

module.exports = router