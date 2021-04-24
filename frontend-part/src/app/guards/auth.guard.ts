import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { DataService } from '../data.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private dataService: DataService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {        
        const currentUserToken = this.dataService.currentUserToken;
        if (currentUserToken) {
            return true;
        }

        this.router.navigate([''], { queryParams: { returnUrl: state.url } });
        return false;
    }
}