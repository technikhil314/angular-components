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
var moment = require('moment');
var DaterangepickerComponent = (function () {
    function DaterangepickerComponent(elem) {
        this.elem = elem;
        //outputs
        this.rangeSelected = new core_1.EventEmitter();
        this.range = "";
    }
    //handle outside/inside click to show rangepicker
    DaterangepickerComponent.prototype.handleOutsideClick = function (event) {
        var current = event.target;
        var host = this.elem.nativeElement;
        if (host.compareDocumentPosition) {
            if (host.compareDocumentPosition(current) & Node.DOCUMENT_POSITION_CONTAINED_BY) {
                this.showCalendars = true;
                return;
            }
        }
        else if (host.contains) {
            if (host.contains(current)) {
                this.showCalendars = true;
                return;
            }
        }
        else {
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
    };
    DaterangepickerComponent.prototype.updateCalendar = function () {
        //get month and year to show calendar
        var tDate = moment(this.fromDate, this.format);
        this.fromMonth = tDate.get('month');
        this.fromYear = tDate.get('year');
        tDate = moment(this.fromDate, this.format).add(1, 'months');
        this.toMonth = tDate.get('month');
        this.toYear = tDate.get('year');
        this.setRange();
    };
    DaterangepickerComponent.prototype.ngOnInit = function () {
        //get default options provided by user
        if (this.options) {
            this.format = this.options.format || "YYYY-MM-DD";
            this.fromDate = this.getMoment(this.options.startDate) || moment();
            this.toDate = this.getMoment(this.options.endDate) || moment();
        }
        else {
            this.format = "YYYY-MM-DD";
            this.fromDate = moment();
            this.toDate = moment();
        }
        this.updateCalendar();
    };
    DaterangepickerComponent.prototype.dateChanged = function (value) {
        if ((this.fromDate && this.toDate) || !(this.fromDate || this.toDate)) {
            this.fromDate = value;
            this.toDate = void (0);
        }
        else if (this.fromDate && !this.toDate) {
            this.toDate = value;
            this.showCalendars = false;
            this.setRange();
            this.emitRangeSelected();
        }
    };
    DaterangepickerComponent.prototype.emitRangeSelected = function () {
        this.rangeSelected.emit({
            start: this.getMoment(this.fromDate),
            end: this.getMoment(this.toDate)
        });
    };
    DaterangepickerComponent.prototype.monthChanged = function (value) {
        var temp;
        temp = moment([this.fromYear, this.fromMonth]).add(value, 'months');
        this.fromMonth = temp.get('month');
        this.fromYear = temp.get('year');
        temp = moment([this.toYear, this.toMonth]).add(value, 'months');
        this.toMonth = temp.get('month');
        this.toYear = temp.get('year');
    };
    DaterangepickerComponent.prototype.getMoment = function (value) {
        return moment(value, this.format);
    };
    DaterangepickerComponent.prototype.getValidaMoment = function (value) {
        var momentValue = null;
        if (moment(value, this.format, true).isValid()) {
            momentValue = moment(value, this.format, true);
        }
        return momentValue;
    };
    DaterangepickerComponent.prototype.setRange = function () {
        this.range = this.fromDate.format(this.format) + " - " + this.toDate.format(this.format);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', daterangepicker_options_1.Options)
    ], DaterangepickerComponent.prototype, "options", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], DaterangepickerComponent.prototype, "className", void 0);
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
            moduleId: module.id,
            selector: 'date-range-picker',
            templateUrl: './daterangepicker-component.html'
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DaterangepickerComponent);
    return DaterangepickerComponent;
}());
exports.DaterangepickerComponent = DaterangepickerComponent;
