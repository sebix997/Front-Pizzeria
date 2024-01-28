import { Component } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {OrderComponentModel} from "../../models/OrderComponentModel";
import {AuthenService} from "../../services/authen.service";
import {SpecjalOrderService} from "../../services/specjalOrder.service";
import {SpecjalOrderComponentModel} from "../../models/SpecjalComponentModel";

@Component({
  selector: 'app-admin',
    template: `
        <div class="header">
            <nav class="navbar">
                <div class="navbar-brand">PoSameBrzegi</div>
                <div class="navbar-end">
                    <a class="navbar-item" (click)="Logout()" style="cursor: pointer;">Wyloguj</a>
                </div>
            </nav>
        </div>



        <h1 style="text-align: center; margin-top: 20px;">Zwykłe zamówienia:</h1>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Zamówienie</th>
                <th>Cena</th>
                <th>Imię i Nazwisko</th>
                <th>Adres</th>
                <th>Data</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let item of OrderComponent">
                <td>{{ item.id }}</td>
                <td>{{ item.order }}</td>
                <td>{{ item.prince }}</td>
                <td>{{ item.name + ' ' + item.lastname }}</td>
                <td>{{ item.address }}</td>
                <td>{{ item.dataUtworzenia | date: 'yyyy-MM-dd HH:mm:ss' }}</td>
                <td><button (click)="handleButtonClick(item)">{{ item.status }}</button></td>
            </tr>
            </tbody>
        </table>
        <h1 style="text-align: center; margin-top:20px;">Własne kompozycje zamówienia:</h1>
        <table>
            <thead>
            <tr>
                <th>ID</th>
                <th>Zamówienie</th>
                <th>Cena</th>
                <th>Imię i Nazwisko</th>
                <th>Adres</th>
                <th>Data</th>
                <th>Status</th>
            </tr>
            </thead>
            <tbody>
            <tr *ngFor="let specialItem of SpecjalOrderComponent">
                <td>{{ specialItem.id }}</td>
                <td>{{ specialItem.ingredients }}</td>
                <td>{{ specialItem.prince }}</td>
                <td>{{ specialItem.lastname }}</td>
                <td>{{ specialItem.address }}</td>
                <td>{{ specialItem.dataUtworzenia | date: 'yyyy-MM-dd HH:mm:ss' }}</td>
                <td><button (click)="handleSpecialOrderButtonClick(specialItem)">{{ specialItem.status }}</button></td>
            </tr>
            </tbody>
        </table>


    `,
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  OrderComponent: OrderComponentModel[]=[];
  SpecjalOrderComponent:SpecjalOrderComponentModel[]=[];

  constructor(private dataService: OrderService,
              private AuthenService: AuthenService,
              private specjalOrderService: SpecjalOrderService) { }

  ngOnInit() {
    this.ChoiceElement();
    while(this.OrderComponent.length != 0)
    {
      console.log(this.dataService);
    }
  }
  ChoiceElement(){
     this.dataService.getOrder().subscribe(data => {
      this.OrderComponent =data;
      console.log(data)
    });

     this.specjalOrderService.getSpecjalOrder().subscribe(data2=>{
         this.SpecjalOrderComponent=data2
     })
  }
    handleButtonClick(item: OrderComponentModel) {
        let newStatus: string;

        // Sprawdź aktualny status i ustaw odpowiedni nowy status
        if (item.status === 'Nowe') {
            newStatus = 'W drodze';
        } else if (item.status === 'W drodze') {
            newStatus = 'Zakończone';
        } else {
            // Jeśli jest inny status, pozostaw go bez zmian
            newStatus = item.status;
        }

        // Przykładowe dane do zaktualizowania (możesz dostosować do swoich potrzeb)
        const updatedData: OrderComponentModel = {
            id: item.id,
            order: item.order, // Zastąp rzeczywistą wartością
            prince: item.prince,      // Zachowaj istniejącą wartość lub zaktualizuj
            name: item.name,          // Zachowaj istniejącą wartość lub zaktualizuj
            lastname: item.lastname,  // Zachowaj istniejącą wartość lub zaktualizuj
            address: item.address,    // Zachowaj istniejącą wartość lub zaktualizuj
            status: newStatus,       // Ustaw nowy status
            dataUtworzenia: new Date()
        };

        this.dataService.updateOrder(item.id, updatedData).subscribe(
            (response: OrderComponentModel) => {
                console.log('Zamówienie zaktualizowane pomyślnie', response);
                // Jeśli chcesz odświeżyć dane po zakończeniu aktualizacji, ponownie pobierz zamówienia
                this.ChoiceElement();
            },
            (error: any) => {
                console.error('Błąd podczas aktualizacji zamówienia', error);
            }
        );
    }


    handleSpecialOrderButtonClick(specialItem: SpecjalOrderComponentModel) {
        let newStatus: string;

        // Sprawdź aktualny status i ustaw odpowiedni nowy status
        if (specialItem.status === 'Nowe') {
            newStatus = 'W drodze';
        } else if (specialItem.status === 'W drodze') {
            newStatus = 'Zakończone';
        } else {
            // Jeśli jest inny status, pozostaw go bez zmian
            newStatus = specialItem.status;
        }

        // Przykładowe dane do zaktualizowania (możesz dostosować do swoich potrzeb)
        const updatedData: SpecjalOrderComponentModel = {
            id: specialItem.id,
            prince: specialItem.prince,      // Zachowaj istniejącą wartość lub zaktualizuj
            ingredients: specialItem.ingredients, // Zachowaj istniejącą wartość lub zaktualizuj
            lastname: specialItem.lastname,  // Zachowaj istniejącą wartość lub zaktualizuj
            address: specialItem.address,    // Zachowaj istniejącą wartość lub zaktualizuj
            status: newStatus,              // Ustaw nowy status
            dataUtworzenia: new Date()
        };

        this.specjalOrderService.updateSpecjalOrder(specialItem.id, updatedData).subscribe(
            (response: SpecjalOrderComponentModel) => {
                console.log('Specjalne zamówienie zaktualizowane pomyślnie', response);
                // Jeśli chcesz odświeżyć dane po zakończeniu aktualizacji, ponownie pobierz zamówienia
                this.ChoiceElement();
            },
            (error: any) => {
                console.error('Błąd podczas aktualizacji specjalnego zamówienia', error);
            }
        );
    }

  Logout()
  {
   this.AuthenService.setAuthenticated(false);
    window.location.href = '/login';
  }

}
