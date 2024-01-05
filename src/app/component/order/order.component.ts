import { Component, OnInit } from '@angular/core';
import {MenuComponentService} from "../../services/MenuComponent.service";
import {Router} from "@angular/router";


@Component({
    selector: 'app-order',
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
                <h1>ZAMÓWIENIE:</h1>
            <div class="order-details">
                <ng-container *ngIf="orderItems.length > 0; else emptyOrder">
                    <div *ngFor="let item of orderItems" class="order-item">
                        <p class="pizza-name">{{ item.name }}</p>
                        <div class="quantity-controls">
                            <p class="price">CENA: PLN {{ item.cena * item.quantity }}</p>
                            <button class="decrease-button" (click)="decreaseQuantity(item)">-</button>
                            <p class="quantity">ILOŚĆ: {{ item.quantity }}</p>
                            <button class="increase-button" (click)="increaseQuantity(item)">+</button>
                        </div>
                    </div>
                    <p class="total">Łączna kwota: PLN {{ calculateTotalAmount() }}</p>
                    <div class="buttons">
                        <button class="menu-button" (click)="goToMenu()">Przejdź do menu</button>
                        <button class="menu-button" (click)="goToChoice()">Przejdź do realizacji zamówienia</button>
                    </div>
                </ng-container>
                <ng-template #emptyOrder>
                    <p>Twoje zamówienie jest puste, idź do menu wybrać potrawy.</p>
                    <button class="menu-button" routerLink="/menu">Menu</button>
                </ng-template>
            </div>
            </div>


        </div>
    `,
    styleUrls: ['./order.component.css']
})

export class OrderComponent implements OnInit {
    title = 'Pizzeria PoSameBrzegi';
    orderItems: { id: number, name: string, quantity: number, cena: number }[] = [];
    constructor(private router: Router) { }

    ngOnInit(): void {
        const storedOrderItems = sessionStorage.getItem('orderItems');
        if (storedOrderItems) {
            this.orderItems = JSON.parse(storedOrderItems);
        }
    }

    decreaseQuantity(orderItem: any) {
        if (orderItem.quantity > 1) {
            orderItem.quantity--;
            this.updateOrder();
        } else {
            const index = this.orderItems.findIndex(item => item.id === orderItem.id);
            if (index !== -1) {
                this.orderItems.splice(index, 1);
                this.updateOrder();
            }
        }
    }

    increaseQuantity(orderItem: any) {
        orderItem.quantity++;
        this.updateOrder();
    }

    updateOrder() {
        sessionStorage.setItem('orderItems', JSON.stringify(this.orderItems));
    }
    calculateTotalAmount(): number {
        // Użyj metody reduce do obliczenia łącznej kwoty zamówienia
        return this.orderItems.reduce((total, item) => total + item.cena * item.quantity, 0);
    }
    goToMenu() {
        this.router.navigate(['/menu']);
    }

    goToChoice() {
        this.router.navigate(['/choice']);
    }
}
