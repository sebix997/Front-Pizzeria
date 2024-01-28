import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {OrderComponentModel} from "../models/OrderComponentModel";
import {SpecjalOrderComponentModel} from "../models/SpecjalComponentModel";

@Injectable({
    providedIn: 'root'
})
export class SpecjalOrderService {
    constructor(private http: HttpClient) {}

    getSpecjalOrder(): Observable<any>{
        return this.http.get<OrderComponentModel[]>('https://localhost:7194/api/SpecjalOrder');
    }
    postSpecjalOrder(formData: SpecjalOrderComponentModel): Observable<any>  {
        return this.http.post<SpecjalOrderComponentModel[]>('https://localhost:7194/api/SpecjalOrder', formData);
    }

    updateSpecjalOrder(id: number, updatedData: SpecjalOrderComponentModel): Observable<SpecjalOrderComponentModel> {
        const updateUrl = `${'https://localhost:7194/api/SpecjalOrder'}/${id}`;
        return this.http.put<SpecjalOrderComponentModel>(updateUrl, updatedData);
    }
}
