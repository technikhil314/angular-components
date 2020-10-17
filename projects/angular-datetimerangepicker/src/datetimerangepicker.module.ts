import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalendarComponent } from "./calendar/calendar-component";
import { DaterangepickerComponent } from "./daterangepicker/daterangepicker.component";
import { FormatMomentDatePipe } from "./format-moment-date-pipe";
import { TimePickerComponent } from "./time/time-component";
@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [
    DaterangepickerComponent,
    CalendarComponent,
    TimePickerComponent,
    FormatMomentDatePipe,
  ],
  exports: [DaterangepickerComponent],
})
export class DatetimerangepickerModule {}
