import {Component, OnInit} from '@angular/core';
import {MenuComponentModel} from "../../models/MenuComponentModel";
import {MenuComponentService} from "../../services/MenuComponent.service";
import { Router } from '@angular/router'; // Import Router

@Component({
    selector: 'app-menu',
    template: `
        <div class="header">
            <nav class="navbar">
                <div class="navbar-brand">Pizzeria PoSameBrzegi</div>
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
                <h1>MENU:</h1>
                <div class="menu-description">
                    <h1>ZAMÓWIENIE:</h1>
                    <div *ngFor="let item of orderItems" class="order-item">
                        <div class="order-item-content">
                            <p class="pizza-name">{{ item.name }}</p>
                        </div>
                        <div class="quantity-controls">
                            <p class="price">PLN {{ item.cena * item.quantity }}</p>
                            <button class="decrease-button" (click)="decreaseQuantity(item)">-</button>
                            <p class="quantity">{{ item.quantity }}</p>
                            <button class="increase-button" (click)="increaseQuantity(item)">+</button>
                        </div>
                    </div>
                    <p class="total">Łączna kwota: PLN {{ calculateTotalAmount() }}</p>
                    <button (click)="navigateToOrder()" class="menu-button">Przejdź do zamówienia</button>
                </div>
                <div *ngFor="let item of menuItems" class="menu-item">
                    <div class="image">
                    <img [src]="item.image" alt="Image of {{ item.name }}">
                    </div>
                    <div class="item-details">
                        <h3>{{ item.name }}</h3>
                        <p>{{ item.ingredients }}</p>
                        <p>{{ item.description }}</p>
                        <strong><p>{{ item.cena | currency:'PLN ' }}</p></strong>
                        <button class="menu-button" (click)="addToOrder(item.id)">Dodaj do zamówienia</button>
                    </div>
            </div>
        </div>
        </div>

    `,
    styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
    menuItems: MenuComponentModel[] = [];
    orderItems: { id: number, name: string, quantity: number, cena: number }[] = [];
    constructor(private menuService: MenuComponentService, private router: Router) { }

    ngOnInit(): void {
        this.fetchMenuData();

        // Odczytaj dane zamówienia z sessionStorage po załadowaniu komponentu
        const storedOrderItems = sessionStorage.getItem('orderItems');
        if (storedOrderItems) {
            this.orderItems = JSON.parse(storedOrderItems);
        }
    }

    fetchMenuData() {
        this.menuService.getChoicePizza().subscribe(data => {
            this.menuItems = data;
        });
    }
    addToOrder(itemId: number) {
        const menuItem = this.menuItems.find(item => item.id === itemId);

        if (menuItem) {
            const existingItem = this.orderItems.find(item => item.id === itemId);

            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                this.orderItems.push({ ...menuItem, quantity: 1 });
            }

            sessionStorage.setItem('orderItems', JSON.stringify(this.orderItems));
        }
    }
    calculateTotalAmount(): number {
        // Użyj metody reduce do obliczenia łącznej kwoty zamówienia
        return this.orderItems.reduce((total, item) => total + item.cena * item.quantity, 0);
    }
    decreaseQuantity(orderItem: any) {
        if (orderItem.quantity > 1) {
            orderItem.quantity--;
            this.updateOrder();
        } else {
            // Jeśli ilość spadnie do zera, usuń pozycję z zamówienia
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
    navigateToOrder() {
        this.router.navigate(['/order']); // Przeniesienie do komponentu "order"
    }

}

