import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';
import calendarize from 'calendarize';
import dayjs, { Dayjs } from 'dayjs';
import customParser from 'dayjs/plugin/customParseFormat';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import {
  DateChanged,
  MonthNameValue,
  Timepicker,
  YearMonthChanged,
} from '../types';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParser);

@Component({
  selector: 'calendar',
  templateUrl: './calendar-component.html',
})
export class Calendar implements OnChanges {
  // #region Components inputs
  @Input() month: number;
  @Input() year: number;
  @Input() selectedFromDate: Dayjs;
  @Input() selectedToDate: Dayjs;
  @Input() isLeft: boolean;
  @Input() format: string;
  @Input() minDate: Dayjs;
  @Input() maxDate: Dayjs;
  @Input() inactiveBeforeStart: boolean;
  @Input() disableBeforeStart: boolean;
  @Input() timePicker: Timepicker;
  @Input() singleCalendar: boolean;
  @Input() weekStartsOn: number;
  @Input() addTouchSupport: boolean;
  @Input() disabledDates: Dayjs[];
  @Input() disabledDays: number[];
  @Input() disableWeekEnds: boolean;
  // #endregion

  // #region component outputs
  maxYear = 0;
  maxMonth = 0;
  minYear = 0;
  minMonth = 0;
  @Output() dateChanged: EventEmitter<DateChanged> = new EventEmitter();
  @Output() monthChanged: EventEmitter<YearMonthChanged> = new EventEmitter();
  @Output() yearChanged: EventEmitter<YearMonthChanged> = new EventEmitter();
  @Output() scrollTop: EventEmitter<void> = new EventEmitter();
  // #endregion

  // #region all component variables
  isTouch = false;
  weekList: Dayjs[][];
  weekDays: string[];
  monthsList: MonthNameValue[] = [];
  yearsList: number[] = [];
  weekEndOn: number[];
  // #endregion

  // #region setters and getters
  get monthText() {
    return dayjs()
      .set('year', +this.year)
      .set('month', +this.month)
      .format('MMM');
  }
  // #endregion

  // #region Component Life cycle handlers
  ngOnChanges(): void {
    this.isTouch =
      this.addTouchSupport && !window.matchMedia('(hover: hover)').matches;
    this.maxYear = this.maxDate ? this.maxDate.get('year') : 100000;
    this.maxMonth = this.maxDate ? this.maxDate.get('month') : 12;
    this.minYear = this.minDate ? this.minDate.get('year') : 0;
    this.minMonth = this.minDate ? this.minDate.get('month') : -1;
    this.createCalendarGridData();
  }
  // #endregion

