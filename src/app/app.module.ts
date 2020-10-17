import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DatetimerangepickerModule } from "angular-datetimerangepicker";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, DatetimerangepickerModule, FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
