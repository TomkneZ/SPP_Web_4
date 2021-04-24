import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Observable } from 'rxjs';
import { Person } from '../models/person';

@Injectable({ providedIn: 'root' })
export class ProfessorsService {

    private getActiveProfessorsUrl = 'professors/getactiveprofessors';

    public constructor(private http: HttpClient) { }

    public getActiveProfessors(): Observable<Person[]> {
        return this.http.get<Person[]>(`${environment.host}${this.getActiveProfessorsUrl}`);
    }  
}
