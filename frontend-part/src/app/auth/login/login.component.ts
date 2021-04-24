import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'login-app',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        AuthService
    ]   
})

export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public submitted = false;
    private subscription: Subscription = new Subscription();
    public authFailed = false;  

    public constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private cookieService: CookieService,
        private router: Router) {
        if (this.authService.currentUserToken) {
            this.router.navigate(['professors']);
        }       
    }

    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required]
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    get f() { return this.loginForm.controls; }

    public onSubmit(): void {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.authService.login(this.f.email.value, this.f.password.value);       
    }
}
