var express = require('express');

var router = express.Router();

var controller = require('../controllers/coursesController');

router.get('/getactivecourses', controller.get_active_courses);

router.get('/getstudentcourses/:student', controller.get_student_courses);

router.get('/getnotstudentcourses/:student', controller.get_not_student_courses);

router.post('/addcourse', controller.add_course);

router.post('/addstudenttocourse/:student/:course', controller.add_student_to_course);

router.delete('/deletestudentfromcourse/:student/:course', controller.delete_student_from_course);

module.exports = router;