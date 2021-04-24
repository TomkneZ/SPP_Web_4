import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({ providedIn: 'root' })
export class StudentsService {

    private getActiveStudentsUrl = 'students/getactivestudents';

    public constructor(private http: HttpClient) { }

    public getActiveStudents(): Observable<Person[]> {
        return this.http.get<Person[]>(`${environment.host}${this.getActiveStudentsUrl}`);
    }
}
