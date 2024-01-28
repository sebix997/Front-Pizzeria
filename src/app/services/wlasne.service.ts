import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OrderComponentModel} from "../models/OrderComponentModel";
import {SpecjalOrderComponentModel} from "../models/SpecjalComponentModel";

@Injectable({
  providedIn: 'root'
})
export class PizzaService {
  constructor(private http: HttpClient) {}

  getIngredients(): Observable<any> {
    return this.http.get('https://localhost:7194/api/AddPizza'); // ścieżka do Twojego API
  }

  postSpecjalOrder(formData: SpecjalOrderComponentModel): Observable<any>  {
    return this.http.post<SpecjalOrderComponentModel[]>('https://localhost:7194/api/AddPizza', formData);
  }

  updateSpecjalOrder(id: number, updatedData: SpecjalOrderComponentModel): Observable<OrderComponentModel> {
    const updateUrl = `${'https://localhost:7194/api/AddPizza'}/${id}`;
    return this.http.put<OrderComponentModel>(updateUrl, updatedData);
  }
}
