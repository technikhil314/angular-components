declare var require: any;

import { Component, ElementRef, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
import * as moment from 'moment';

class options {
	startDate = moment().startOf('day');
	endDate = moment().endOf('day');
	minDate = false;
	maxDate = false;
	dateLimit = false;
	autoApply = false;
	singleDatePicker = false;
	showDropdowns = false;
	showWeekNumbers = false;
	showISOWeekNumbers = false;
	showCustomRangeLabel = true;
	timePicker = false;
	timePicker24Hour = false;
	timePickerIncrement = 1;
	timePickerSeconds = false;
	linkedCalendars = true;
	autoUpdateInput = true;
	alwaysShowCalendars = false;
	ranges = {};
}

@Component({
	moduleId: module.id,
	selector: 'date-range-picker',
	templateUrl: './daterangepicker-component.html',
	styleUrls: ['./daterangepicker-component.css']
})
export class DaterangepickerComponent {
	@Input() options: options;
	showCalendars: boolean = false;
	constructor(private elem: ElementRef){
	}
	
	@HostListener('document:click', ['$event'])
	@HostListener('document:mousedown', ['$event'])
	@HostListener('document:mouseup', ['$event'])
	handleOutsideClick(event) {
		var current = event.target;
		var host = this.elem.nativeElement;
		do {
			if ( current === host ) {
				this.showCalendars = true;
				return;
			}
			current = current.parentNode;
		} while ( current );
		this.showCalendars = false;
	}
}
