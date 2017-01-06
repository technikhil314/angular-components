import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DaterangepickerComponent } from './daterangepicker-component';
import { CommonModule } from '@angular/common';
@NgModule({
	imports: [FormsModule, CommonModule],
	exports: [DaterangepickerComponent],
	declarations: [DaterangepickerComponent],
	bootstrap: [DaterangepickerComponent]
})
export class DaterangepickerModule{
	
}
