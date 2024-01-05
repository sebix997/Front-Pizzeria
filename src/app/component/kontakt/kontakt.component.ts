import { Component } from '@angular/core';

@Component({
  selector: 'app-kontakt',
  template: `
        <div class="header">
            <nav class="navbar">
                <div class="navbar-brand">{{ title }}</div>
                <div class="navbar-end">
                    <a class="navbar-item" routerLink="/menu">Menu</a>
                    <a class="navbar-item" routerLink="/order">Zamowienie</a>
                    <a class="navbar-item" routerLink="/onas">O nas</a>
                    <a class="navbar-item" routerLink="/kontakt">Kontakt</a>
                </div>
            </nav>
        </div>


    <div class="main-content">
        <div class="pizzeria-description">
            <h1>{{ title }}</h1>
            <p>Numer kontaktowy:</p>
            <p>+48 XYZ-XYZ-XYZ</p>
            <p>Adres Pizzeri:</p>
            <p>Miasto: San Domingo</p>
            <p>Ulica: Wschodu Słońca 10</p>
            <div class="image-container">
                <img src="https://us.123rf.com/450wm/stterryk/stterryk1609/stterryk160900034/64037942-pizza-fasada-w-stylu-p%C5%82askiej-eps10-ilustracji-wektorowych-miasta-budynku-publicznego-kwadratowy.jpg?ver=6" alt="Opis obrazu">
            </div>
        </div>

    </div>

    <div class="footer">
        <!-- Footer content here -->
    </div>
  `,
  styleUrls: ['./kontakt.component.css']
})

export class KontaktComponent {
  title = 'Pizzeria PoSameBrzegi';
}

