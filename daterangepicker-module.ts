import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DaterangepickerComponent } from './daterangepicker-component';
import { CommonModule } from '@angular/common';
import { DetectOutsideClick } from './detect-outside-click-directive';

@NgModule({
	imports: [FormsModule, CommonModule],
	exports: [DaterangepickerComponent],
	declarations: [DaterangepickerComponent, DetectOutsideClick],
	bootstrap: [DaterangepickerComponent]
})
export class DaterangepickerModule{
	
}
