import { Component } from '@angular/core';
import { Options } from './daterangepicker-options';

@Component({
	selector: "my-app",
	template: `
		<date-range-picker [options]="daterangepickerOptions" (rangeSelected)="rangeSelected($event)" class="col-md-6">
	`,
	styleUrls: ['./daterangepicker-component.css']
})
export class AppComponent{
	daterangepickerOptions: Options = new Options();
	constructor(){
		this.daterangepickerOptions.startDate = '09/01/2017';
		this.daterangepickerOptions.endDate = '09/02/2017';
		this.daterangepickerOptions.format = 'MM/DD/YYYY';
	}
	rangeSelected(){
		debugger;
	}
}
