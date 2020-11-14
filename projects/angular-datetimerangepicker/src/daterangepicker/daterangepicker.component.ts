import {
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Defaults } from "../daterangepicker-default-ranges";
import { Options } from "../daterangepicker-options";
declare var require: any;
const dayjs = require("dayjs");
declare var window: any;

@Component({
  selector: "daterangepicker",
  templateUrl: "./daterangepicker.component.html",
})
export class DaterangepickerComponent implements OnInit {
  //inputs
  @Input() options: Options;
  @Input() class: string;
  //outputs
  @Output() rangeSelected = new EventEmitter();
  //variables
  showCalendars: boolean;
  range: string = "";
  enableApplyButton: boolean = false;
  areOldDatesStored: boolean = false;
  fromDate: any;
  toDate: any;
  tempFromDate: any;
  tempToDate: any;
  oldFromDate: any;
  oldToDate: any;
  fromMonth: number;
  toMonth: number;
  fromYear: number;
  toYear: number;
  format: string;
  defaultRanges: {};
  //handle outside/inside click to show rangepicker
  @HostListener("document:mousedown", ["$event"])
  @HostListener("document:mouseup", ["$event"])
  @HostListener("document:keyup", ["$event"])
  handleOutsideClick(event) {
    if (!this.options.disabled) {
      let current: any = event.target;
      let host: any = this.elem.nativeElement;
      if (host.compareDocumentPosition) {
        if (
          host.compareDocumentPosition(current) &
          window.Node.DOCUMENT_POSITION_CONTAINED_BY
        ) {
          this.storeOldDates();
          return this.toggleCalendars(true);
        }
      } else if (host.contains) {
        if (host.contains(current)) {
          this.storeOldDates();
          return this.toggleCalendars(true);
        }
      } else {
        do {
          if (current === host) {
            this.storeOldDates();
            return this.toggleCalendars(true);
          }
          current = current.parentNode;
        } while (current);
      }
      if (this.showCalendars) {
        if (!this.isAutoApply()) {
          this.restoreOldDates();
        }
        this.toggleCalendars(false);
      }
    }
  }
  constructor(private elem: ElementRef) {}
  getThemeName() {
    return this.options.theme === "dark";
  }
  toggleCalendars(value) {
    this.showCalendars = value;
    if (!value) {
      this.areOldDatesStored = false;
      this.updateCalendar();
    }
  }
  updateCalendar() {
    //get month and year to show calendar
    var fromDate = this.fromDate || this.tempFromDate;
    var toDate = this.toDate || this.tempToDate;
    let tDate = dayjs(fromDate, this.format);
    this.fromMonth = tDate.get("month");
    this.fromYear = tDate.get("year");
    tDate = dayjs(toDate, this.format);
    this.toMonth = tDate.get("month");
    this.toYear = tDate.get("year");
    this.setRange();
  }
  ngOnInit(): void {
    //get default options provided by user
    this.setFormat();
    this.validateMinMaxDates();
    this.setFromDate(this.options.startDate);
    this.setToDate(this.options.endDate);
    this.defaultRanges = this.validatePredefinedRanges(
      this.options.preDefinedRanges || Defaults.ranges
    );
    //update calendar grid
    this.updateCalendar();
  }
  getPositionClass(): string {
    let positionClass = "open-left";
    if (this.options.position === "right") {
      positionClass = "open-right";
    }
    if (this.options.position === "center" && !this.options.singleCalendar) {
      positionClass = "open-center";
    }
    return positionClass;
  }
  setFormat() {
    if (this.options) {
      this.format = this.options.format || "YYYY-MM-DD";
    } else {
      this.format = "YYYY-MM-DD";
    }
  }
  validateMinMaxDates() {
    if (this.options) {
      //only mindate is suppplied
      if (this.options.minDate && !this.options.maxDate) {
        this.options.minDate = this.getDayjs(this.options.minDate);
      }
      //only maxdate is supplied
      if (!this.options.minDate && this.options.maxDate) {
        this.options.maxDate = this.getDayjs(this.options.maxDate);
      }
      //both min and max dates are supplied
      if (this.options.minDate && this.options.maxDate) {
        this.options.minDate = this.getDayjs(this.options.minDate);
        this.options.maxDate = this.getDayjs(this.options.maxDate);
        if (this.options.maxDate.isBefore(this.options.minDate, "date")) {
          this.options.minDate = "";
          this.options.maxDate = "";
          console.warn(
            "supplied minDate is after maxDate. Discarding options for minDate and maxDate"
          );
        }
      }
      if (
        this.options.minDate &&
        this.options.minDate.format("HH:mm") === "00:00"
      ) {
        this.options.minDate.set({
          hour: 0,
          minutes: 0,
          seconds: 0,
        });
      }
      if (
        this.options.maxDate &&
        this.options.maxDate.format("HH:mm") === "00:00"
      ) {
        this.options.maxDate.set({
          hour: 23,
          minutes: 59,
          seconds: 59,
        });
      }
    }
  }
  setFromDate(value) {
    if (this.options.noDefaultRangeSelected && !value) {
      this.fromDate = "";
      this.tempFromDate = this.getActualFromDate(value);
    } else {
      this.fromDate = this.getActualFromDate(value);
    }
  }
  getActualFromDate(value) {
    let temp;
    if ((temp = this.getValidateDayjs(value))) {
      return this.getValidateFromDate(temp);
    } else {
      return this.getValidateFromDate(dayjs());
    }
  }
  getValidateFromDate(value) {
    if (!this.options.timePicker) {
      if (
        this.options.minDate &&
        this.options.maxDate &&
        value.isSameOrAfter(this.options.minDate, "date") &&
        value.isSameOrBefore(this.options.maxDate, "date")
      ) {
        return value;
      } else if (
        this.options.minDate &&
        !this.options.maxDate &&
        value.isAfter(this.options.minDate, "date")
      ) {
        return value;
      } else if (this.options.minDate) {
        return this.options.minDate.clone();
      } else {
        return dayjs();
      }
    } else {
      if (
        this.options.minDate &&
        this.options.maxDate &&
        value.isSameOrAfter(this.options.minDate, this.options.format) &&
        value.isSameOrBefore(this.options.maxDate, this.options.format)
      ) {
        return value;
      } else if (
        this.options.minDate &&
        !this.options.maxDate &&
        value.isAfter(this.options.minDate, this.options.format)
      ) {
        return value;
      } else if (this.options.minDate) {
        return this.options.minDate.clone();
      } else {
        return dayjs();
      }
    }
  }
  setToDate(value) {
    if (this.options.noDefaultRangeSelected && !value) {
      this.toDate = "";
      this.tempToDate = this.getActualToDate(value);
    } else {
      this.toDate = this.getActualToDate(value);
    }
  }
  getActualToDate(value) {
    let temp;
    if ((temp = this.getValidateDayjs(value))) {
      return this.getValidateToDate(temp);
    } else {
      return this.getValidateToDate(dayjs());
    }
  }
  getValidateToDate(value) {
    if (!this.options.timePicker) {
      if (
        (this.options.maxDate && value.isSameOrAfter(this.fromDate, "date"),
        value.isSameOrBefore(this.options.maxDate, "date"))
      ) {
        return value;
      } else if (this.options.maxDate) {
        return this.options.maxDate.clone();
      } else {
        return dayjs();
      }
    } else {
      if (
        (this.options.maxDate &&
          value.isSameOrAfter(this.fromDate, this.options.format),
        value.isSameOrBefore(this.options.maxDate, this.options.format))
      ) {
        return value;
      } else if (this.options.maxDate) {
        return this.options.maxDate.clone();
      } else {
        return dayjs();
      }
    }
  }
  //detects which date to set from or to and validates
  dateChanged(data) {
    let value = data.day;
    let isLeft = data.isLeft;
    if (isLeft) {
      if (!this.options.timePicker) {
        value.set({
          hour: 0,
          minute: 0,
          second: 0,
        });
      }
      this.fromDate = value;
      if (!this.options.timePicker) {
        if (value.isAfter(this.toDate, "date")) {
          this.toDate = this.fromDate.clone();
        }
      } else {
        if (value.isAfter(this.toDate, this.options.format)) {
          this.toDate = this.fromDate.clone();
        }
      }
    } else {
      if (!this.options.timePicker) {
        value.set({
          hour: 23,
          minute: 59,
          second: 59,
        });
      }
      //this.setToDate(value.format(this.format));
      this.toDate = value;
      if (!this.options.timePicker) {
        if (value.isBefore(this.fromDate, "date")) {
          this.fromDate = this.toDate.clone();
        }
      } else {
        if (value.isBefore(this.fromDate, this.options.format)) {
          this.fromDate = this.toDate.clone();
        }
      }
    }
    if (this.isAutoApply()) {
      if (this.options.singleCalendar || !isLeft) {
        this.toggleCalendars(false);
        this.setRange();
        this.emitRangeSelected();
      }
    } else if (!this.options.singleCalendar && !isLeft) {
      this.enableApplyButton = true;
    } else if (this.options.singleCalendar) {
      this.enableApplyButton = true;
    }
    this.fromMonth = this.fromDate
      ? this.fromDate.get("month")
      : this.fromMonth;
    this.toMonth = this.toDate ? this.toDate.get("month") : this.toMonth;
    this.fromYear = this.fromDate.get("year");
    this.toYear = this.toDate.get("year");
    if (!this.toDate && this.fromDate) {
      this.toYear = this.fromYear;
      this.toMonth = this.fromMonth;
    }
    if (this.toYear < this.fromYear) {
      this.toYear = this.fromYear;
    }
  }
  emitRangeSelected() {
    let data = {};
    if (this.options.singleCalendar) {
      data = {
        start: this.getDayjs(this.fromDate),
      };
    } else {
      data = {
        start: this.getDayjs(this.fromDate),
        end: this.getDayjs(this.toDate),
      };
    }
    this.rangeSelected.emit(data);
  }
  getDayjs(value) {
    return dayjs(value, this.format);
  }
  getValidateDayjs(value) {
    let dayjsValue = null;
    if (dayjs(value, this.format, true).isValid()) {
      dayjsValue = dayjs(value, this.format, true);
    }
    return dayjsValue;
  }
  setRange() {
    const displayFormat =
      this.options.displayFormat !== undefined
        ? this.options.displayFormat
        : this.format;
    if (this.options.singleCalendar && this.fromDate) {
      this.range = this.fromDate.format(displayFormat);
    } else if (this.fromDate && this.toDate) {
      this.range =
        this.fromDate.format(displayFormat) +
        " - " +
        this.toDate.format(displayFormat);
    } else {
      this.range = "";
    }
  }
  formatFromDate(event) {
    if (event.target.value !== this.fromDate.format(this.format)) {
      this.dateChanged({
        day: event.target.value ? this.getDayjs(event.target.value) : dayjs(),
        isLeft: true,
      });
    }
  }
  formatToDate(event) {
    if (event.target.value !== this.toDate.format(this.format)) {
      this.dateChanged({
        day: event.target.value ? this.getDayjs(event.target.value) : dayjs(),
        isLeft: false,
      });
    }
  }
  monthChanged(data) {
    let temp;
    if (data.isLeft) {
      temp = dayjs([this.fromYear, this.fromMonth]).add(data.value, "months");
      this.fromMonth = temp.get("month");
      this.fromYear = temp.get("year");
    } else {
      temp = dayjs([this.toYear, this.toMonth]).add(data.value, "months");
      this.toMonth = temp.get("month");
      this.toYear = temp.get("year");
    }
  }
  yearChanged(data) {
    let temp;
    if (data.isLeft) {
      temp = dayjs([this.fromYear, this.fromMonth]).add(data.value, "year");
      this.fromMonth = temp.get("month");
      this.fromYear = temp.get("year");
    } else {
      temp = dayjs([this.toYear, this.toMonth]).add(data.value, "year");
      this.toMonth = temp.get("month");
      this.toYear = temp.get("year");
    }
  }
  storeOldDates() {
    if (!this.areOldDatesStored) {
      this.oldFromDate = this.fromDate;
      this.oldToDate = this.toDate;
      this.areOldDatesStored = true;
    }
  }
  restoreOldDates() {
    this.fromDate = this.oldFromDate;
    this.toDate = this.oldToDate;
  }
  apply() {
    this.toggleCalendars(false);
    this.setRange();
    this.emitRangeSelected();
  }
  cancel() {
    this.restoreOldDates();
    this.toggleCalendars(false);
  }
  clear() {
    this.fromDate = this.toDate = "";
    this.apply();
    this.enableApplyButton = false;
    this.emitRangeSelected();
    this.fromYear = this.toYear = dayjs().get("year");
    this.fromMonth = this.toMonth = dayjs().get("month");
  }
  applyPredefinedRange(data) {
    this.setFromDate(data.value.start);
    this.setToDate(data.value.end);
    this.toggleCalendars(false);
    this.emitRangeSelected();
  }
  validatePredefinedRanges(ranges) {
    return ranges.filter((range) => {
      if (range.value.start.isAfter(range.value.end, "date")) {
        return false;
      }
      if (
        this.options.minDate &&
        range.value.start.isBefore(this.options.minDate, this.options.format)
      ) {
        return false;
      }
      if (
        this.options.maxDate &&
        range.value.end.isAfter(this.options.maxDate, this.options.format)
      ) {
        return false;
      }
      return true;
    });
  }
  isAutoApply() {
    if (this.options.timePicker) {
      return false;
    } else if (this.options.singleCalendar) {
      return true;
    } else {
      return this.options.autoApply;
    }
  }
}
