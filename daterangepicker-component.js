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
        this.toMonth = moment([this.toYear, this.toMonth]).add(1, 'months').get('month');
        this.fromMonth = moment([this.fromYear, this.fromMonth]).get('month');
    }
    DaterangepickerComponent.prototype.handleOutsideClick = function (event) {
        var current = event.target;
        var host = this.elem.nativeElement;
        do {
            if (current === host) {
                this.showCalendars = true;
                return;
            }
            current = current.parentNode;
        } while (current);
        this.showCalendars = false;
    };
    DaterangepickerComponent.prototype.ngOnInit = function () {
        var tDate = moment(this.options.startDate, this.options.format);
        this.fromMonth = tDate.get('month');
        this.fromYear = tDate.get('year');
        tDate = moment(this.options.startDate, this.options.format).add(1, 'months');
        this.toMonth = tDate.get('month');
        this.toYear = tDate.get('year');
        this.format = this.options.format;
    };
    DaterangepickerComponent.prototype.dateChanged = function (data) {
        if (data.changed === 'left') {
            this.fromDate = data.value;
        }
        else {
            this.toDate = data.value;
        }
    };
    DaterangepickerComponent.prototype.monthChanged = function (data) {
        var temp;
        if (data.changed === 'left') {
            temp = moment([this.fromYear, this.fromMonth]).subtract(1, 'months');
            this.fromMonth = temp.get('month');
            this.fromYear = temp.get('year');
            temp = moment([this.toYear, this.toMonth]).subtract(1, 'months');
            this.toMonth = temp.get('month');
            this.toYear = temp.get('year');
        }
        else {
            temp = moment([this.toYear, this.toMonth]).add(1, 'months');
            this.toMonth = temp.get('month');
            this.toYear = temp.get('year');
            temp = moment([this.fromYear, this.fromMonth]).add(1, 'months');
            this.fromMonth = temp.get('month');
            this.fromYear = temp.get('year');
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', daterangepicker_options_1.Options)
    ], DaterangepickerComponent.prototype, "options", void 0);
    __decorate([
        core_1.ViewChild('rangeInput'), 
        __metadata('design:type', Object)
    ], DaterangepickerComponent.prototype, "input", void 0);
    __decorate([
        core_1.HostListener('document:click', ['$event']),
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
            templateUrl: './daterangepicker-component.html',
            styleUrls: ['./daterangepicker-component.css']
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], DaterangepickerComponent);
    return DaterangepickerComponent;
}());
exports.DaterangepickerComponent = DaterangepickerComponent;
