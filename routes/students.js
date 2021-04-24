var express = require('express');

var router = express.Router();

var controller = require('../controllers/studentsController');

router.get('/getactivestudents', controller.get_active_students);

router.get('/getschoolactivestudents/:school', controller.get_school_active_students);

router.post('/addstudent', controller.add_student);

module.exports = router;