import { Component,OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {shareDataService} from "../../services/shareData.service";
import {OrderService} from "../../services/order.service";

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
              private OrderService: OrderService) {

  }

  getProductData() {

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
              }
          );
      this.shareDataService.clearData();
  }

  obliczSume(): number {
        return this.CenaPizzas.reduce((acc, value) => acc + value, 0);
    }
    ngOnInit(): void {
        this.IdPizzas=this.shareDataService.pobierzTabliceId();
        this.NamePizzas=this.shareDataService.pobierzTabliceName();
        this.CenaPizzas=this.shareDataService.pobierzTabliceCena();

    }


}
