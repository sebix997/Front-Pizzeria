import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceComponent } from './component/choice/choice.component';
import { AdminComponent } from './component/admin/admin.component';
import { MenuComponent } from './component/menu/menu.component';
import {KontaktComponent} from "./component/kontakt/kontakt.component";
import {OnasComponent} from "./component/onas/onas.component";
import {ZamowComponent} from "./component/order/zamow.component";
import {LoginComponent} from "./component/login/login.component";

const routes: Routes = [
  { path: 'choice', component: ChoiceComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'onas', component: OnasComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'order', component: ZamowComponent },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
