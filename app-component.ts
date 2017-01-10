import { Component } from '@angular/core';
import { Options } from './daterangepicker-options';

@Component({
	selector: "my-app",
	template: `
		<div class="col-md-6">
			<date-range-picker class="col-md-11" [options]="daterangepickerOptions">
			</date-range-picker>
		</div>
	`,
	styleUrls: ['./daterangepicker-component.css']
})
export class AppComponent{
	daterangepickerOptions: Options = new Options();
	constructor(){
		this.daterangepickerOptions.startDate = '09/01/2017';
		this.daterangepickerOptions.endDate = '09/02/2017';
		this.daterangepickerOptions.format = 'DD/MM/YYYY';
	}
}
