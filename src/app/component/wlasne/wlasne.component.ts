import {Component, OnInit} from '@angular/core';
import {PizzaService} from "../../services/wlasne.service";
import {SpecjalOrderService} from "../../services/specjalOrder.service";
import {shareDataService} from "../../services/shareData.service";
import { Router } from '@angular/router';
import {SpecjalIntegrentsComponentModel} from "../../models/SpecjalIntegrentsComponentModel";

@Component({
  selector: 'app-wlasne',
  templateUrl: './wlasne.component.html',
  styleUrls: ['./wlasne.component.css']
})
export class WlasneComponent implements OnInit {
  ingredients: any[] = [];
  selectedIngredients: any[] = [];
  DATA?: SpecjalIntegrentsComponentModel;

  constructor(private shareDataService: shareDataService,
              private pizzaService: PizzaService,
              private router:Router,
              private specjal:SpecjalOrderService) {}

  ngOnInit() {
    this.pizzaService.getIngredients().subscribe(data => {
      this.ingredients = data;
    });
  }

  onIngredientToggle(ingredient: any, event: Event) {
    const checkbox = event.target as HTMLInputElement;
    const isChecked = checkbox.checked;

    if (isChecked) {
      this.selectedIngredients.push(ingredient);
    } else {
      this.selectedIngredients = this.selectedIngredients.filter(i => i !== ingredient);
    }
  }

  submitPizza() {
    if (this.selectedIngredients.length < 4) {
      alert("Please select at least 4 ingredients.");
      return;
    }

      const ingredientsString = this.selectedIngredients.map(ingredient => ingredient.name).join(', ');
      const totalPrice = this.selectedIngredients.length * 5;


      // Tworzenie obiektu DATA zgodnie z interfejsem SpecjalIntegrentsComponentModel
      this.DATA = {
          prince: totalPrice,
          ingredients: ingredientsString
      };
      this.shareDataService.saveSpecjalPizzaData(this.DATA );
      this.router.navigate(['/order']);
  }
}
