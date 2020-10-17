import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { DatetimerangepickerModule } from "angular-datetimerangepicker";
@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DatetimerangepickerModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
