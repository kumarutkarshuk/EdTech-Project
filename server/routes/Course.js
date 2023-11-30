const express = require('express')
const router = express.Router()

//controllers
const {createCategory, showAllCategories, categoryPageDetails} = require('../controllers/Categories')
const {createCourse, showAllCourses, getCourseDetails} = require('../controllers/Course')
const {createRating, getAverageRating, getAllRatingAndReviews} = require('../controllers/RatingAndReview')
const {createSection, updateSection, deleteSection} = require('../controllers/Section')
const {createSubSection, updateSubSection, deleteSubSection} = require('../controllers/subSection')

//middlewares
const {auth, isStudent, isInstructor, isAdmin} = require('../middlewares/auth')

router.post('/createCourse', auth, isInstructor, createCourse)
router.post('/addSection', auth, isInstructor, createSection)
router.post('/updateSection', auth, isInstructor, updateSection)
router.post('/deleteSection', auth, isInstructor, deleteSection)
router.post('/addSubSection', auth, isInstructor, createSubSection)
router.post('/updateSubSection', auth, isInstructor, updateSubSection)
router.post('/deleteSubSection', auth, isInstructor, deleteSubSection)
router.get('/getAllCourses', auth, isInstructor, showAllCourses)
router.post('/getCourseDetails', auth, isInstructor, getCourseDetails)

router.post('/createCategory', auth, isAdmin, createCategory)
router.get('/showAllCategories', auth, isAdmin, showAllCategories)
router.post('/getCategoryPageDetails', auth, isAdmin, categoryPageDetails)

router.post('/createRating', auth, isStudent, createRating)
router.get('/getAverageRating', auth, isStudent, getAverageRating)
router.get('/getReviews', auth, isStudent, getAllRatingAndReviews)

module.exports = router