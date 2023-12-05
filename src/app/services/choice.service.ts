import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ChoiceComponentModel} from "../models/ChoiceComponentModel";

@Injectable({
  providedIn: 'root'
})
export class ChoiceService {

  //baseApiUrl:string=environment.baseApiUrl;
  endpoint:string='https://localhost:7194/api/'+'AddPizza';

  constructor(private httpClient: HttpClient) { }

  getChoiceElements(): Observable<any>{
    return this.httpClient.get<ChoiceComponentModel[]>(this.endpoint);
  }
  postChoiceElements(formData: ChoiceComponentModel): Observable<any>  {
    return this.httpClient.post<ChoiceComponentModel[]>(this.endpoint, formData);
  }
}
