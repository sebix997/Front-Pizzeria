import { Component } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {OrderComponentModel} from "../../models/OrderComponentModel";
import {AuthenService} from "../../services/authen.service";
import {SpecjalOrderService} from "../../services/specjalOrder.service";
import {SpecjalOrderComponentModel} from "../../models/SpecjalComponentModel";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
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
        // Przykładowe dane do zaktualizowania (możesz dostosować do swoich potrzeb)
        const updatedData: OrderComponentModel = {
            id: item.id,
            order: item.order, // Zastąp rzeczywistą wartością
            prince: item.prince,      // Zachowaj istniejącą wartość lub zaktualizuj
            name: item.name,          // Zachowaj istniejącą wartość lub zaktualizuj
            lastname: item.lastname,  // Zachowaj istniejącą wartość lub zaktualizuj
            address: item.address,    // Zachowaj istniejącą wartość lub zaktualizuj
            status: 'W drodze',      // Zastąp rzeczywistą wartością
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

    handleSpecialOrderButtonClick(specialItem: SpecjalOrderComponentModel){
        const updatedData: SpecjalOrderComponentModel = {
            id: specialItem.id,
            prince: specialItem.prince,      // Zachowaj istniejącą wartość lub zaktualizuj
            ingredients: specialItem.ingredients,          // Zachowaj istniejącą wartość lub zaktualizuj
            lastname: specialItem.lastname,  // Zachowaj istniejącą wartość lub zaktualizuj
            address: specialItem.address,    // Zachowaj istniejącą wartość lub zaktualizuj
            status: 'W drodze',
            dataUtworzenia: new Date()
        };

        this.specjalOrderService.updateSpecjalOrder(specialItem.id, updatedData).subscribe(
            (response: SpecjalOrderComponentModel) => {
                console.log('Zamówienie zaktualizowane pomyślnie', response);
                // Jeśli chcesz odświeżyć dane po zakończeniu aktualizacji, ponownie pobierz zamówienia
                this.ChoiceElement();
            },
            (error: any) => {
                console.error('Błąd podczas aktualizacji zamówienia', error);
            }
        );
}
  Logout()
  {
   this.AuthenService.setAuthenticated(false);
    window.location.href = '/login';
  }

}
