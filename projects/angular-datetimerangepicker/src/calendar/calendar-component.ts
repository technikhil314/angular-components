import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import calendarize from "calendarize";
declare var require: any;
const dayjs = require("dayjs");

@Component({
  selector: "calendar",
  templateUrl: "./calendar-component.html",
})
export class CalendarComponent implements OnChanges {
  // #region Components inputs
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
  // #endregion

  // #region component outputs
  @Output() dateChanged = new EventEmitter();
  @Output() monthChanged = new EventEmitter();
  @Output() yearChanged = new EventEmitter();
  // #endregion

  // #region all component variables
  weekList: any;
  // #endregion

  // #region setters and getters
  get monthText() {
    return dayjs([+this.year, +this.month]).format("MMM");
  }
  // #endregion

  // #region Component Life cycle handlers
  ngOnChanges(changes: SimpleChanges): void {
    this.createCalendarGridData();
  }
  // #endregion

  // #region view manipulations and condition providers
  createCalendarGridData(): void {
    let year = null;
    let month = null;
    const thisMonthStartDate = dayjs([this.year, this.month]).startOf("month");
    const previousMonthStartDate = thisMonthStartDate
      .subtract(1, "month")
      .startOf("month");
    const nextMonthStartDate = thisMonthStartDate
      .add(1, "month")
      .startOf("month");
    year = previousMonthStartDate.get("year");
    month = previousMonthStartDate.get("month");
    const previousMonthLastWeek = calendarize(previousMonthStartDate.toDate())
      .pop()
      .filter(Boolean)
      .map((day) => {
        return dayjs([year, month, day, 0, 0, 0, 0]);
      });
    year = thisMonthStartDate.get("year");
    month = thisMonthStartDate.get("month");
    const thisMonthweekList = calendarize(thisMonthStartDate.toDate()).map(
      (week) => {
        return week.filter(Boolean).map((day) => {
          if (day === 0) {
            return null;
          }
          return dayjs([year, month, day, 0, 0, 0, 0]);
        });
      }
    );
    year = nextMonthStartDate.get("year");
    month = nextMonthStartDate.get("month");
    const nextMonthFirstWeek = calendarize(nextMonthStartDate.toDate())
      .shift()
      .filter(Boolean)
      .map((day) => {
        return dayjs([year, month, day, 0, 0, 0, 0]);
      });
    if (thisMonthweekList[0].length < 7) {
      thisMonthweekList[0] = previousMonthLastWeek.concat(thisMonthweekList[0]);
    }
    if (thisMonthweekList.slice(-1)[0].length < 7) {
      thisMonthweekList[thisMonthweekList.length - 1] = thisMonthweekList
        .slice(-1)[0]
        .concat(nextMonthFirstWeek);
    }
    if (thisMonthweekList.length < 6) {
      year = previousMonthStartDate.get("year");
      month = previousMonthStartDate.get("month");
      const previousMonthSecondLastWeek = calendarize(
        previousMonthStartDate.toDate()
      )
        .slice(-2)[0]
        .filter(Boolean)
        .map((day) => {
          return dayjs([year, month, day, 0, 0, 0, 0]);
        });
      thisMonthweekList.unshift(previousMonthSecondLastWeek);
    }
    this.weekList = thisMonthweekList;
  }
  isDisabled(day) {
    return (
      day.isBefore(dayjs(this.minDate, this.format)) ||
      day.isAfter(dayjs(this.maxDate, this.format)) ||
      (day.isBefore(dayjs(this.selectedFromDate, this.format)) &&
        this.disableBeforeStart &&
        !this.isLeft)
    );
  }
  isDateAvailable(day) {
    if (day.get("month") !== this.month) {
      return false;
    }
    if (
      !this.singleCalendar &&
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
      !this.singleCalendar &&
      day.get("month") === this.month &&
      day.isSameOrAfter(this.selectedFromDate, "date") &&
      day.isSameOrBefore(this.selectedToDate, "date")
    ) {
      return true;
    }
  }
  getFormattedDate(day) {
    return day.format(this.format);
  }
  // #endregion

  // #region self event handlers
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
  // #endregion
}
