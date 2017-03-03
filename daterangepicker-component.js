"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var daterangepicker_options_1 = require('./daterangepicker-options');
var daterangepicker_default_ranges_1 = require('./daterangepicker-default-ranges');
var moment = require('moment');
var DaterangepickerComponent = (function () {
    function DaterangepickerComponent(elem) {
        this.elem = elem;
        //outputs
        this.rangeSelected = new core_1.EventEmitter();
        this.range = "";
        this.enableApplyButton = false;
        this.areOldDatesStored = false;
    }
    //handle outside/inside click to show rangepicker
    DaterangepickerComponent.prototype.handleOutsideClick = function (event) {
        var current = event.target;
        var host = this.elem.nativeElement;
        if (host.compareDocumentPosition) {
            if (host.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                this.storeOldDates();
                return this.toggleCalendars(true);
            }
        }
        else if (host.contains) {
            if (host.contains(current)) {
                this.storeOldDates();
                return this.toggleCalendars(true);
            }
        }
        else {
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
    };
    DaterangepickerComponent.prototype.toggleCalendars = function (value) {
        this.showCalendars = value;
        if (!value) {
            this.areOldDatesStored = false;
            this.updateCalendar();
        }
    };
    DaterangepickerComponent.prototype.updateCalendar = function () {
        //get month and year to show calendar
        var tDate = moment(this.fromDate, this.format);
        this.fromMonth = tDate.get('month');
        this.fromYear = tDate.get('year');
        tDate = moment(this.toDate, this.format);
        this.toMonth = tDate.get('month');
        this.toYear = tDate.get('year');
        this.setRange();
    };
    DaterangepickerComponent.prototype.ngOnInit = function () {
        //get default options provided by user
        this.setFormat();
        this.validateMinMaxDates();
        this.setFromDate(this.options.startDate);
        this.setToDate(this.options.endDate);
        this.defaultRanges = daterangepicker_default_ranges_1.Defaults.ranges;
        //update calendar grid
        this.updateCalendar();
    };
    DaterangepickerComponent.prototype.setFormat = function () {
        if (this.options) {
            this.format = this.options.format || "YYYY-MM-DD";
        }
        else {
            this.format = "YYYY-MM-DD";
        }
    };
    DaterangepickerComponent.prototype.validateMinMaxDates = function () {
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
    };
    DaterangepickerComponent.prototype.setFromDate = function (value) {
        var temp;
        if (temp = this.getValidateMoment(value)) {
            this.fromDate = temp;
        }
        else {
            this.fromDate = moment();
        }
    };
    DaterangepickerComponent.prototype.setToDate = function (value) {
        var temp;
        if (temp = this.getValidateMoment(value)) {
            this.toDate = temp;
        }
        else {
            this.toDate = moment();
        }
    };
    //detects which date to set from or to and validates
    DaterangepickerComponent.prototype.dateChanged = function (data) {
        var value = data.day;
        var isLeft = data.isLeft;
        if (isLeft) {
            this.setFromDate(value.format(this.format));
            if (value.isAfter(this.toDate)) {
                this.toDate = this.fromDate.clone();
            }
        }
        else {
            this.setToDate(value.format(this.format));
            if (value.isBefore(this.fromDate)) {
                this.fromDate = this.toDate.clone();
            }
        }
        if (this.options.autoApply) {
            !isLeft ? this.toggleCalendars(false) : this.toggleCalendars(true);
            this.setRange();
            this.emitRangeSelected();
        }
        else {
            this.enableApplyButton = true;
        }
    };
    DaterangepickerComponent.prototype.emitRangeSelected = function () {
        this.rangeSelected.emit({
            start: this.getMoment(this.fromDate),
            end: this.getMoment(this.toDate)
        });
    };
    DaterangepickerComponent.prototype.getMoment = function (value) {
        return moment(value, this.format);
    };
    DaterangepickerComponent.prototype.getValidateMoment = function (value) {
        var momentValue = null;
        if (moment(value, this.format, true).isValid()) {
            momentValue = moment(value, this.format, true);
        }
        return momentValue;
    };
    DaterangepickerComponent.prototype.setRange = function () {
        this.range = this.fromDate.format(this.format) + " - " + this.toDate.format(this.format);
    };
    DaterangepickerComponent.prototype.formatFromDate = function (event) {
        if (event.target.value !== this.fromDate.format(this.format)) {
            this.dateChanged({
                day: event.target.value ? this.getMoment(event.target.value) : moment(),
                isLeft: true
            });
        }
    };
    DaterangepickerComponent.prototype.formatToDate = function (event) {
        if (event.target.value !== this.toDate.format(this.format)) {
            this.dateChanged({
                day: event.target.value ? this.getMoment(event.target.value) : moment(),
                isLeft: false
            });
        }
    };
    DaterangepickerComponent.prototype.monthChanged = function (data) {
        var temp;
        if (data.isLeft) {
            temp = moment([this.fromYear, this.fromMonth]).add(data.value, 'months');
            this.fromMonth = temp.get('month');
            this.fromYear = temp.get('year');
        }
        else {
            temp = moment([this.toYear, this.toMonth]).add(data.value, 'months');
            this.toMonth = temp.get('month');
            this.toYear = temp.get('year');
        }
    };
    DaterangepickerComponent.prototype.storeOldDates = function () {
        if (!this.areOldDatesStored) {
            this.oldFromDate = this.fromDate;
            this.oldToDate = this.toDate;
            this.areOldDatesStored = true;
        }
    };
    DaterangepickerComponent.prototype.restoreOldDates = function () {
        this.fromDate = this.oldFromDate;
        this.toDate = this.oldToDate;
    };
    DaterangepickerComponent.prototype.apply = function () {
        this.toggleCalendars(false);
    };
    DaterangepickerComponent.prototype.cancel = function () {
        this.restoreOldDates();
        this.toggleCalendars(false);
    };
    DaterangepickerComponent.prototype.applyPredefinedRange = function (data) {
        this.setFromDate(data.value.start);
        this.setToDate(data.value.end);
        this.toggleCalendars(false);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', daterangepicker_options_1.Options)
    ], DaterangepickerComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DaterangepickerComponent.prototype, "class", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], DaterangepickerComponent.prototype, "rangeSelected", void 0);
    __decorate([
        core_1.HostListener('document:mousedown', ['$event']),
        core_1.HostListener('document:mouseup', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], DaterangepickerComponent.prototype, "handleOutsideClick", null);
    DaterangepickerComponent = __decorate([
        core_1.Component({
            selector: 'date-range-picker',
            templateUrl: require('./daterangepicker-component.html')
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DaterangepickerComponent);
    return DaterangepickerComponent;
}());
exports.DaterangepickerComponent = DaterangepickerComponent;
