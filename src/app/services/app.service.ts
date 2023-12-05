import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "src/environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppService {

  //baseApiUrl:string=environment.baseApiUrl;
    endpoint:string='https://localhost:7194/'+'WeatherForecast';

  constructor(private httpClient: HttpClient) { }

  getWether (): Observable<any[]> {
    return this.httpClient.get<any[]>(this.endpoint);
  }

  getChoiceElements(): Observable<any>{
    return this.httpClient.get<any[]>(this.endpoint);
  }
}
