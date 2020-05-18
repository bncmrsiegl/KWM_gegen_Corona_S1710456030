import { BrowserModule } from '@angular/platform-browser';
import { LOCALE_ID, NgModule } from '@angular/core';
import localeDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
registerLocaleData(localeDe);

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppinglistOverviewComponent } from './shoppinglist-overview/shoppinglist-overview.component';
import { ShoppinglistElementComponent } from './shoppinglist-element/shoppinglist-element.component';
import { ShoppinglistDetailsComponent } from './shoppinglist-details/shoppinglist-details.component';
import { ShoppinglistStoreService } from "./shared/shoppinglist-store.service";
import { HomeComponent } from './home/home.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { ShoppinglistFormComponent } from './shoppinglist-form/shoppinglist-form.component';
import { ReactiveFormsModule } from "@angular/forms";
import { LoginComponent } from './login/login.component';
import {AuthenticationService} from "./shared/authentication.service";
import {TokenInterceptorService} from "./shared/token-interceptor.service";
import {JwtInterceptorService} from "./shared/jwt-interceptor.service";

@NgModule({
  declarations: [
      AppComponent,
      ShoppinglistOverviewComponent,
      ShoppinglistElementComponent,
      ShoppinglistDetailsComponent,
      HomeComponent,
      ShoppinglistFormComponent,
      LoginComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      ReactiveFormsModule
  ],
  providers: [
      ShoppinglistStoreService,
      AuthenticationService,
      {provide: LOCALE_ID, useValue: 'de'},
      {provide: HTTP_INTERCEPTORS​, useClass: TokenInterceptorService, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptorService, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
