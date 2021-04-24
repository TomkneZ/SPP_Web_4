import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { CoursesService } from '../courses.service'
import { Course } from '../../models/course';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'courses-app',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    providers: [
        CoursesService
    ]
})

export class AddCourseComponent implements OnInit {
    public addCourseForm: FormGroup;
    public submitted = false;
    public courseAdded: Boolean = false;

    public constructor(
        private coursesService: CoursesService,
        private authService: AuthService,
        private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.addCourseForm = this.formBuilder.group({
            name: ['', Validators.required],
            uniqueCode: ['', Validators.required]
        });
    }

    get f() { return this.addCourseForm.controls; }

    public onLogout(): void {
        this.authService.logout();
    }

    public onSubmit(): void {
        this.submitted = true;

        if (this.addCourseForm.invalid) {
            return;
        }

        this.courseAdded = true;

        this.coursesService.addCourse(this.f.name.value, this.f.uniqueCode.value)
            .subscribe(
                (error) => {
                    console.log(error);
                }               
            );
    }
}