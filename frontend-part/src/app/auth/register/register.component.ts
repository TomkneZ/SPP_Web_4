import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'register-app',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    providers: [
        AuthService
    ]
})

export class RegisterComponent implements OnInit {
    public registerForm: FormGroup;
    public submitted = false;
    private subscription: Subscription = new Subscription();
    public  registerFailed = false;

    public constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private authService: AuthService) { }

    public ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
            login: ['', Validators.required],
            email: ['', Validators.required, Validators.email],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    public ngOnDestroy(): void {
        this.subscription.unsubscribe();
    }

    get f() { return this.registerForm.controls; }

    public onSubmit(): void {
        this.submitted = true;

        if (this.registerForm.invalid) {
            return;
        }

        this.authService.register(this.f.login.value, this.f.email.value, this.f.password.value);        
    }
}
