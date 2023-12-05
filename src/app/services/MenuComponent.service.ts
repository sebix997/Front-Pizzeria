import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MenuComponentModel} from "../models/MenuComponentModel";
import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class MenuComponentService {

  //baseApiUrl:string=environment.baseApiUrl;
  endpoint:string='https://localhost:7194/api/'+'Pizza';

  constructor(private httpClient: HttpClient) { }

  getChoicePizza(): Observable<any>{
    return this.httpClient.get<MenuComponentModel[]>(this.endpoint);
  }
  postChoicePizza(formData: MenuComponentModel): Observable<any>  {
    return this.httpClient.post<MenuComponentModel[]>(this.endpoint, formData);
  }
}
