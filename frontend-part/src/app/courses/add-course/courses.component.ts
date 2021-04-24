import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../../websocket.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'courses-app',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    providers: [
        WebSocketService
    ]
})

export class AddCourseComponent implements OnInit {
    public addCourseForm: FormGroup;
    public submitted = false;
    public courseAdded: Boolean = false;

    public constructor(     
        private webSocketService: WebSocketService,
        private formBuilder: FormBuilder) { }

    public ngOnInit(): void {
        this.addCourseForm = this.formBuilder.group({
            name: ['', Validators.required],
            uniqueCode: ['', Validators.required]
        });
    }

    get f() { return this.addCourseForm.controls; }

    public onLogout(): void {
        this.webSocketService.logout();
    }

    public onSubmit(): void {
        this.submitted = true;

        if (this.addCourseForm.invalid) {
            return;
        }

        this.courseAdded = true;

        this.webSocketService.addCourse(this.f.name.value, this.f.uniqueCode.value);          
    }
}