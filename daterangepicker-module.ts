import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DaterangepickerComponent } from './daterangepicker-component';
import { CommonModule } from '@angular/common';
import { CalendarComponent } from './calendar-component';
@NgModule({
	imports: [FormsModule, CommonModule],
	exports: [DaterangepickerComponent, DetectOutsideClick],
	declarations: [DaterangepickerComponent, DetectOutsideClick, CalendarComponent],
	bootstrap: [DaterangepickerComponent]
})
export class DaterangepickerModule{
}
