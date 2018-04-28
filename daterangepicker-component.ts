declare var require: any;

import { Component, ElementRef, Input, Output, EventEmitter, HostBinding, HostListener, OnInit } from '@angular/core';
import { Options } from './daterangepicker-options';
import { Defaults } from './daterangepicker-default-ranges';
import * as moment from 'moment';

@Component({
    selector: 'date-range-picker',
    template: `
        <input class="{{class}}" type="text" [ngModel]="range">
        <div class="daterangepicker col-md-12 text-center flush" [class.hidden]="!showCalendars" [ngClass]="{'hidden':!showCalendars, 'singledatepicker':options.singleCalendar}">
            <div class="col-md-12 flush text-center">
                <div class="flush-bottom text-center flush-left nudge-half--right" [ngClass]="{'col-md-6':!options.singleCalendar,'col-md-12':options.singleCalendar}">
                    <div class="col-md-12 flush-bottom" *ngIf="!options.singleCalendar">
                        <input class="input-mini form-control" [ngModel]="fromDate | formatMomentDate: format" (blur)="formatFromDate($event)" type="text" name="daterangepicker_start" />
                    </div>
                    <div class="col-md-12 flush">
                        <calendar class="col-md-12 flush" [isLeft]="true" [month]="fromMonth" [year]="fromYear" (monthChanged)=monthChanged($event) (yearChanged)=yearChanged($event) (dateChanged)="dateChanged($event)" [format]="format" [selectedFromDate]="fromDate" [selectedToDate]="toDate" [minDate]="options.minDate"
                            [maxDate]="options.maxDate" [inactiveBeforeStart]="options.inactiveBeforeStart"></calendar>
                    </div>
                </div>
                <div class="col-md-6 flush-bottom flush-right nudge-half--left" *ngIf="!options.singleCalendar">
                    <div class="col-md-12 flush-bottom text-center">
                        <input class="input-mini form-control" [ngModel]="toDate | formatMomentDate: format" (blur)="formatToDate($event)" name="daterangepicker_end" />
                    </div>
                    <div class="col-md-12 flush">
                        <calendar class="col-md-12 flush" [month]="toMonth" [year]="toYear" [format]="format" (dateChanged)="dateChanged($event)" (monthChanged)=monthChanged($event) (yearChanged)=yearChanged($event) [selectedFromDate]="fromDate" [selectedToDate]="toDate" [minDate]="options.minDate" [maxDate]="options.maxDate"
                            [inactiveBeforeStart]="options.inactiveBeforeStart"></calendar>
                    </div>
                </div>
            </div>
            <div class="flush text-center ranges" *ngIf="!options.singleCalendar">
                <button [class.hidden]="options.autoApply" class="btn btn-success btn-sm" [disabled]="!enableApplyButton" (click)="apply()">Apply</button>
                <button [class.hidden]="options.autoApply" class="btn btn-default btn-sm" (click)="cancel()">Cancel</button>
                <div class="flush text-center" *ngIf="options.showRanges">
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
    tempFromDate: any;
    tempToDate: any;
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
        var fromDate = this.fromDate || this.tempFromDate;
        var toDate = this.toDate || this.tempToDate;
        let tDate = moment(fromDate, this.format);
        this.fromMonth = tDate.get('month');
        this.fromYear = tDate.get('year');
        tDate = moment(toDate, this.format);
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
        this.defaultRanges = this.validatePredefinedRanges(this.options.preDefinedRanges || Defaults.ranges);
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
                if (this.options.maxDate.isBefore(this.options.minDate, 'date')) {
                    this.options.minDate = "";
                    this.options.maxDate = "";
                    console.warn("supplied minDate is after maxDate. Discarding options for minDate and maxDate");
                }
            }
        }
    }
    setFromDate(value) {
        if (this.options.noDefaultRangeSelected) {
            this.fromDate = "";
            this.tempFromDate = this.getActualFromDate(value);
        } else {
            this.fromDate = this.getActualFromDate(value);
        }
    }
    getActualFromDate(value) {
        let temp;
        if (temp = this.getValidateMoment(value)) {
            return this.getValidateFromDate(temp);
        } else {
            return this.getValidateFromDate(moment());
        }
    }
    getValidateFromDate(value) {
        if (this.options.minDate && this.options.maxDate && value.isSameOrAfter(this.options.minDate, 'date') && value.isSameOrBefore(this.options.maxDate, 'date')) {
            return value;
        } else if (this.options.minDate && !this.options.maxDate && value.isAfter(this.options.minDate, 'date')) {
            return value;
        } else if (this.options.minDate) {
            return this.options.minDate.clone();
        } else {
            return moment();
        }
    }
    setToDate(value) {
        if (this.options.noDefaultRangeSelected) {
            this.options.noDefaultRangeSelected = false;
            this.toDate = "";
            this.tempToDate = this.getActualToDate(value);
        } else {
            this.toDate = this.getActualToDate(value);
        }
    }
    getActualToDate(value) {
        let temp;
        if (temp = this.getValidateMoment(value)) {
            return this.getValidateToDate(temp);
        } else {
            return this.getValidateToDate(moment());
        }
    }
    getValidateToDate(value) {
        if (this.options.maxDate && value.isSameOrAfter(this.fromDate, 'date'), value.isSameOrBefore(this.options.maxDate, 'date')) {
            return value;
        } else if (this.options.maxDate) {
            return this.options.maxDate.clone();
        } else {
            return moment();
        }
    }
    //detects which date to set from or to and validates
    dateChanged(data) {
        let value = data.day;
        let isLeft = data.isLeft;
        if (isLeft) {
            this.setFromDate(value.format(this.format));
            if (value.isAfter(this.toDate, 'date')) {
                this.toDate = this.fromDate.clone();
            }
        } else {
            this.setToDate(value.format(this.format));
            if (value.isBefore(this.fromDate, 'date')) {
                this.fromDate = this.toDate.clone();
            }
        }
        if (this.options.autoApply || this.options.singleCalendar) {
            (!isLeft || this.options.singleCalendar) ? this.toggleCalendars(false) : this.toggleCalendars(true);
            this.setRange()
            this.emitRangeSelected();
        } else {
            this.enableApplyButton = true;
        }
    }
    emitRangeSelected() {
        let data = {};
        if (this.options.singleCalendar) {
            data = {
                start: this.getMoment(this.fromDate)
            }
        } else {
            data = {
                start: this.getMoment(this.fromDate),
                end: this.getMoment(this.toDate)
            }
        }
        this.rangeSelected.emit(data);
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
        const displayFormat = this.options.displayFormat !== undefined ? this.options.displayFormat : this.format
        if (this.options.singleCalendar) {
            this.range = this.fromDate.format(displayFormat);
        } else if (this.fromDate && this.toDate) {
            this.range = this.fromDate.format(displayFormat) + " - " + this.toDate.format(displayFormat);
        } else {
            this.range = "";
        }
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
    yearChanged(data) {
        let temp;
        if (data.isLeft) {
            temp = moment([this.fromYear, this.fromMonth]).add(data.value, 'year');
            this.fromMonth = temp.get('month');
            this.fromYear = temp.get('year');
        } else {
            temp = moment([this.toYear, this.toMonth]).add(data.value, 'year');
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
        this.emitRangeSelected();
    }
    validatePredefinedRanges(ranges) {
        return ranges.filter(range => {
            if (range.value.start.isAfter(range.value.end, 'date')) {
                return false;
            }
            if (this.options.minDate && range.value.start.isBefore(this.options.minDate, 'date')) {
                return false;
            }
            if (this.options.maxDate && range.value.end.isAfter(this.options.maxDate, 'date')) {
                return false;
            }
            return true;
        });
    }
}
