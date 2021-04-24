import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class ProfessorsGuard implements CanActivate {
    constructor(
        private router: Router,
        private authService: AuthService,
        private cookieService: CookieService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentRole = this.cookieService.get('role');
        if (currentRole == 'professor') {
            return true;
        }

        this.router.navigate(['courses'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}