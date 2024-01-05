import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LoginComponentModel} from "../models/LoginComponentModel";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  //baseApiUrl:string=environment.baseApiUrl;
  endpoint:string='https://localhost:7194/'+'login';

  constructor(private httpClient: HttpClient) { }


  Login(formData: LoginComponentModel): Observable<any>  {
    return this.httpClient.post<LoginComponentModel[]>(this.endpoint, formData);
  }

}
