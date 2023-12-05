import {Component, OnInit} from '@angular/core';
import {ChoiceComponentModel} from "../../models/ChoiceComponentModel";
import {ChoiceService} from "../../services/choice.service";


@Component({
  selector: 'app-choice',
  templateUrl: './choice.component.html',
  styleUrls: ['./choice.component.css']
})
export class ChoiceComponent  implements OnInit{
  ChoiceComponent: ChoiceComponentModel[]=[];

  constructor(private dataService: ChoiceService) { }

  ngOnInit() {
    this.ChoiceElement();
    while(this.ChoiceComponent.length != 0)
    {
      console.log(this.dataService);
    }
  }
  ChoiceElement(){
    this.dataService.getChoiceElements().subscribe(data => {
      this.ChoiceComponent =data;
    });
  }
}
