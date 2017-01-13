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
    CalendarComponent.prototype.ngOnChanges = function (changes) {
        var indexOf = [].indexOf || function (item) { for (var i = 0, l = this.length; i < l; i++) {
            if (i in this && this[i] === item)
                return i;
        } return -1; };
        var year = this.year;
        var month = this.month;
        var startDate = moment([year, month]);
        var firstDay = moment(startDate).startOf('month');
        var endDay = moment(startDate).add(60, 'd');
        var monthRange = moment.range(firstDay, endDay);
        var weeks = [];
        monthRange.by('days', function (moment) {
            var ref;
            if (weeks.length < 6 && (ref = moment.week(), indexOf.call(weeks, ref)) < 0) {
                return weeks.push(moment.week());
            }
        });
        var calendar = [];
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
            calendar.push(weekRange);
        }
        var weekList = [];
        calendar.map(function (week) {
            var daysList = [];
            week.by('days', function (day) {
                daysList.push(day);
            });
            weekList.push(daysList);
        });
        this.weekList = weekList;
    };
    CalendarComponent.prototype.dateSelected = function (day) {
        this.dateChanged.emit(day.format(this.format));
    };
    CalendarComponent.prototype.monthSelected = function () {
        if (this.isLeft) {
            this.monthChanged.emit(-1);
        }
        else {
            this.monthChanged.emit(1);
        }
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
    ], CalendarComponent.prototype, "selectedDate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], CalendarComponent.prototype, "isLeft", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CalendarComponent.prototype, "format", void 0);
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
            moduleId: module.id,
            selector: 'calendar',
            templateUrl: './calendar-component.html',
            styleUrls: ['./daterangepicker-component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], CalendarComponent);
    return CalendarComponent;
}());
exports.CalendarComponent = CalendarComponent;
