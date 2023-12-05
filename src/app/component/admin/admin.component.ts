import { Component } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {ChoiceService} from "../../services/choice.service";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  public elementFormGroup:FormGroup;

  constructor(private dataService: ChoiceService) {
    this.elementFormGroup=new FormGroup({
      id:new FormControl("id"),
      name:new FormControl("name"),
      quantity:new FormControl("quantity"),
      calories:new FormControl("calories")
    });
  }
  onFormSubmit() {
    this.elementFormGroup.value.id=0;
    console.log(this.elementFormGroup.value);
    this.dataService.postChoiceElements(this.elementFormGroup.value)
      .subscribe(
        response => {
          console.log('Odpowiedź serwera:', response);
        }
      );
  }

}
