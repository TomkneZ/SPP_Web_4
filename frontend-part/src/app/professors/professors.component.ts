import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Person } from '../models/person';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from "@angular/material/table";
import { WebSocketService } from '../websocket.service';
import { DataService } from '../data.service';

@Component({
    selector: 'professors-app',
    templateUrl: './professors.component.html',
    styleUrls: ['./professors.component.scss'],
    providers: [    
        WebSocketService
    ]
})

export class ProfessorsComponent implements OnInit {
    public dataSource;
    public displayedColumns: string[] = ['first_name', 'last_name', 'phone', 'email'];
    private subscription: Subscription = new Subscription();

    @ViewChild(MatSort) sort: MatSort;

    @ViewChild('input') input: ElementRef;

    public constructor(        
        private webSocketService: WebSocketService,       
        private dataService: DataService) {
        this.webSocketService.getActiveProfessors();
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
        this.webSocketService.logout();
    }
}
