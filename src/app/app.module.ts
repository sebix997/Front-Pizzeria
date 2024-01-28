import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {RouterOutlet} from "@angular/router";
import { ChoiceComponent } from './component/choice/choice.component';
import { AppRoutingModule } from './app-routing.module';
import { AdminComponent } from './component/admin/admin.component';
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from "@angular/common";
import { MenuComponent } from './component/menu/menu.component';
import {KontaktComponent} from "./component/kontakt/kontakt.component";
import { OnasComponent } from './component/onas/onas.component';
import { ZamowComponent } from './component/order/zamow.component';
import { LoginComponent } from './component/login/login.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { WlasneComponent } from './component/wlasne/wlasne.component';

@NgModule({
  declarations: [
    AppComponent,
    ChoiceComponent,
    AdminComponent,
    MenuComponent,
    KontaktComponent,
    OnasComponent,
    ZamowComponent,
    LoginComponent,
    WlasneComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterOutlet,
    AppRoutingModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatSnackBarModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
