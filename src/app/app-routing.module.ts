import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChoiceComponent } from './component/choice/choice.component';
import { AdminComponent } from './component/admin/admin.component';
import { MenuComponent } from './component/menu/menu.component';
import {KontaktComponent} from "./component/kontakt/kontakt.component";
import {OnasComponent} from "./component/onas/onas.component";
import {ZamowComponent} from "./component/order/zamow.component";
import {LoginComponent} from "./component/login/login.component";
import {WlasneComponent} from "./component/wlasne/wlasne.component";
import {authGuardGuard} from "./auth-guard.guard";

const routes: Routes = [
  { path: 'choice', component: ChoiceComponent },
  { path: 'menu', component: MenuComponent },
  { path: 'kontakt', component: KontaktComponent },
  { path: 'onas', component: OnasComponent },
  { path: 'admin', component: AdminComponent, canActivate:[authGuardGuard] },
  { path: 'order', component: ZamowComponent },
  { path: 'login', component: LoginComponent },
  { path: 'wlasne', component: WlasneComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
