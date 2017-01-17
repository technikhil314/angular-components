import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DaterangepickerComponent } from './daterangepicker-component';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar-component';
import { FormatMomentDatePipe } from './format-moment-date-pipe'
@NgModule({
    imports: [FormsModule, CommonModule],
    exports: [DaterangepickerComponent],
    declarations: [DaterangepickerComponent, CalendarComponent, FormatMomentDatePipe],
    bootstrap: [DaterangepickerComponent]
})
export class DaterangepickerModule {
}
