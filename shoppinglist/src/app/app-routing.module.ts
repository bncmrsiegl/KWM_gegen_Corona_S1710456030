import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppinglistDetailsComponent } from "./shoppinglist-details/shoppinglist-details.component";
import { ShoppinglistOverviewComponent } from "./shoppinglist-overview/shoppinglist-overview.component";
import { HomeComponent } from "./home/home.component";
import {ShoppinglistFormComponent} from "./shoppinglist-form/shoppinglist-form.component";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full'},
    { path: 'home', component: HomeComponent},
    { path: 'lists', component: ShoppinglistOverviewComponent},
    { path: 'lists/:id', component: ShoppinglistDetailsComponent},
    { path: 'edit', component: ShoppinglistFormComponent},
    { path: 'edit/:id', component: ShoppinglistFormComponent},
    { path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})

export class AppRoutingModule { }
