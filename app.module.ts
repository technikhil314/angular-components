import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DaterangepickerModule } from './daterangepicker-module'
import { AppComponent } from './app-component';
@NgModule({
  imports: [ BrowserModule, DaterangepickerModule ],
  declarations: [AppComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { } 
