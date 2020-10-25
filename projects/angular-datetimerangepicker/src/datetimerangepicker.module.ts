import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalendarComponent } from "./calendar/calendar-component";
import { FormatDatePipe } from "./format-date-pipe";
import { DaterangepickerComponent } from "./daterangepicker/daterangepicker.component";
import { TimePickerComponent } from "./time/time-component";
@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [
    DaterangepickerComponent,
    CalendarComponent,
    TimePickerComponent,
    FormatDatePipe,
  ],
  exports: [DaterangepickerComponent],
})
export class DatetimerangepickerModule {}
