import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';
import { Course } from '../models/course';
import { MatTableDataSource } from '@angular/material/table';
import { WebSocketService } from '../websocket.service';
import { DataService } from '../data.service';

@Component({
    selector: 'courses-app',
    templateUrl: './courses.component.html',
    styleUrls: ['./courses.component.scss'],
    providers: [
        WebSocketService
    ]
})

export class CoursesComponent implements OnInit {
    public availableCoursesDataSource;
    public addedCoursesDataSource;
    public displayedColumns: string[] = ['name', 'unique_code'];
    private subscription: Subscription = new Subscription();
    private studentId = '607742916308a64f7447bf8b';
    public displayAvailable: Boolean = true;

    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('input') input: ElementRef;

    public constructor(
        private dataService: DataService,
        private websocketService: WebSocketService) {
        this.websocketService.getNotStudentCourses(this.studentId);
    }

    public ngOnInit(): void {
        this.subscription.add(this.dataService.getAvailableCourses().subscribe((data: Course[]) => {
            this.availableCoursesDataSource = new MatTableDataSource(data),
                this.availableCoursesDataSource.sort = this.sort
        }));

        this.subscription.add(this.dataService.getAddedCourses().subscribe((data: Course[]) => {
            this.addedCoursesDataSource = new MatTableDataSource(data),
                this.addedCoursesDataSource.sort = this.sort
        }));
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }   

    public applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.availableCoursesDataSource.filter = filterValue.trim().toLowerCase();
    }   

    public onRowClicked(row): void {
        const courseId = row._id;
        this.websocketService.addStudentToCourse(this.studentId, courseId);
        this.websocketService.getStudentCourses(this.studentId);
        this.displayAvailable = false;      
    }

    public onLogout(): void {
        this.websocketService.logout();
    }
}