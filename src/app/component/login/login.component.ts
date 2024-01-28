import { Component } from '@angular/core';
import {LoginComponentModel} from "../../models/LoginComponentModel";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {AuthenService} from "../../services/authen.service";

@Component({
  selector: 'app-login',
    template: `
        <div class="main-content">
        <div class="pizzeria-description">
            <h2 class="mb-4">Login</h2>
            <form (ngSubmit)="onSubmit()">
                <div class="mb-3">
                    <label for="username" class="form-label">Username:</label>
                    <input type="text" id="username" name="username" [(ngModel)]="username" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label for="password" class="form-label">Password:</label>
                    <input type="password" id="password" name="password" [(ngModel)]="password" class="form-control" required>
                </div>
                <div class="error-message" *ngIf="loginError">Wprowadzone logowanie jest niepoprawne!</div>
                <button (click)="onSubmit()" class="login">Zaloguj</button>
            </form>
        </div>
        </div>

    `,
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
    LoginComponent: LoginComponentModel[] = [];

    constructor(private loginService: LoginService,
                private router: Router,
                private AuthenService: AuthenService) {
    }

    username: string = '';
    password: string = '';

// Deklaracja zmiennej loginError
    loginError: boolean = false;

// W metodzie onSubmit() obsłuż błąd logowania
    onSubmit() {
        const loginModel: LoginComponentModel = {
            id: 0,
            userName: this.username,
            userPassword: this.password
        };

        this.loginService.Login(loginModel).subscribe(response => {
            console.log('Zalogowano pomyślnie!', response);
            this.AuthenService.setAuthenticated(true);
            this.router.navigate(['/admin']);
        }, error => {
            console.error('Błąd logowania', error);

            // Ustaw loginError na true w przypadku błędu logowania
            this.loginError = true;
        });
    }

}
