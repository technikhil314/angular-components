import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent  }  from './app.component';
import { DaterangepickerModule } from './daterangepicker-module'
@NgModule({
  imports: [ BrowserModule, DaterangepickerModule ],
  declarations: [ AppComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { } 
