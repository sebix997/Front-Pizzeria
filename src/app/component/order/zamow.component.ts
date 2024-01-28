import { Component,OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {shareDataService} from "../../services/shareData.service";
import {OrderService} from "../../services/order.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {WlasneComponent} from "../wlasne/wlasne.component";
import {PizzaService} from "../../services/wlasne.service";
import {SpecjalOrderService} from "../../services/specjalOrder.service";
import {SpecjalIntegrentsComponentModel} from "../../models/SpecjalIntegrentsComponentModel";

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class ZamowComponent implements OnInit{

    pizzaData: any;

    sharedData: number[] = [];

    public ZamowFormGroup: FormGroup = new FormGroup({
        id: new FormControl("id"),
        name: new FormControl("Name"),
        lastname: new FormControl("lastname"),
        address: new FormControl("Address")
    });
    public IdPizzas: number[] = [];
    public NamePizzas: string[] = [];
    public CenaPizzas: number[] = [];
  constructor(private shareDataService: shareDataService,
              private OrderService: OrderService,
              private router: Router,
              private snackBar: MatSnackBar,
              private spcjalOrderService: SpecjalOrderService) {

  }


    onFormSubmit() {
      if(!this.pizzaData)
      {
          console.log("1");
          this.ZamowFormGroup.value.id = 0;
          this.ZamowFormGroup.value.order = this.NamePizzas.join(', ');
          this.ZamowFormGroup.value.price = this.obliczSume(); // Poprawka: zmiana prince na price
          this.ZamowFormGroup.value.status = "New";
          console.log(this.ZamowFormGroup.value);
          this.OrderService.postOrder(this.ZamowFormGroup.value)
              .subscribe(
                  response => {
                      console.log(response);
                      this.shareDataService.clearData();
                      // this.router.navigate(['/menu']);
                      setTimeout(() => {
                          this.showSuccessSnackBar('Zamówienie zostało poprawnie złożone!');
                      });
                  }
              );
      }
      else {

          this.pizzaData = this.shareDataService.getPizzaData();


          console.log(  this.pizzaData.prince )

          this.ZamowFormGroup.value.id = 0;
          this.ZamowFormGroup.value.prince = this.pizzaData.prince;
          this.ZamowFormGroup.value.ingredients = this.pizzaData.ingredients;
          this.ZamowFormGroup.value.status = "New";
          console.log(this.ZamowFormGroup.value);
          this.spcjalOrderService.postSpecjalOrder(this.ZamowFormGroup.value)
              .subscribe(
                  response => {
                      console.log(response);
                      this.shareDataService.clearData();
                      // this.router.navigate(['/menu']);
                      setTimeout(() => {
                          this.showSuccessSnackBar('Zamówienie zostało poprawnie złożone!');
                      });
                  }
              );
      }


    }



    private showSuccessSnackBar(message: string): void {
        const snackBarRef = this.snackBar.open(message, 'Zamknij', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
        });

        snackBarRef.afterDismissed().subscribe(() => {
            // Po zamknięciu snackbar'a, przekieruj do menu
            this.router.navigate(['/menu']);
        });
    }


  obliczSume(): number {
        return this.CenaPizzas.reduce((acc, value) => acc + value, 0);
    }
    ngOnInit(): void {
        this.pizzaData=this.shareDataService.getPizzaData();


        if(!this.pizzaData)
        {
            this.IdPizzas=this.shareDataService.pobierzTabliceId();
            this.NamePizzas=this.shareDataService.pobierzTabliceName();
            this.CenaPizzas=this.shareDataService.pobierzTabliceCena();
        }

    }


}