  // #region view manipulations and condition providers
  getNextMonthFirstWeek(): Dayjs[] {
    const thisMonthStartDate = dayjs()
      .set('year', +this.year)
      .set('month', +this.month)
      .startOf('month');
    const nextMonthStartDate = thisMonthStartDate
      .add(1, 'month')
      .startOf('month');
    const year = nextMonthStartDate.get('year');
    const month = nextMonthStartDate.get('month');
    return calendarize(nextMonthStartDate.toDate(), this.weekStartsOn)
      .shift()
      .filter(Boolean)
      .map((day) => {
        return dayjs()
          .set('year', year)
          .set('month', month)
          .set('date', day)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0);
      });
  }
  getPreviousMonthNthLastWeek(nthLastCount): Dayjs[] {
    const thisMonthStartDate = dayjs()
      .set('year', +this.year)
      .set('month', +this.month)
      .startOf('month');
    const previousMonthStartDate = thisMonthStartDate
      .subtract(1, 'month')
      .startOf('month');
    const year = previousMonthStartDate.get('year');
    const month = previousMonthStartDate.get('month');
    return calendarize(previousMonthStartDate.toDate(), this.weekStartsOn)
      .slice(-nthLastCount)[0]
      .filter(Boolean)
      .map((day) => {
        return dayjs()
          .set('year', year)
          .set('month', month)
          .set('date', day)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0);
      });
  }
  createTouchCalendarGridData(): void {
    const monthsList = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    this.yearsList = [];
    this.monthsList = [];
    for (let i = 1900; i <= +dayjs().add(100, 'year').get('year'); i++) {
      if (i < this.minYear || i > this.maxYear) {
        continue;
      }
      this.yearsList.push(i);
    }
    for (let i = 0; i < monthsList.length; i++) {
      if (this.year === this.minYear && i < this.minMonth) {
        continue;
      }
      if (this.year === this.maxYear && i > this.maxMonth) {
        continue;
      }
      this.monthsList.push({
        name: monthsList[i],
        value: i,
      });
    }
  }
  createCalendarGridData(): void {
    if (this.year <= this.minYear && this.month < this.minMonth) {
      this.year = this.minYear;
      this.month = this.minMonth;
    }
    if (this.year >= this.maxYear && this.month > this.maxMonth) {
      this.year = this.maxYear;
      this.month = this.maxMonth;
    }
    let year = null;
    let month = null;
    this.setWeekDays();
    this.setWeekEnd();
    const thisMonthStartDate = dayjs()
      .set('year', +this.year)
      .set('month', +this.month)
      .startOf('month');
    year = thisMonthStartDate.get('year');
    month = thisMonthStartDate.get('month');
    const thisMonthWeekList = calendarize(
      thisMonthStartDate.toDate(),
      this.weekStartsOn
    ).map((week) => {
      return week.filter(Boolean).map((day) => {
        if (day === 0) {
          return null;
        }
        return dayjs()
          .set('year', year)
          .set('month', month)
          .set('date', day)
          .set('hour', 0)
          .set('minute', 0)
          .set('second', 0)
          .set('millisecond', 0);
      });
    });
    // if this months first week has less than 7 days then take previous month's last week and merge them
    // This should be done only for grid view which is shown only on non touch devices
    if (!this.isTouch) {
      if (thisMonthWeekList[0].length < 7) {
        thisMonthWeekList[0] = this.getPreviousMonthNthLastWeek(1).concat(
          thisMonthWeekList[0]
        );
      }
      // if this months last week has less than 7 days then take next month's first week and merge them
      if (thisMonthWeekList.slice(-1)[0].length < 7) {
        thisMonthWeekList[
          thisMonthWeekList.length - 1
        ] = thisMonthWeekList.slice(-1)[0].concat(this.getNextMonthFirstWeek());
      }
      // if total number of weeks is less than 6 then we need to add one more week
      // Here we add previous months second last week
      if (thisMonthWeekList.length < 6) {
        thisMonthWeekList.unshift(this.getPreviousMonthNthLastWeek(2));
      }
    } else {
      this.createTouchCalendarGridData();
    }
    this.weekList = thisMonthWeekList;
  }
  setWeekEnd() {
    this.weekEndOn = [this.weekStartsOn, this.weekStartsOn + 6];
  }
  setWeekDays() {
    let weekDays = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
    weekDays = [
      ...weekDays.slice(this.weekStartsOn, 7),
      ...weekDays.slice(0, this.weekStartsOn),
    ];
    this.weekDays = weekDays;
  }
  isDisabled(day: Dayjs) {
    if (this.disableWeekEnds && this.weekEndOn.includes(day.get('day'))) {
      return true;
    }
    if (this.disabledDays && this.disabledDays.includes(day.get('day'))) {
      return true;
    }
    if (
      this.disabledDates &&
      this.disabledDates.find((x) => x.isSame(day, 'date'))
    ) {
      return true;
    }
    if (this.disableBeforeStart && !this.isLeft) {
      return day.isBefore(this.selectedFromDate);
    }
    return day.isBefore(this.minDate) || day.isAfter(this.maxDate);
  }
  isDateAvailable(day: Dayjs) {
    if (day.get('month') !== this.month) {
      return false;
    }
    if (
      !this.singleCalendar &&
      this.inactiveBeforeStart &&
      day.isBefore(this.selectedFromDate, 'date')
    ) {
      return false;
    }
    return true;
  }
  isSelectedDate(day) {
    if (
      day.get('month') === this.month &&
      day.isSame(this.selectedFromDate, 'date')
    ) {
      return true;
    }
    if (
      !this.singleCalendar &&
      day.get('month') === this.month &&
      day.isSameOrAfter(this.selectedFromDate, 'date') &&
      day.isSameOrBefore(this.selectedToDate, 'date')
    ) {
      return true;
    }
  }
  getFormattedDate(day) {
    return day.format(this.format);
  }
  // #endregion

  // #region self event handlers
  scrollMeOutTop() {
    this.scrollTop.emit();
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
    if (value) {
      this.yearChanged.emit({
        value: value,
        isLeft: this.isLeft,
      });
    }
  }
  // #endregion
}
