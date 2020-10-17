import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
declare var require: any;
var moment = require("moment");
require("moment-range");

@Component({
  selector: "calendar",
  templateUrl: "./calendar-component.html",
})
export class CalendarComponent implements OnChanges {
  @Input() month: string;
  @Input() year: string;
  @Input() selectedFromDate: string;
  @Input() selectedToDate: string;
  @Input() isLeft: boolean;
  @Input() format: string;
  @Input() minDate: string;
  @Input() maxDate: string;
  @Input() inactiveBeforeStart: boolean;
  @Input() disableBeforeStart: boolean;
  @Input() timePicker: any;
  @Input() singleCalendar: boolean = false;
  get monthText() {
    let months = moment.monthsShort();
    return months[this.month];
  }
  @Output() dateChanged = new EventEmitter();
  @Output() monthChanged = new EventEmitter();
  @Output() yearChanged = new EventEmitter();

  weekList: any;

  getWeekNumbers(monthRange: any) {
    let weekNumbers = [];
    let indexOf =
      [].indexOf ||
      function (item) {
        for (var i = 0, l = this.length; i < l; i++) {
          if (i in this && this[i] === item) return i;
        }
        return -1;
      };
    monthRange.by("days", function (moment) {
      let ref;
      if (
        weekNumbers.length < 6 &&
        ((ref = moment.week()), indexOf.call(weekNumbers, ref)) < 0
      ) {
        return weekNumbers.push(moment.week());
      }
    });
    return weekNumbers;
  }
  getWeeksRange(weeks: any, year: any, month: any) {
    let weeksRange = [];

    for (let i = 0, len = weeks.length; i < len; i++) {
      let week = weeks[i];
      let firstWeekDay, lastWeekDay;
      if (i > 0 && week < weeks[i - 1]) {
        firstWeekDay = moment([year, month]).add(1, "year").week(week).day(0);
        lastWeekDay = moment([year, month]).add(1, "year").week(week).day(6);
      } else {
        firstWeekDay = moment([year, month]).week(week).day(0);
        lastWeekDay = moment([year, month]).week(week).day(6);
      }
      let weekRange = moment.range(firstWeekDay, lastWeekDay);
      weeksRange.push(weekRange);
    }
    return weeksRange;
  }
  createCalendarGridData(): void {
    let year = this.year;
    let month = this.month;
    let startDate = moment([year, month]);
    let firstDay = moment(startDate).startOf("month");
    let endDay = moment(startDate).add(60, "d");
    let monthRange = moment.range(firstDay, endDay);
    let weeksRange = [];
    let that = this;
    weeksRange = this.getWeeksRange(
      this.getWeekNumbers(monthRange),
      year,
      month
    );

    let weekList = [];
    weeksRange.map(function (week) {
      let daysList = [];
      week.by("days", function (day) {
        if (day.isSame(moment(that.minDate, that.format), "date")) {
          day = moment(that.minDate, that.format);
        }
        if (day.isSame(moment(that.maxDate, that.format), "date")) {
          day = moment(that.maxDate, that.format);
        }
        daysList.push(day);
      });
      weekList.push(daysList);
    });
    this.weekList = weekList;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.createCalendarGridData();
  }
  isDisabled(day) {
    return (
      day.isBefore(moment(this.minDate, this.format)) ||
      day.isAfter(moment(this.maxDate, this.format)) ||
      (day.isBefore(moment(this.selectedFromDate, this.format)) &&
        this.disableBeforeStart &&
        !this.isLeft)
    );
  }
  isDateAvailable(day) {
    if (day.get("month") !== this.month) {
      return false;
    }
    if (
      this.inactiveBeforeStart &&
      day.isBefore(this.selectedFromDate, "date")
    ) {
      return false;
    }
    return true;
  }
  isSelectedDate(day) {
    if (
      day.get("month") === this.month &&
      day.isSame(this.selectedFromDate, "date")
    ) {
      return true;
    }
    if (
      day.get("month") === this.month &&
      day.isSameOrAfter(this.selectedFromDate, "date") &&
      day.isSameOrBefore(this.selectedToDate, "date")
    ) {
      return true;
    }
  }
  dateSelected(day) {
    this.dateChanged.emit({
      day: day,
      isLeft: this.isLeft,
    });
  }
  monthSelected(value) {
    this.monthChanged.emit({
      value: value,
      isLeft: this.isLeft,
    });
  }
  yearSelected(value) {
    this.yearChanged.emit({
      value: value,
      isLeft: this.isLeft,
    });
  }
}
