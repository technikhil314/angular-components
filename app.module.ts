import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DaterangepickerComponent } from './daterangepicker-component'
import { DaterangepickerModule } from './daterangepicker-module'
@NgModule({
  imports: [ BrowserModule, DaterangepickerModule ],
  bootstrap: [ DaterangepickerComponent ]
})
export class AppModule { } 
