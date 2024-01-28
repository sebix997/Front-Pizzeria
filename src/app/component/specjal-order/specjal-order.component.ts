import { Component, OnInit } from '@angular/core';
import { shareDataService } from '../../services/shareData.service';
import { SpecjalIntegrentsComponentModel } from '../../models/SpecjalIntegrentsComponentModel';
import {OrderConfirmationDialogComponent} from "../order-confirmation-dialog/order-confirmation-dialog.component";
import { MatDialog } from '@angular/material/dialog';
import {Router} from "@angular/router";
import {SpecjalOrderComponentModel} from "../../models/SpecjalComponentModel";
import {OrderService} from "../../services/order.service";
import {SpecjalOrderService} from "../../services/specjalOrder.service";

@Component({
  selector: 'app-specjal-order',
    template: `
        <div class="header">
            <nav class="navbar">
                <div class="navbar-brand">PoSameBrzegi</div>
                <div class="navbar-end">
                    <a class="navbar-item" routerLink="/menu">Menu</a>
                    <a class="navbar-item" routerLink="/wlasne">Stwórz Własną Pizze</a>
                    <a class="navbar-item" routerLink="/about-us">O nas</a>
                    <a class="navbar-item" routerLink="/kontakt">Kontakt</a>
                </div>
            </nav>
        </div>


    <div class="main-content">
        <div class="pizzeria-description">
          <ng-container *ngIf="skladnikiIstnieja; else brakSkladnikow">
            <h3>TWOJA CUSTOMOWA PIZZA:</h3>
            <p>Składniki: {{ pizzaData?.ingredients }}</p>
            <p>Cena: {{pizzaData?.prince}}</p>
            <h1>UZUPELNIJ DANE BY SFINALIZOWAC ZAMOWIENIE:</h1>
            <div class="form">
              <p for="firstName">Imię:</p>
              <input class="writing" type="text" id="firstName" [(ngModel)]="firstName" (change)="logVariables()">
              <p for="lastName">Nazwisko:</p>
              <input class="writing" type="text" id="lastName" [(ngModel)]="lastName" (change)="logVariables()">
              <p for="address">Adres (MIASTO, ULICA, NUMER DOMU/MIESZKANIA):</p>
              <input class="adres" type="text" id="address" [(ngModel)]="address" (change)="logVariables()">
            </div>
          </ng-container>
          <button *ngIf="isFormValid" (click)="placeOrder()" class="place-order-button">Złóż zamówienie</button>
          <ng-template #brakSkladnikow>
            <p>Brak składników.</p>
            <button [routerLink]="['/wlasne']" class="back-to-menu-button">Wróć do kreatora pizzy</button>
          </ng-template>
        </div>
    </div>
    `,
  styleUrls: ['./specjal-order.component.css']
})
export class SpecjalOrderComponent implements OnInit {
  pizzaData?: SpecjalIntegrentsComponentModel; // Zmienna przechowująca dane pizzy
  skladnikiIstnieja: boolean = false; // Zmienna wskazująca, czy składniki istnieją
  constructor(private shareDataService: shareDataService, private router: Router, private dialog: MatDialog, private SpecjalOrderService: SpecjalOrderService) {}
  firstName: string = '';
  lastName: string = '';
  address: string = '';
  isFormValid: boolean = false; // Flaga określająca, czy formularz jest poprawnie wypełniony
  ngOnInit() {
    this.pizzaData = this.shareDataService.getPizzaData();

    if (this.pizzaData) {
      this.skladnikiIstnieja = true;
    }
  }
  logVariables(): void {
    console.log('firstName:', this.firstName);
    console.log('lastName:', this.lastName);
    console.log('address:', this.address);

    this.isFormValid = this.firstName !== '' && this.lastName !== '' && this.address !== '';

    console.log('isFormValid:', this.isFormValid);
  }

  placeOrder(): void {
    const dialogRef = this.dialog.open(OrderConfirmationDialogComponent, {
      width: '400px',
      height: '120px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Przygotuj dane zamówienia do wysłania
      const SpecjalOrderData: SpecjalOrderComponentModel = {
        id: 0, // Możesz ustawić odpowiednie id lub pozostawić 0, jeśli baza danych generuje id automatycznie
        prince: this.pizzaData?.prince || 0, // Użyj wartości 0 jako domyślnej, jeśli this.pizzaData?.prince jest undefined
        ingredients: this.pizzaData?.ingredients || '', // Użyj pustego ciągu znaków jako domyślnej wartości, jeśli this.pizzaData?.ingredients jest undefined
        lastname: `${this.firstName} ${this.lastName}`,
        address: this.address,
        status: 'Nowe', // Status zamówienia
        dataUtworzenia: new Date(), // Data utworzenia zamówienia
      };

      // Wyślij dane zamówienia do bazy danych
      this.SpecjalOrderService.postSpecjalOrder(SpecjalOrderData).subscribe(response => {
        console.log('Zamówienie zostało dodane do bazy danych.', response);

        // Przenieś użytkownika do zakładki menu
        this.router.navigate(['/menu']);

        // Usuń zmienne z pamięci sesji
        sessionStorage.clear();
      }, error => {
        console.error('Błąd podczas dodawania zamówienia do bazy danych', error);
      });
    });
  }
}


