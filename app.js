var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var WebSocket = require('ws');

var indexRouter = require('./routes/index');
var cors = require('cors');

const User = require('./models/User');
const Professor = require('./models/Professor');
const Student = require('./models/Student');
const Course = require('./models/Course');

var app = express();

app.use(cors({
    origin: [
        process.env.FRONTEND_URL
    ], credentials: true
}));

app.options('*', cors());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);

let wsServer = new WebSocket.Server({ port: '9000' });

wsServer.on('connection', async function (ws) {  
    ws.on('message', async function (message) {
        let res = {};
        let data = JSON.parse(message);
        res.type = data.type
        switch (data.type) {
            case 'register': {
                try {
                    const user = new User(data.body);
                    await user.save();
                    res.token = await user.generateAuthToken();
                    res.role = user.role;
                    res.isDone = true;
                    ws.send(JSON.stringify(res));
                } catch (error) {
                    console.log(error);
                    res.isDone = false;
                    ws.send(JSON.stringify(res));
                }
                break;
            }

            case 'login': {
                try {
                    const { email, password } = data.body;
                    const user = await User.findByCredentials(email, password);
                    if (!user) {
                        res.isDone = false;
                        ws.send(JSON.stringify(res));
                    }
                    res.token = await user.generateAuthToken();
                    res.role = user.role;
                    res.isDone = true;
                    ws.send(JSON.stringify(res));
                } catch (error) {
                    console.log(error);
                    res.isDone = false;
                    ws.send(JSON.stringify(res));
                }
                break;
            }

            case 'logout': {
                try {
                    const user = await User.findOne({ 'tokens.token': data.body.token });
                    if (!user) {
                        throw new Error();
                    }
                    user.tokens = user.tokens.filter((token) => {
                        return token.token != data.body.token;
                    })
                    await user.save();
                    res.isDone = true;
                    ws.send(JSON.stringify(res));
                } catch (error) {
                    console.log(error);
                    res.isDone = false;
                    ws.send(JSON.stringify(res));
                }
                break;
            }

            case 'addcourse': {
                var course = new Course({ name: data.body.name, unique_code: data.body.unique_code });
                course.save(function (err) {
                    if (err) {
                        console.log(err);
                        res.isDone = false;
                        ws.send(JSON.stringify(res));
                    }
                    res.isDone = true;
                    ws.send(JSON.stringify(res));
                });
                break;
            }

            case 'addstudenttocourse': {
                let studentId = data.body.student;
                let courseId = data.body.course;
                Student.findById(studentId, function (err, student) {
                    Course.findByIdAndUpdate(courseId, { students: [student._id] }, function (err, course) {
                        if (err) {
                            console.log(err);
                            res.isDone = false;
                            ws.send(JSON.stringify(res));
                        }
                        res.isDone = true;                        
                        ws.send(JSON.stringify(res));
                    })
                })
                break;
            }

            case 'getactiveprofessors': {
                Professor.find({ is_account_active: true }, function (err, professors) {
                    if (err) {
                        console.log(err);
                        res.isDone = false;
                        ws.send(JSON.stringify(res));
                    }
                    res.isDone = true;
                    res.professors = professors;
                    ws.send(JSON.stringify(res));
                });
                break;
            }

            case 'getactivestudents': {
                Student.find({ is_account_active: true }, function (err, students) {
                    if (err) {
                        console.log(err);
                        res.isDone = false;
                        ws.send(JSON.stringify(res));
                    }
                    res.isDone = true;
                    res.students = students;
                    ws.send(JSON.stringify(res));
                });
                break;
            }

            case 'getstudentcourses': {
                Student.findById(data.body.student, function (err, student) {
                    Course.find(function (err, courses) {
                        if (err) {
                            console.log(err);
                            res.isDone = false;
                            ws.send(JSON.stringify(res));
                        }
                        var studentCourses = [];
                        courses.forEach(function (course) {
                            if (course.students.includes(student._id)) {
                                studentCourses.push(course);
                            }
                        });
                        res.isDone = true;
                        res.courses = studentCourses;
                        ws.send(JSON.stringify(res));
                    });
                });
                break;
            }

            case 'getnotstudentcourses': {
                Student.findById(data.body.student, function (err, student) {
                    Course.find(function (err, courses) {
                        if (err) {
                            console.log(err);
                            res.isDone = false;
                            ws.send(JSON.stringify(res));
                        }
                        var notStudentCourses = [];
                        courses.forEach(function (course) {
                            if (!course.students.includes(student._id)) {
                                notStudentCourses.push(course);
                            }
                        });
                        res.isDone = true;
                        res.courses = notStudentCourses;
                        ws.send(JSON.stringify(res));
                    });
                });
                break;
            }
        }
    })
});

module.exports = app;
