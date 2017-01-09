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
var moment = require('moment');
var options = (function () {
    function options() {
        this.startDate = moment().startOf('day');
        this.endDate = moment().endOf('day');
        this.minDate = false;
        this.maxDate = false;
        this.dateLimit = false;
        this.autoApply = false;
        this.singleDatePicker = false;
        this.showDropdowns = false;
        this.showWeekNumbers = false;
        this.showISOWeekNumbers = false;
        this.showCustomRangeLabel = true;
        this.timePicker = false;
        this.timePicker24Hour = false;
        this.timePickerIncrement = 1;
        this.timePickerSeconds = false;
        this.linkedCalendars = true;
        this.autoUpdateInput = true;
        this.alwaysShowCalendars = false;
        this.ranges = {};
    }
    return options;
}());
var DaterangepickerComponent = (function () {
    function DaterangepickerComponent() {
        this.selectedMonth = moment().get('month');
        this.selectedYear = moment().get('year');
        this.toMonth = moment([this.selectedYear, this.selectedMonth]).add(1, 'months').get('month');
        this.fromMonth = moment([this.selectedYear, this.selectedMonth]).get('month');
    }
    DaterangepickerComponent.prototype.showHideCalendars = function (value) {
        this.showCalendars = value;
    };
    ;
    DaterangepickerComponent.prototype.dateChanged = function (data) {
        if (data.changed === 'left') {
            this.fromDate = data.value.format("YYYY-MM-DD");
        }
        else {
            this.toDate = data.value.format("YYYY-MM-DD");
        }
    };
    DaterangepickerComponent.prototype.monthChanged = function (data) {
        if (data.changed === 'left') {
            var temp = moment([this.selectedYear, this.fromMonth]).subtract(1, 'months');
            this.fromMonth = temp.get('month');
            this.selectedYear = temp.get('year');
            this.toMonth = moment([this.selectedYear, this.toMonth]).subtract(1, 'months').get('month');
        }
        else {
            var temp = moment([this.selectedYear, this.toMonth]).add(1, 'months');
            this.fromMonth = moment([this.selectedYear, this.fromMonth]).add(1, 'months').get('month');
            this.toMonth = temp.get('month');
            this.selectedYear = temp.get('year');
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', options)
    ], DaterangepickerComponent.prototype, "options", void 0);
    DaterangepickerComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            selector: 'date-range-picker',
            templateUrl: './daterangepicker-component.html',
            styleUrls: ['./daterangepicker-component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], DaterangepickerComponent);
    return DaterangepickerComponent;
}());
exports.DaterangepickerComponent = DaterangepickerComponent;
