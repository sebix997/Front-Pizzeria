import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  username: string = '';
  password: string = '';

  onSubmit() {
    // Tutaj dodaj kod do przetwarzania danych logowania
    console.log('Username:', this.username);
    console.log('Password:', this.password);
  }

}
