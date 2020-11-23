import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import calendarize from "calendarize";
import { DateChanged, Timepicker, YearMonthChanged } from "../types";
import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import customParser from "dayjs/plugin/customParseFormat";

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParser);

@Component({
  selector: "calendar",
  templateUrl: "./calendar-component.html",
})
export class CalendarComponent implements OnChanges {
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
  @Input() singleCalendar: boolean = false;
  // #endregion

  // #region component outputs
  @Output() dateChanged: EventEmitter<DateChanged> = new EventEmitter();
  @Output() monthChanged: EventEmitter<YearMonthChanged> = new EventEmitter();
  @Output() yearChanged: EventEmitter<YearMonthChanged> = new EventEmitter();
  // #endregion

  // #region all component variables
  weekList: Dayjs[][];
  // #endregion

  // #region setters and getters
  get monthText() {
    return dayjs()
      .set("year", +this.year)
      .set("month", +this.month)
      .format("MMM");
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
    const thisMonthStartDate = dayjs()
      .set("year", +this.year)
      .set("month", +this.month)
      .startOf("month");
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
        return dayjs()
          .set("year", year)
          .set("month", month)
          .set("date", day)
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
      });
    year = thisMonthStartDate.get("year");
    month = thisMonthStartDate.get("month");
    const thisMonthweekList = calendarize(thisMonthStartDate.toDate()).map(
      (week) => {
        return week.filter(Boolean).map((day) => {
          if (day === 0) {
            return null;
          }
          return dayjs()
            .set("year", year)
            .set("month", month)
            .set("date", day)
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0);
        });
      }
    );
    year = nextMonthStartDate.get("year");
    month = nextMonthStartDate.get("month");
    const nextMonthFirstWeek = calendarize(nextMonthStartDate.toDate())
      .shift()
      .filter(Boolean)
      .map((day) => {
        return dayjs()
          .set("year", year)
          .set("month", month)
          .set("date", day)
          .set("hour", 0)
          .set("minute", 0)
          .set("second", 0)
          .set("millisecond", 0);
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
          return dayjs()
            .set("year", year)
            .set("month", month)
            .set("date", day)
            .set("hour", 0)
            .set("minute", 0)
            .set("second", 0)
            .set("millisecond", 0);
        });
      thisMonthweekList.unshift(previousMonthSecondLastWeek);
    }
    this.weekList = thisMonthweekList;
  }
  isDisabled(day: Dayjs) {
    return (
      day.isBefore(this.minDate) ||
      day.isAfter(this.maxDate) ||
      (day.isBefore(this.selectedFromDate) &&
        this.disableBeforeStart &&
        !this.isLeft)
    );
  }
  isDateAvailable(day: Dayjs) {
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
