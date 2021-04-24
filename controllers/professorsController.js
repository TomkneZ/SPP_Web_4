var Professor = require('../models/professor');
var Course = require('../models/course');
var School = require('../models/school');
var SchoolType = require('../models/schooltype');

exports.get_active_professors = function (req, res) {
    Professor.find({is_account_active: true}, function (err, docs) {
        if (err) console.log(err);
        res.send(docs);
    })
};

exports.get_professor_active_courses = function (req, res) {
    Professor.findOne({ email: req.params.professor }, function (err, professor) {
        if (err) console.log(err);

        Course
            .find({ professor: professor._id, is_active: true })
            .exec(function (err, courses) {
                if (err) console.log(error);
                res.send(courses);
            });
    });
};

exports.edit_professor = function (req, res) {
    res.send('NOT IMPLEMENTED: Edit professor');
};

exports.add_professor = function (req, res) {
    var school_type3 = new SchoolType({ name: 'High school' });
    var school = new School({ name: 'Liceum BSU Minsk City', is_active: true, school_type: school_type3 });
    var professor = new Professor({
        first_name: 'Ktoto', last_name: 'Ktotov', email: 'ktotov@example.com',
        is_account_active: false, school: school
    });
    professor.save(function (err) {
        if (err) return console.log(err);
        res.send(professor);
    })
};