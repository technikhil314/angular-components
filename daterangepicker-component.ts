declare var require: any;

import { Component, ElementRef, OnInit, Input, Output, EventEmitter, HostBinding, HostListener, NgZone } from '@angular/core';
import { DetectOutsideClick } from './detect-outside-click-directive';
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
	constructor(private zone: NgZone){
		
	}
	@Input() options: options;
	showCalendars: boolean = true;
	showHideCalendars(value){
		this.zone.run(() => {
			this.showCalendars = value;
		});
	};
}
