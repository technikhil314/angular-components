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
	@Input() class: string;
	@Output() rangeSelected = new EventEmitter();
	className: string;
	fromDate: string;
	toDate: string;
	showCalendars: boolean;
	toMonth: number;
	fromMonth: number;
	fromYear: number;
	toYear: number;
	format: string;
	range: string = "";
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
		this.fromDate = this.options.startDate;
		this.toDate = this.options.endDate;
		this.format = this.options.format;
		this.range = this.options.startDate + " - " + this.options.endDate;
	}
	dateChanged(value){
		if((this.fromDate && this.toDate) || !(this.fromDate || this.toDate)){
			this.fromDate = value;
			this.toDate = void(0);
		}else if(this.fromDate && !this.toDate) {
			this.toDate = value;
			this.showCalendars = false;
			this.range = this.fromDate +" - "+ this.toDate;
			this.rangeSelected.emit(this.range);
		}
	}
	monthChanged(value){
		let temp;
		temp = moment([this.fromYear, this.fromMonth]).add(value,
		'months');
		this.fromMonth = temp.get('month');
		this.fromYear = temp.get('year');
		temp = moment([this.toYear, this.toMonth]).add(value,
		'months');
		this.toMonth = temp.get('month');
		this.toYear = temp.get('year');
	}
}
