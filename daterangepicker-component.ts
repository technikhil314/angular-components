declare var require: any;

import { Component, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener, OnInit, ViewChild } from '@angular/core';
import { Options } from './daterangepicker-options';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'date-range-picker',
    templateUrl: './daterangepicker-component.html'
})
export class DaterangepickerComponent implements OnInit {
    //inputs
    @Input() options: Options;
    @Input() class: string;
    //outputs
    @Output() rangeSelected = new EventEmitter();
    //variables
	showCalendars: boolean;
	range: string = "";
	fromDate: any;
    toDate: any;
	oldFromDate: any;
    oldToDate: any;
	fromMonth: number;
    toMonth: number;
    fromYear: number;
    toYear: number;
    format: string;
    //handle outside/inside click to show rangepicker
    @HostListener('document:mousedown', ['$event'])
    @HostListener('document:mouseup', ['$event'])
    handleOutsideClick(event) {
        let current: any = event.target;
        let host: any = this.elem.nativeElement;
        if (host.compareDocumentPosition) {
            if (host.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                this.showCalendars = true;
                return;
            }
        } else if (host.contains) {
            if (host.contains(current)) {
                this.showCalendars = true;
                return;
            }
        } else {
            do {
                if (current === host) {
                    this.showCalendars = true;
                    return;
                }
                current = current.parentNode;
            } while (current);
        }
        this.showCalendars = false;
		if(!this.fromDate || !this.toDate){
			this.restoreOldDates();
		}
        this.updateCalendar();
    }
    constructor(private elem: ElementRef) {
    }
    updateCalendar() {
        //get month and year to show calendar
        let tDate = moment(this.fromDate, this.format);
        this.fromMonth = tDate.get('month');
        this.fromYear = tDate.get('year');
        tDate = moment(this.fromDate, this.format).add(1, 'months');
        this.toMonth = tDate.get('month');
        this.toYear = tDate.get('year');
        this.setRange()
    }
    ngOnInit(): void {
        //get default options provided by user
		this.setFormat();
		this.validateMinMaxDates();
		this.setFromDate(this.options.startDate);
		this.setToDate(this.options.endDate);
		//update calendar grid
        this.updateCalendar();
    }
	setFormat(){
		if(this.options){
			this.format = this.options.format || "YYYY-MM-DD";
		} else {
			this.format = "YYYY-MM-DD"
		}
	}
	validateMinMaxDates(){
		if(this.options){
			//only mindate is suppplied
			if(this.options.minDate && !this.options.maxDate){
				this.options.minDate = this.getMoment(this.options.minDate);
			}
			//only maxdate is supplied
			if(!this.options.minDate && this.options.maxDate){
				this.options.maxDate = this.getMoment(this.options.maxDate);
			}
			//both min and max dates are supplied
			if(this.options.minDate && this.options.maxDate){
				this.options.minDate = this.getMoment(this.options.minDate);
				this.options.maxDate = this.getMoment(this.options.maxDate);
				if(this.options.maxDate.isBefore(this.options.minDate)){
					this.options.minDate = "";
					this.options.maxDate = "";
					console.warn("supplied minDate is after maxDate. Discarding options for minDate and maxDate");
				}
			}
			
		}
	}
	setFromDate(value){
		this.fromDate = moment();
		this.fromDate = this.getValidateMoment(value);
		if(!this.fromDate){
			console.warn("supplied startDate option is not in " + this.options.format + " format falling back to default startDate");
			this.fromDate = moment();
		}
		if(this.options && this.options.minDate){
			if(this.fromDate.isBefore(this.options.minDate)) {
				this.fromDate = this.options.minDate.clone();
			}
		} 
		if(this.options && this.options.maxDate){
			if(this.fromDate.isAfter(this.options.maxDate)) {
				this.fromDate = this.options.maxDate.clone();
			}
		}
	}
	setToDate(value){
		this.toDate = moment();
		this.toDate = this.getValidateMoment(value);
		if(!this.toDate){
			console.warn("supplied endDate option is not in " + this.options.format + " format falling back to default endDate");
			this.toDate = moment();
		}
		if(this.options && this.options.maxDate){
			if(this.toDate.isAfter(this.options.maxDate)) {
				this.toDate = this.options.maxDate.clone();
			}
		}
		if(this.toDate.isBefore(this.fromDate)) {
			this.toDate = this.fromDate.clone();
		}
	}
    dateChanged(value) {
		if ((this.fromDate && this.toDate) || !(this.fromDate || this.toDate)) {
			//if both dates are empty
			this.storeOldDates();
            this.setFromDate(value.format(this.format));
			this.toDate = void(0);
        } else if(value.isBefore(this.fromDate)){
			//if current selected date is before previously selected date
			this.setFromDate(value.format(this.format));
		} else if (this.fromDate && !this.toDate) {
			//if fromdate is selected and todate is not
            this.setToDate(value.format(this.format));
            this.showCalendars = false;
            this.setRange()
            this.emitRangeSelected();
        }
    }
	storeOldDates(){
		this.oldFromDate = this.fromDate;
		this.oldToDate = this.toDate;
	}
	restoreOldDates(){
		this.fromDate = this.oldFromDate;
		this.toDate = this.oldToDate;
	}
    emitRangeSelected() {
        this.rangeSelected.emit({
            start: this.getMoment(this.fromDate),
            end: this.getMoment(this.toDate)
        });
    }
    monthChanged(value) {
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
    getMoment(value) {
        return moment(value, this.format);
    }
    getValidateMoment(value) {
        let momentValue = null;
        if (moment(value, this.format, true).isValid()) {
            momentValue = moment(value, this.format, true);
        }
        return momentValue;
    }
    setRange() {
        this.range = this.fromDate.format(this.format) + " - " + this.toDate.format(this.format);
    }
}
