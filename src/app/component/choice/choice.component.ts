import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { OrderConfirmationDialogComponent } from '../order-confirmation-dialog/order-confirmation-dialog.component';

@Component({
  selector: 'app-choice',
  template: `
    <div class="header">
      <nav class="navbar">
        <div class="navbar-brand">{{ title }}</div>
        <div class="navbar-end">
          <a class="navbar-item" routerLink="/menu">Menu</a>
          <a class="navbar-item" routerLink="/order">Zamowienie</a>
          <a class="navbar-item" routerLink="/about-us">O nas</a>
          <a class="navbar-item" routerLink="/kontakt">Kontakt</a>
        </div>
      </nav>
    </div>

    <div class="main-content">
      <div class="pizzeria-description">
        <h1>TWOJE ZAMÓWIENIE:</h1>
        <ng-container *ngIf="orderItems.length === 0; else orderNotEmpty">
          <p>Jest puste</p>
          <button (click)="goToMenu()" class="back-to-menu-button">Wróć do menu</button>
        </ng-container>
        <ng-template #orderNotEmpty>
          <div *ngFor="let item of orderItems" class="order-item">
            <p class="pizza-name">{{ item.name }}</p>
            <div class="quantity-controls">
              <p class="price">CENA: PLN {{ item.cena * item.quantity }}</p>
              <p class="quantity">ILOŚĆ: {{ item.quantity }}</p>
            </div>
          </div>
          <p class="total">Łączna kwota: PLN {{ calculateTotalAmount() }}</p>
          <h1>UZUPELNIJ DANE BY SFINALIZOWAC ZAMOWIENIE:</h1>
          <div class="form">
            <p for="firstName">Imię:</p>
            <input class="writing" type="text" id="firstName" [(ngModel)]="firstName" (change)="logVariables()">
            <p for="lastName">Nazwisko:</p>
            <input class="writing" type="text" id="lastName" [(ngModel)]="lastName" (change)="logVariables()">
            <p for="address">Adres (MIASTO, ULICA, NUMER DOMU/MIESZKANIA):</p>
            <input class="adres" type="text" id="address" [(ngModel)]="address" (change)="logVariables()">
            <p for="phoneNumber">Nr telefonu:</p>
            <input class="writing" type="text" id="phoneNumber" [(ngModel)]="phoneNumber" (change)="logVariables()">
          </div>
          <button (click)="goToMenu()" class="edit-order-button">Wróć do edycji zamówienia</button>
          <button *ngIf="isFormValid" (click)="placeOrder()" class="place-order-button">Złóż zamówienie</button>
        </ng-template>
      </div>
    </div>
  `,
  styleUrls: ['./choice.component.css']
})

export class ChoiceComponent {
  title = 'Pizzeria PoSameBrzegi';
  orderItems: { id: number, name: string, quantity: number, cena: number }[] = [];
  constructor(private router: Router, private dialog: MatDialog) {}
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  phoneNumber: string = '';
  isFormValid: boolean = false; // Flaga określająca, czy formularz jest poprawnie wypełniony

  ngOnInit(): void {
    const storedOrderItems = sessionStorage.getItem('orderItems');
    if (storedOrderItems) {
      this.orderItems = JSON.parse(storedOrderItems);
    }
  }

  calculateTotalAmount(): number {
    return this.orderItems.reduce((total, item) => total + item.cena * item.quantity, 0);
  }

  goToMenu(): void {
    this.router.navigate(['/menu']);
  }

  placeOrder(): void {
    const dialogRef = this.dialog.open(OrderConfirmationDialogComponent, {
      width: '400px', // Ustaw szerokość okna dialogowego według potrzeb
      height: '120px', // Ustaw wysokość okna dialogowego według potrzeb
    });
    // Po zamknięciu okna modalnego, przenieś użytkownika do zakładki menu
    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/menu']);
      // Usuń zmienne z pamięci sesji
      sessionStorage.removeItem('orderItems');
    });
  }

  logVariables(): void {
    console.log('firstName:', this.firstName);
    console.log('lastName:', this.lastName);
    console.log('address:', this.address);
    console.log('phoneNumber:', this.phoneNumber);

    // Sprawdzanie, czy numer telefonu ma co najmniej 9 cyfr
    if (this.phoneNumber.length >= 9) {
      this.isFormValid = this.firstName !== '' && this.lastName !== '' && this.address !== '';
    } else {
      this.isFormValid = false;
    }

    console.log('isFormValid:', this.isFormValid);
  }

}
