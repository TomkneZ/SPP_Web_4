var express = require('express');

var router = express.Router();

var controller = require('../controllers/professorsController');

router.get('/getactiveprofessors', controller.get_active_professors);

router.get('/getprofessoractivecourses/:professor', controller.get_professor_active_courses);

router.put('/editprofessor', controller.edit_professor);

router.post('/addprofessor', controller.add_professor);

module.exports = router;