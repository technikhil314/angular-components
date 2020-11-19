import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CalendarComponent } from "./calendar/calendar-component";
import { DaterangepickerComponent } from "./daterangepicker/daterangepicker.component";
import { FormatDatePipe } from "./format-date-pipe";
import { chevronLeft } from "./img/chevron-left";
import { DoubleChevronLeft } from "./img/double-chevron-left";
import { TimePickerComponent } from "./time/time-component";
@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [
    DaterangepickerComponent,
    CalendarComponent,
    TimePickerComponent,
    FormatDatePipe,
    DoubleChevronLeft,
    chevronLeft,
  ],
  exports: [DaterangepickerComponent],
})
export class DatetimerangepickerModule {}
