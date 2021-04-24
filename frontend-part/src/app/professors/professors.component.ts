import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Person } from '../models/person';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { AuthService } from '../auth/auth.service';
import { DataService } from '../auth/data.service';

@Component({
    selector: 'professors-app',
    templateUrl: './professors.component.html',
    styleUrls: ['./professors.component.scss'],
    providers: [    
        AuthService
    ]
})

export class ProfessorsComponent implements OnInit {
    public dataSource;
    public displayedColumns: string[] = ['first_name', 'last_name', 'phone', 'email'];
    private subscription: Subscription = new Subscription();

    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('input') input: ElementRef;

    public constructor(        
        private authService: AuthService,       
        private dataService: DataService) {
        this.authService.getActiveProfessors();
    }

    public ngOnInit(): void {
        this.subscription.add(this.dataService.getActiveProfessorsValue().subscribe((data: Person[]) => {
            this.dataSource = new MatTableDataSource(data),
                this.dataSource.sort = this.sort
        }));
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }    

    public applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }

    public onLogout(): void {
        this.authService.logout();
    }
}
