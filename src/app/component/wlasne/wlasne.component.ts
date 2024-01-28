import {Component, OnInit} from '@angular/core';
import {PizzaService} from "../../services/wlasne.service";
import {SpecjalOrderService} from "../../services/specjalOrder.service";
import {shareDataService} from "../../services/shareData.service";
import { Router } from '@angular/router';
import {SpecjalIntegrentsComponentModel} from "../../models/SpecjalIntegrentsComponentModel";

@Component({
  selector: 'app-wlasne',
  template: `
        <div class="header">
            <nav class="navbar">
                <div class="navbar-brand">PoSameBrzegi</div>
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
          <div class="pizza-creator">
            <h2 style="text-align: center;">Stwórz swoją pizzę</h2>
            <div *ngIf="ingredients.length > 0">
              <h3>Wybierz składniki:</h3>
              <div class="ingredients-container" *ngFor="let ingredient of ingredients">
                <input type="checkbox" [id]="ingredient.id" (change)="onIngredientToggle(ingredient, $event)">
                <label [for]="ingredient.id">{{ ingredient.name }}</label>
              </div>
              <div *ngIf="ingredients.length === 0">
                <p>Ładowanie składników...</p>
              </div>

              <button (click)="submitPizza()" class="zamow">Zamów pizzę</button>
            </div>
          </div>
        </div>
    </div>
    `,
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
      alert("Musisz wybrać conajmniej 4 składniki");
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
      this.router.navigate(['/specjal-order']);
  }
}
