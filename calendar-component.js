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
require('moment-range');
var CalendarComponent = (function () {
    function CalendarComponent() {
        this.dateChanged = new core_1.EventEmitter();
        this.monthChanged = new core_1.EventEmitter();
    }
    Object.defineProperty(CalendarComponent.prototype, "monthText", {
        get: function () {
            var months = moment.monthsShort();
            return months[this.month];
        },
        enumerable: true,
        configurable: true
    });
    CalendarComponent.prototype.getWeekNumbers = function (monthRange) {
        var weekNumbers = [];
        var indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
                return i;
        } return -1; };
        monthRange.by('days', function (moment) {
            var ref;
            if (weekNumbers.length < 6 && (ref = moment.week(), indexOf.call(weekNumbers, ref)) < 0) {
                return weekNumbers.push(moment.week());
            }
        });
        return weekNumbers;
    };
    CalendarComponent.prototype.getWeeksRange = function (weeks, year, month) {
        var weeksRange = [];
        for (var i = 0, len = weeks.length; i < len; i++) {
            var week = weeks[i];
            var firstWeekDay = void 0, lastWeekDay = void 0;
            if (i > 0 && week < weeks[i - 1]) {
                firstWeekDay = moment([year, month]).add(1, "year").week(week).day(0);
                lastWeekDay = moment([year, month]).add(1, "year").week(week).day(6);
            }
            else {
                firstWeekDay = moment([year, month]).week(week).day(0);
                lastWeekDay = moment([year, month]).week(week).day(6);
            }
            var weekRange = moment.range(firstWeekDay, lastWeekDay);
            weeksRange.push(weekRange);
        }
        return weeksRange;
    };
    CalendarComponent.prototype.createCalendarGridData = function () {
        var year = this.year;
        var month = this.month;
        var startDate = moment([year, month]);
        var firstDay = moment(startDate).startOf('month');
        var endDay = moment(startDate).add(60, 'd');
        var monthRange = moment.range(firstDay, endDay);
        var weeksRange = [];
        weeksRange = this.getWeeksRange(this.getWeekNumbers(monthRange), year, month);
        var weekList = [];
        weeksRange.map(function (week) {
            var daysList = [];
            week.by('days', function (day) {
                daysList.push(day);
            });
            weekList.push(daysList);
        });
        this.weekList = weekList;
    };
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        this.createCalendarGridData();
    };
    CalendarComponent.prototype.isDisabled = function (day) {
        if (day.isBefore(moment(this.minDate, this.format)) || day.isAfter(moment(this.maxDate, this.format))) {
            return true;
        }
    };
    CalendarComponent.prototype.isDateAvailable = function (day) {
        if (day.get('month') !== this.month) {
            return false;
        }
        if (this.inactiveBeforeStart && !this.isLeft && day.isBefore(this.selectedFromDate)) {
            return false;
        }
        return true;
    };
    CalendarComponent.prototype.isSelectedDate = function (day) {
        if (day.get('month') === this.month && day.isSameOrAfter(this.selectedFromDate, 'date') && day.isSameOrBefore(this.selectedToDate, 'date')) {
            return true;
        }
    };
    CalendarComponent.prototype.dateSelected = function (day) {
        this.dateChanged.emit({
            day: day,
            isLeft: this.isLeft
        });
    };
    CalendarComponent.prototype.monthSelected = function (value) {
        this.monthChanged.emit({
            value: value,
            isLeft: this.isLeft
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "month", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "year", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "selectedFromDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "selectedToDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "isLeft", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "format", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "minDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "maxDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "inactiveBeforeStart", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "dateChanged", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CalendarComponent.prototype, "monthChanged", void 0);
    CalendarComponent = __decorate([
        core_1.Component({
            selector: 'calendar',
            template: require('./calendar-component.html')
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
