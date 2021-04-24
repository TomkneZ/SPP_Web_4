var Student = require('../models/student');
var School = require('../models/school');
var SchoolType = require('../models/schooltype');

exports.get_active_students = function (req, res) {
    Student.find({ is_account_active: true }, function (err, docs) {
        if (err) return console.log(err);
        res.send(docs);
    });
};

exports.get_school_active_students = function (req, res) {
    School.findOne({ name: req.params.school }, function (err, school) {
        if (err) console.log(err);

        Student
            .find({ school: school._id, is_account_active: true })
            .exec(function (err, students) {
                if (err) console.log(error);
                res.send(students);
            });
    });    
};

exports.add_student = function (req, res) {
    var school_type1 = new SchoolType({ name: 'Primary school' });
    var school_type2 = new SchoolType({ name: 'Secondary school' });
    var school_type3 = new SchoolType({ name: 'High school' });
    var school = new School({ name: 'Liceum BSU Minsk City', is_active: true, school_type: school_type3 });
    var student = new Student({
        first_name: 'Petr', last_name: 'Petrov', email: 'petrov@example.com', phone: '+123456788909',
        is_account_active: false, school: school
    });
    student.save(function (err) {
        if (err) return console.log(err);
        res.send(student);
    })
};