import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Person } from '../models/person';
import { Course } from '../models/course';

@Injectable({ providedIn: 'root' })

export class DataService {
    private activeProfessors: BehaviorSubject<Person[]>;

    private activeStudents: BehaviorSubject<Person[]>;

    private availableCourses: BehaviorSubject<Course[]>;

    private addedCourses: BehaviorSubject<Course[]>;

    constructor() {
        this.activeProfessors = new BehaviorSubject<Person[]>(null);
        this.activeStudents = new BehaviorSubject<Person[]>(null);
        this.availableCourses = new BehaviorSubject<Course[]>(null);
        this.addedCourses = new BehaviorSubject<Course[]>(null);
    }

    public setActiveProfessorsValue(newValue): void{
        this.activeProfessors.next(newValue);
    }

    public getActiveProfessorsValue(): Observable<Person[]> {
        return this.activeProfessors.asObservable();
    } 

    public setActiveStudentsValue(newValue): void {
        this.activeStudents.next(newValue);
    }

    public getActiveStudentsValue(): Observable<Person[]> {
        return this.activeStudents.asObservable();
    }

    public setAvailableCourses(newValue): void {
        this.availableCourses.next(newValue);
    }

    public getAvailableCourses(): Observable<Course[]> {
        return this.availableCourses.asObservable();
    }

    public setAddedCourses(newValue): void {
        this.addedCourses.next(newValue);
    }

    public getAddedCourses(): Observable<Course[]> {
        this.addedCourses.asObservable;
    }
}