import { Component } from '@angular/core';
import {OrderService} from "../../services/order.service";
import {OrderComponentModel} from "../../models/OrderComponentModel";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  OrderComponent: OrderComponentModel[]=[];

  constructor(private dataService: OrderService) { }

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
    });
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
            status: 'W drodze'      // Zastąp rzeczywistą wartością
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

}
