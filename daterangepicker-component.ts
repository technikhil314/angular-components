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
    @Input() className: string;
    //outputs
    @Output() rangeSelected = new EventEmitter();
    //variables
    fromDate: any;
    toDate: any;
    showCalendars: boolean;
    toMonth: number;
    fromMonth: number;
    fromYear: number;
    toYear: number;
    format: string;
    range: string = "";
    //private variables
    private oldFromDate;
    private toFromDate;
    private fromDateSelected;
    private toDateSelected;
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
        if (this.options) {
            this.format = this.options.format || "YYYY-MM-DD";
            this.fromDate = this.getMoment(this.options.startDate) || moment();
            this.toDate = this.getMoment(this.options.endDate) || moment();
        } else {
            this.format = "YYYY-MM-DD";
            this.fromDate = moment();
            this.toDate = moment();
        }
        this.updateCalendar();
    }
    dateChanged(value) {
        if ((this.fromDate && this.toDate) || !(this.fromDate || this.toDate)) {
            this.fromDate = value;
            this.toDate = void (0);
        } else if (this.fromDate && !this.toDate) {
            this.toDate = value;
            this.showCalendars = false;
            this.setRange()
            this.emitRangeSelected();
        }
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
    getValidaMoment(value) {
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
