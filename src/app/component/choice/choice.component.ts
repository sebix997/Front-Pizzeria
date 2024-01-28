import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from '@angular/material/dialog';
import { OrderConfirmationDialogComponent } from '../order-confirmation-dialog/order-confirmation-dialog.component';
import { OrderComponentModel } from '../../models/OrderComponentModel';
import { OrderService } from '../../services/order.service';


@Component({
  selector: 'app-choice',
  template: `
    <div class="header">
      <nav class="navbar">
        <div class="navbar-brand">{{ title }}</div>
        <div class="navbar-end">
          <a class="navbar-item" routerLink="/menu">Menu</a>
          <a class="navbar-item" routerLink="/wlasne">Stwórz Własną Pizze</a>
          <a class="navbar-item" routerLink="/onas">O nas</a>
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
  constructor(private router: Router, private dialog: MatDialog, private orderService: OrderService) {}
  firstName: string = '';
  lastName: string = '';
  address: string = '';
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
      width: '400px',
      height: '120px',
    });

    dialogRef.afterClosed().subscribe(() => {
      const itemsWithQuantities: string[] = this.orderItems.map(item => `${item.name} (${item.quantity} szt.)`);
      // Przygotuj dane zamówienia do wysłania
      const orderData: OrderComponentModel = {
        id: 0, // Możesz ustawić odpowiednie id lub pozostawić 0, jeśli baza danych generuje id automatycznie
        order: JSON.stringify(itemsWithQuantities),
        prince: this.calculateTotalAmount(),
        name: this.firstName,
        lastname: this.lastName,
        address: this.address,
        status: 'Nowe', // Status zamówienia
        dataUtworzenia: new Date(), // Data utworzenia zamówienia
      };

      // Wyślij dane zamówienia do bazy danych
      this.orderService.postOrder(orderData).subscribe(response => {
        console.log('Zamówienie zostało dodane do bazy danych.', response);

        // Przenieś użytkownika do zakładki menu
        this.router.navigate(['/menu']);

        // Usuń zmienne z pamięci sesji
        sessionStorage.removeItem('orderItems');
      }, error => {
        console.error('Błąd podczas dodawania zamówienia do bazy danych', error);
      });
    });
  }


  logVariables(): void {
    console.log('firstName:', this.firstName);
    console.log('lastName:', this.lastName);
    console.log('address:', this.address);

    this.isFormValid = this.firstName !== '' && this.lastName !== '' && this.address !== '';

    console.log('isFormValid:', this.isFormValid);
  }


}
