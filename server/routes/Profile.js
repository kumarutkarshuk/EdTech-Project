const express = require('express')
const router = express.Router()

const {auth} = require('../middlewares/auth')
const{updateProfile, deleteAccount, getAllUserDetails, updateDisplayPicture, getEnrolledCourses} 
= require('../controllers/Profile')

router.put('/updateProfile', auth, updateProfile)
router.delete('./deleteProfile', auth, deleteAccount)
router.get('/getUserDetails', auth, getAllUserDetails)

router.put('/updateDisplayPicture', auth, updateDisplayPicture)
router.get('/getEnrolledCourses', auth, getEnrolledCourses)

module.exports = router