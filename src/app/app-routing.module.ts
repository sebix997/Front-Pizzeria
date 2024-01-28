import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceComponent } from './component/choice/choice.component';
import { AdminComponent } from './component/admin/admin.component';
import { MenuComponent } from './component/menu/menu.component';
import {KontaktComponent} from "./component/kontakt/kontakt.component";
import {OnasComponent} from "./component/onas/onas.component";
import {OrderComponent} from "./component/order/order.component";
import {LoginComponent} from "./component/login/login.component";
import {WlasneComponent} from "./component/wlasne/wlasne.component";
import {authGuardGuard} from "./auth-guard.guard";
import {SpecjalOrderComponent} from "./component/specjal-order/specjal-order.component";

const routes: Routes = [
  { path: '', redirectTo: '/onas', pathMatch: 'full' },
  { path: 'choice', component: ChoiceComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'onas', component: OnasComponent },
  { path: 'admin', component: AdminComponent, canActivate:[authGuardGuard] },
  { path: 'order', component: OrderComponent },
  { path: 'login', component: LoginComponent },
  { path: 'wlasne', component: WlasneComponent },
  { path: 'specjal-order', component: SpecjalOrderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
