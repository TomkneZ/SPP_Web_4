import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WebSocketService } from '../../websocket.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
    selector: 'login-app',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    providers: [
        WebSocketService
    ]   
})

export class LoginComponent implements OnInit {
    public loginForm: FormGroup;
    public submitted = false;

    public constructor(
        private formBuilder: FormBuilder,
        private webSocketService: WebSocketService,
        private router: Router) {
        if (this.webSocketService.currentUserToken) {
            this.router.navigate(['professors']);
        }       
    }

    public ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            email: ['', Validators.required, Validators.email],
            password: ['', Validators.required]
        });
    }   

    get f() { return this.loginForm.controls; }

    public onSubmit(): void {
        this.submitted = true;

        if (this.loginForm.invalid) {
            return;
        }

        this.webSocketService.login(this.f.email.value, this.f.password.value);       
    }
}
