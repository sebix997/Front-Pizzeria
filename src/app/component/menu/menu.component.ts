import {Component, OnInit} from '@angular/core';
import {MenuComponentModel} from "../../models/MenuComponentModel";
import {MenuComponentService} from "../../services/MenuComponent.service";
import {shareDataService} from "../../services/shareData.service";


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent  implements OnInit{
  sharedData: number[] = [];
  MenuComponent: MenuComponentModel[]=[];
  public IdPizzas: number[] = [];
  constructor(private dataService: MenuComponentService,
              private shareDataService: shareDataService) { }


    addToCart(liczba:number,nazwa:string,cena:number) {
           // this.shareDataService.dodajDoTablicy({data: liczba});
              this.shareDataService.dodajDoTablicy(liczba,nazwa,cena)
            // Tutaj możesz wykonywać dowolne operacje na tablicy numerów
             this.sharedData= this.shareDataService.pobierzTabliceId()
    }
    getItems() {
        return this.IdPizzas;
    }

    clearCart() {
        this.IdPizzas = [];
        return this.IdPizzas;
    }
  ngOnInit() {
   this.dataService.getChoicePizza().subscribe(data => {
     this.MenuComponent =data;
   });
    while(this.MenuComponent.length != 0)
    {
      console.log(this.dataService);
    }
      console.log( this.shareDataService.pobierzTabliceId())
  }

}
