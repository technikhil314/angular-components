import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DaterangepickerComponent } from './daterangepicker-component';

@NgModule({
	imports: [FormsModule],
	exports: [DaterangepickerComponent],
	declarations: [DaterangepickerComponent],
	bootstrap: [DaterangepickerComponent]
})
export class DaterangepickerModule{
	
}
