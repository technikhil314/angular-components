import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: "my-app",
	template: `
		<h1>{{title}}</h1>
		<date-range-picker [fromDate]="'04/01/2017'" [toDate]="'04/02/2017'" [format]="'DD/MM/YYYY'" (datesSelected)="demo($event, start)"></date-range-picker>
	`
})
export class AppComponent {
	title = "DateRangepicker";
	demo(event, start){
		debugger;
	}
}
