import {Component, OnInit} from '@angular/core';
import {AppService} from "./services/app.service";
import {WetherModel} from "./models/WetherModel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  WetherData: WetherModel[]=[];
  constructor(private dataService: AppService) { }

  ngOnInit() {
  }
}

