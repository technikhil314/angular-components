import { Component } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: "my-app",
	template: `
		<h1>{{title}}</h1>
		<date-range-picker [fromDate]="startDate" [toDate]="toDate" [format]="'DD/MM/YYYY'" (datesSelected)="demo($event, start)"></date-range-picker>
	`
})
export class AppComponent {
	title: string = "DateRangepicker";
	startDate: string = '04/01/2017';
	toDate: string = '04/02/2017'
	demo(event, start){
		debugger;
	}
}
