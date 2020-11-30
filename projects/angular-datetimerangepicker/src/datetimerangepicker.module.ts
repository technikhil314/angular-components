import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Calendar } from './calendar/calendar-component';
import { Daterangepicker } from './daterangepicker/daterangepicker.component';
import { FormatDatePipe } from './format-date-pipe';
import { ChevronLeft } from './img/chevron-left';
import { DoubleChevronLeft } from './img/double-chevron-left';
import { TimePicker } from './time/time-component';
@NgModule({
  imports: [FormsModule, CommonModule],
  declarations: [
    Daterangepicker,
    Calendar,
    TimePicker,
    FormatDatePipe,
    DoubleChevronLeft,
    ChevronLeft,
  ],
  exports: [Daterangepicker],
})
export class DatetimerangepickerModule {}
