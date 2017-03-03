declare var require: any;

import { Component, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener, OnInit } from '@angular/core';
import { Options } from './daterangepicker-options';
import { Defaults } from './daterangepicker-default-ranges';
import * as moment from 'moment';

@Component({
    moduleId: module.id,
    selector: 'date-range-picker',
    template: `
        <input class="{{class}}" type="text" [ngModel]="range">
        <div class="daterangepicker col-md-12 text-center flush" [class.hidden]="!showCalendars">
            <div class="col-md-12 flush text-center">
                <div class="col-md-6 flush-bottom text-center flush-left flush-half--right">
                    <div class="col-md-12 flush-bottom flush-left flush-half--right">
                        <input class="input-mini form-control" [ngModel]="fromDate | formatMomentDate: format" (blur)="formatFromDate($event)" type="text" name="daterangepicker_start" />
                    </div>
                    <div class="col-md-12 flush">
                        <calendar class="col-md-12 flush" [isLeft]="true" [month]="fromMonth" [year]="fromYear" (monthChanged)=monthChanged($event) (dateChanged)="dateChanged($event)" [format]="format" [selectedFromDate]="fromDate" [selectedToDate]="toDate" [minDate]="options.minDate"
                            [maxDate]="options.maxDate" [inactiveBeforeStart]="options.inactiveBeforeStart"></calendar>
                    </div>
                </div>
                <div class="col-md-6 flush-bottom flush-right flush-half--left">
                    <div class="col-md-12 flush-bottom text-center flush-right flush-half--left">
                        <input class="input-mini form-control" [ngModel]="toDate | formatMomentDate: format" (blur)="formatToDate($event)" name="daterangepicker_end" />
                    </div>
                    <div class="col-md-12 flush">
                        <calendar class="col-md-12 flush" [month]="toMonth" [year]="toYear" [format]="format" (dateChanged)="dateChanged($event)" (monthChanged)=monthChanged($event) [selectedFromDate]="fromDate" [selectedToDate]="toDate" [minDate]="options.minDate" [maxDate]="options.maxDate"
                            [inactiveBeforeStart]="options.inactiveBeforeStart"></calendar>
                    </div>
                </div>
            </div>
            <div class="col-md-12 flush text-center ranges">
                <button [class.hidden]="options.autoApply" class="btn btn-success btn-sm" [disabled]="!enableApplyButton" (click)="apply()">Apply</button>
                <button [class.hidden]="options.autoApply" class="btn btn-default btn-sm" (click)="cancel()">Cancel</button>
                <div class="col-md-12 flush text-center">
                    <button *ngFor="let range of defaultRanges" class="btn btn-link" (click)="applyPredefinedRange(range)">{{range.name}}</button>
                </div>
            </div>
        </div>
    `
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
    enableApplyButton: boolean = false;
    areOldDatesStored: boolean = false;
    fromDate: any;
    toDate: any;
    oldFromDate: any;
    oldToDate: any;
    fromMonth: number;
    toMonth: number;
    fromYear: number;
    toYear: number;
    format: string;
    defaultRanges: {};
    //handle outside/inside click to show rangepicker
    @HostListener('document:mousedown', ['$event'])
    @HostListener('document:mouseup', ['$event'])
    handleOutsideClick(event) {
        let current: any = event.target;
        let host: any = this.elem.nativeElement;
        if (host.compareDocumentPosition) {
            if (host.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                this.storeOldDates();
                return this.toggleCalendars(true);
            }
        } else if (host.contains) {
            if (host.contains(current)) {
                this.storeOldDates();
                return this.toggleCalendars(true);
            }
        } else {
            do {
                if (current === host) {
                    this.storeOldDates();
                    return this.toggleCalendars(true);
                }
                current = current.parentNode;
            } while (current);
        }
        if (this.showCalendars) {
            if (!this.options.autoApply) {
                this.restoreOldDates();
            }
            this.toggleCalendars(false);
        }
    }
    constructor(private elem: ElementRef) {
    }
    toggleCalendars(value) {
        this.showCalendars = value;
        if (!value) {
            this.areOldDatesStored = false;
            this.updateCalendar();
        }
    }
    updateCalendar() {
        //get month and year to show calendar
        let tDate = moment(this.fromDate, this.format);
        this.fromMonth = tDate.get('month');
        this.fromYear = tDate.get('year');
        tDate = moment(this.toDate, this.format);
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
        this.defaultRanges = Defaults.ranges;
        //update calendar grid
        this.updateCalendar();
    }
    setFormat() {
        if (this.options) {
            this.format = this.options.format || "YYYY-MM-DD";
        } else {
            this.format = "YYYY-MM-DD"
        }
    }
    validateMinMaxDates() {
        if (this.options) {
            //only mindate is suppplied
            if (this.options.minDate && !this.options.maxDate) {
                this.options.minDate = this.getMoment(this.options.minDate);
            }
            //only maxdate is supplied
            if (!this.options.minDate && this.options.maxDate) {
                this.options.maxDate = this.getMoment(this.options.maxDate);
            }
            //both min and max dates are supplied
            if (this.options.minDate && this.options.maxDate) {
                this.options.minDate = this.getMoment(this.options.minDate);
                this.options.maxDate = this.getMoment(this.options.maxDate);
                if (this.options.maxDate.isBefore(this.options.minDate)) {
                    this.options.minDate = "";
                    this.options.maxDate = "";
                    console.warn("supplied minDate is after maxDate. Discarding options for minDate and maxDate");
                }
            }
        }
    }
    setFromDate(value) {
        let temp;
        if (temp = this.getValidateMoment(value)) {
            this.fromDate = temp;
        } else {
            this.fromDate = moment();
        }
    }
    setToDate(value) {
        let temp;
        if (temp = this.getValidateMoment(value)) {
            this.toDate = temp;
        } else {
            this.toDate = moment();
        }
    }
    //detects which date to set from or to and validates
    dateChanged(data) {
        let value = data.day;
        let isLeft = data.isLeft;
        if (isLeft) {
            this.setFromDate(value.format(this.format));
            if (value.isAfter(this.toDate)) {
                this.toDate = this.fromDate.clone();
            }
        } else {
            this.setToDate(value.format(this.format));
            if (value.isBefore(this.fromDate)) {
                this.fromDate = this.toDate.clone();
            }
        }
        if (this.options.autoApply) {
            !isLeft ? this.toggleCalendars(false) : this.toggleCalendars(true);
            this.setRange()
            this.emitRangeSelected();
        } else {
            this.enableApplyButton = true;
        }
    }
    emitRangeSelected() {
        this.rangeSelected.emit({
            start: this.getMoment(this.fromDate),
            end: this.getMoment(this.toDate)
        });
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
    formatFromDate(event) {
        if (event.target.value !== this.fromDate.format(this.format)) {
            this.dateChanged({
                day: event.target.value ? this.getMoment(event.target.value) : moment(),
                isLeft: true
            });
        }
    }
    formatToDate(event) {
        if (event.target.value !== this.toDate.format(this.format)) {
            this.dateChanged({
                day: event.target.value ? this.getMoment(event.target.value) : moment(),
                isLeft: false
            });
        }
    }
    monthChanged(data) {
        let temp;
        if (data.isLeft) {
            temp = moment([this.fromYear, this.fromMonth]).add(data.value, 'months');
            this.fromMonth = temp.get('month');
            this.fromYear = temp.get('year');
        } else {
            temp = moment([this.toYear, this.toMonth]).add(data.value, 'months');
            this.toMonth = temp.get('month');
            this.toYear = temp.get('year');
        }
    }
    storeOldDates() {
        if (!this.areOldDatesStored) {
            this.oldFromDate = this.fromDate;
            this.oldToDate = this.toDate;
            this.areOldDatesStored = true;
        }
    }
    restoreOldDates() {
        this.fromDate = this.oldFromDate;
        this.toDate = this.oldToDate;
    }
    apply() {
        this.toggleCalendars(false);
        this.setRange()
        this.emitRangeSelected();
    }
    cancel() {
        this.restoreOldDates();
        this.toggleCalendars(false);
    }
    applyPredefinedRange(data) {
        this.setFromDate(data.value.start);
        this.setToDate(data.value.end);
        this.toggleCalendars(false);
    }
}
