import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {OrderComponentModel} from "../models/OrderComponentModel";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  //baseApiUrl:string=environment.baseApiUrl;
  endpoint:string='https://localhost:7194/api/Order';

  constructor(private httpClient: HttpClient) { }

  getOrder(): Observable<any>{
    return this.httpClient.get<OrderComponentModel[]>(this.endpoint);
  }
  postOrder(formData: OrderComponentModel): Observable<any>  {
    return this.httpClient.post<OrderComponentModel[]>(this.endpoint, formData);
  }

  updateOrder(id: number, updatedData: OrderComponentModel): Observable<OrderComponentModel> {
    const updateUrl = `${this.endpoint}/${id}`;
    return this.httpClient.put<OrderComponentModel>(updateUrl, updatedData);
  }
}
