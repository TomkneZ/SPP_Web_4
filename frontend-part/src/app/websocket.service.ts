import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from './data.service';
import { Router } from '@angular/router';
import { Message } from './models/message';

@Injectable({ providedIn: 'root' })
export class WebSocketService {
    private currentToken: string;
    private socket = new WebSocket("ws://localhost:9000");

    public constructor(
        private cookieService: CookieService,
        private router: Router,
        private dataservice: DataService) {
        this.currentToken = cookieService.get('token');

        this.socket.onmessage = function (event) {
            const resMessage = event.data;
            const res = JSON.parse(resMessage);
            switch (res.type) {
                case 'login': {
                    if (res.isDone) {
                        cookieService.set('token', res.token);
                        cookieService.set('role', res.role);
                        router.navigate(['professors']);
                    }
                    break;
                }

                case 'register': {
                    if (res.isDone) {
                        cookieService.set('token', res.token);
                        cookieService.set('role', res.role);
                        router.navigate(['professors']);
                    }
                    break;
                }

                case 'logout': {
                    if (res.isDone) {
                        cookieService.deleteAll();
                        router.navigate(['']);
                    }
                    break;
                }

                case 'getactiveprofessors': {
                    dataservice.setActiveProfessorsValue(res.professors);
                    break;
                }

                case 'getactivestudents': {
                    dataservice.setActiveStudentsValue(res.students);
                    break;
                }

                case 'getstudentcourses': {
                    dataservice.setAddedCourses(res.courses);
                    break;
                }

                case 'getnotstudentcourses': {
                    dataservice.setAvailableCourses(res.courses);
                    break;
                }
            }
        }
    }  

    private sendRequest(data: string): void {
        if (!this.socket.readyState) {
            this.socket.addEventListener("open", function () {
                this.send(data);
            });
        } else {
            this.socket.send(data);
        }
    }

    public login(email: string, password: string): void {
        const message: Message = { type: 'login', body: { email: email, password: password } };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }

    public register(login: string, email: string, password: string): void {
        const defaultRole = 'student';
        const message: Message = { type: 'register', body: { login: login, email: email, password: password, role: defaultRole } };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }

    public logout(): void {
        const message: Message = {
            type: 'logout',
            body: {
                token: this.currentToken
            }
        };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }

    public getActiveProfessors(): void {
        const message: Message = {
            type: 'getactiveprofessors',
            body: null
        };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }

    public getActiveStudents(): void {
        const message: Message = {
            type: 'getactivestudents',
            body: null
        };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }

    public getStudentCourses(student: string): void {
        const message: Message = {
            type: 'getstudentcourses',
            body: {
                student: student
            }
        };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }

    public getNotStudentCourses(student: string): void {
        const message: Message = {
            type: 'getnotstudentcourses',
            body: {
                student: student
            }
        };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }

    public addCourse(name: string, unique_code: number): void {
        const message: Message = {
            type: 'addcourse',
            body: {
                name: name,
                unique_code: unique_code
            }
        };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }

    public addStudentToCourse(student: string, course: string): void {
        const message: Message = {
            type: 'addstudenttocourse',
            body: {
                student: student,
                course: course
            }
        };
        const data = JSON.stringify(message);
        this.sendRequest(data);
    }
}
