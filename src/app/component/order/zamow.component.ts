import { Component,OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {shareDataService} from "../../services/shareData.service";
import {OrderService} from "../../services/order.service";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class ZamowComponent implements OnInit{
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
              private snackBar: MatSnackBar) {

  }


  onFormSubmit() {
      this.ZamowFormGroup.value.id=0;
      this.ZamowFormGroup.value.order=this.NamePizzas.join(', ');
      this.ZamowFormGroup.value.prince=this.obliczSume();
      this.ZamowFormGroup.value.status="New";
      console.log(this.ZamowFormGroup.value);
      this.OrderService.postOrder(this.ZamowFormGroup.value)
          .subscribe(
              response => {
                  console.log(response);
                //  this.router.navigate(['/menu']);
                  setTimeout(() => {
                      this.showSuccessSnackBar('Zamówienie zostało poprawnie złożone!');
                  });
              }
          );
      this.shareDataService.clearData();
  }

    private showSuccessSnackBar(message: string): void {
        this.snackBar.open(message, 'Zamknij', {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'bottom',
        });
    }


  obliczSume(): number {
        return this.CenaPizzas.reduce((acc, value) => acc + value, 0);
    }
    ngOnInit(): void {

        this.showSuccessSnackBar('Testowy snack bar');
        this.IdPizzas=this.shareDataService.pobierzTabliceId();
        this.NamePizzas=this.shareDataService.pobierzTabliceName();
        this.CenaPizzas=this.shareDataService.pobierzTabliceCena();



    }


}
