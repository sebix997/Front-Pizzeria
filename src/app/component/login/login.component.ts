import { Component } from '@angular/core';
import {LoginComponentModel} from "../../models/LoginComponentModel";
import {LoginService} from "../../services/login.service";
import {Router} from "@angular/router";
import {AuthenService} from "../../services/authen.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
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

    onSubmit() {
        const loginModel: LoginComponentModel = {
            id: 0,
            userName: this.username,
            userPassword: this.password
        };

        this.loginService.Login(loginModel).subscribe(response => {
            console.log('Zalogowano pomyślnie!', response)
          this.AuthenService.setAuthenticated(true);
            this.router.navigate(['/admin']);
        }, error => {
            console.error('Błąd logowania', error);
        });
    }
}
