var Student = require('../models/student');
var Course = require('../models/course');

exports.add_course = function (req, res) {
    var course = new Course({ name: req.body.name, unique_code: req.body.unique_code });
    course.save(function (err) {
        if (err) return console.log(err);
        res.send(`model ${course} was added`);
    });
};

exports.get_active_courses = function (req, res) {
    Course.find({ is_active: true }, function (err, docs) {
        if (err) return console.log(err);
        res.send(docs);
    })
};

exports.get_student_courses = function (req, res) {
    let studentId = req.params.student;
    Student.findById(studentId, function (err, student) {
        Course.find(function (err, courses) {
            if (err) console.log(err);
            var studentCourses = [];
            courses.forEach(function (course) {
                if (course.students.includes(student._id)) {
                    studentCourses.push(course);
                }
            })
            res.send(studentCourses);
        })
    })
};

exports.get_not_student_courses = function (req, res) {
    let studentId = req.params.student;
    Student.findById(studentId, function (err, student) {
        Course.find(function (err, courses) {
            if (err) console.log(err);
            var notStudentCourses = [];
            courses.forEach(function (course) {
                if (!course.students.includes(student._id)) {
                    notStudentCourses.push(course);
                }
            })
            res.send(notStudentCourses);
        })
    })
}

exports.add_student_to_course = function (req, res) {
    let studentId = req.params.student;
    let courseId = req.params.course;
    Student.findById(studentId, function (err, student) {
        Course.findByIdAndUpdate(courseId, { students: [student._id] }, function (err, course) {
            if (err) res.send(false);
            res.send(true);
        })
    })
};

exports.delete_student_from_course = function (req, res) {
    res.send('NOT IMPLEMENTED: Delete student from course');
};