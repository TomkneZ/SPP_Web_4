import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Course } from '../models/course';

@Injectable({ providedIn: 'root' })
export class CoursesService {
    private getAvailableCoursesUrl = 'courses/getnotstudentcourses';
    private getAddedCoursesUrl = 'courses/getstudentcourses';
    private addStudentToCourseUrl = 'courses/addstudenttocourse';
    private addCourseUrl = 'courses/addcourse';

    public constructor(private http: HttpClient) { }

    public getAvailableCourses(studentId: string): Observable<Course[]> {
        return this.http.get<Course[]>(`${environment.host}${this.getAvailableCoursesUrl}/${studentId}`);
    }

    public getAddedCourses(studentId: string): Observable<Course[]> {
        return this.http.get<Course[]>(`${environment.host}${this.getAddedCoursesUrl}/${studentId}`);
    }

    public addStudentToCourse(studentId: string, courseId: string): Observable<Object> {
        return this.http.post(`${environment.host}${this.addStudentToCourseUrl}/${studentId}/${courseId}`, null);
    }

    public addCourse(name: string, uniqueCode: number): Observable<Object> {
        const body = { name: name, unique_code: uniqueCode };
        return this.http.post(`${environment.host}${this.addCourseUrl}`, body);    
    }
}
