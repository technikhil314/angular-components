declare var require: any;

import { Component, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { DetectOutsideClick } from './detect-outside-click-directive';
import { Options } from './daterangepicker-options';
import * as moment from 'moment';

@Component({
	moduleId: module.id,
	selector: 'date-range-picker',
	templateUrl: './daterangepicker-component.html',
	styleUrls: ['./daterangepicker-component.css']
})
export class DaterangepickerComponent implements OnInit{
	@Input() options: Options;
	fromDate: string;
	toDate: string;
	showCalendars: boolean;
	toMonth: number;
	fromMonth: number;
	fromYear: number;
	toYear: number;
	format: string;
	@ViewChild('rangeInput') input;
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
	constructor(private elem: ElementRef){
		this.toMonth = moment([this.toYear, this.toMonth]).add(1, 'months').get('month');
		this.fromMonth = moment([this.fromYear, this.fromMonth]).get('month');
	}
	ngOnInit(): void{
		let tDate = moment(this.options.startDate, this.options.format);
		this.fromMonth = tDate.get('month');
		this.fromYear = tDate.get('year');
		tDate = moment(this.options.startDate, this.options.format).add(1, 'months');
		this.toMonth = tDate.get('month');
		this.toYear = tDate.get('year');
		this.format = this.options.format;
	}
	dateChanged(data){
		if(data.changed === 'left'){
			this.fromDate = data.value;
		} else {
			this.toDate = data.value;
		}
	}
	monthChanged(data){
		let temp;
		if(data.changed === 'left'){
			temp = moment([this.fromYear, this.fromMonth]).subtract(1,
			'months');
			this.fromMonth = temp.get('month');
			this.fromYear = temp.get('year');
			
			temp = moment([this.toYear, this.toMonth]).subtract(1,
			'months');
			this.toMonth = temp.get('month');
			this.toYear = temp.get('year');
		} else {
			temp = moment([this.toYear, this.toMonth]).add(1, 'months')
			this.toMonth = temp.get('month');
			this.toYear = temp.get('year');
			temp = moment([this.fromYear, this.fromMonth]).add(1, 'months')
			this.fromMonth = temp.get('month');
			this.fromYear = temp.get('year');
		}
	}
}
