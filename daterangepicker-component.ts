declare var require: any;

import { Component, ElementRef, OnInit, Input, Output, EventEmitter, HostBinding, HostListener } from '@angular/core';
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
	@Input() options: options;
	fromDate: string;
	toDate: string;
	showCalendars: boolean;
	selectedMonth = moment().get('month');
	selectedYear = moment().get('year');
	toMonth: number;
	fromMonth: number;
	constructor(){
		this.toMonth = moment([this.selectedYear, this.selectedMonth]).add(1, 'months').get('month');
		this.fromMonth = moment([this.selectedYear, this.selectedMonth]).get('month');
	}
	showHideCalendars(value){
		this.showCalendars = value;
	};
	dateChanged(data){
		if(data.changed === 'left'){
			this.fromDate = data.value.format("YYYY-MM-DD");
		} else {
			this.toDate = data.value.format("YYYY-MM-DD");
		}
	}
	monthChanged(data){
		if(data.changed === 'left'){
			let temp = moment([this.selectedYear, this.fromMonth]).subtract(1,
			'months');
			this.fromMonth = temp.get('month');
			this.selectedYear = temp.get('year');
			this.toMonth = moment([this.selectedYear, this.toMonth]).subtract(1, 'months').get('month')
		} else {
			let temp = moment([this.selectedYear, this.toMonth]).add(1, 'months')
			this.fromMonth = moment([this.selectedYear, this.fromMonth]).add(1,
			'months').get('month');
			this.toMonth = temp.get('month');
			this.selectedYear = temp.get('year');
		}
	}
}
