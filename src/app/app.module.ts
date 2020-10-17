import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AngularDatetimerangepickerModule } from "angular-datetimerangepicker";
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularDatetimerangepickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
