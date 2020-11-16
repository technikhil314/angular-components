import {
  Component,
  DoCheck,
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
export class DaterangepickerComponent implements OnInit, DoCheck {
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
  derivedOptions: Options;
  defaultRanges: {};
  //handle outside/inside click to show rangepicker
  @HostListener("document:mousedown", ["$event"])
  @HostListener("document:mouseup", ["$event"])
  @HostListener("document:keyup", ["$event"])
  handleOutsideClick(event) {
    if (!this.derivedOptions.disabled) {
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
    let tDate = dayjs(fromDate, this.derivedOptions.format);
    this.fromMonth = tDate.get("month");
    this.fromYear = tDate.get("year");
    tDate = dayjs(toDate, this.derivedOptions.format);
    this.toMonth = tDate.get("month");
    this.toYear = tDate.get("year");
    this.setRange();
  }
  ngDoCheck() {
    this.deriveOptions(true);
  }
  ngOnInit(): void {
    //get default options provided by user
    this.deriveOptions();
    this.validateMinMaxDates();
    this.setFromDate(this.derivedOptions.startDate);
    this.setToDate(this.derivedOptions.endDate);
    this.defaultRanges = this.validatePredefinedRanges(
      this.derivedOptions.preDefinedRanges || Defaults.ranges
    );
    //update calendar grid
    this.updateCalendar();
  }
  deriveOptions(isUpdate = false) {
    if (isUpdate) {
      const {
        startDate,
        endDate,
        minDate,
        maxDate,
        ...restOptions
      } = this.options;
      this.derivedOptions = {
        ...new Options(),
        ...restOptions,
      };
    } else {
      this.derivedOptions = {
        ...new Options(),
        ...this.options,
      };
    }
    if (this.derivedOptions.timePicker) {
      this.derivedOptions.autoApply = false;
    } else if (this.derivedOptions.singleCalendar) {
      this.derivedOptions.autoApply = true;
    }
  }
  validateMinMaxDates() {
    if (this.derivedOptions) {
      //only mindate is suppplied
      if (this.derivedOptions.minDate && !this.derivedOptions.maxDate) {
        this.derivedOptions.minDate = this.getDayjs(
          this.derivedOptions.minDate
        );
      }
      //only maxdate is supplied
      if (!this.derivedOptions.minDate && this.derivedOptions.maxDate) {
        this.derivedOptions.maxDate = this.getDayjs(
          this.derivedOptions.maxDate
        );
      }
      //both min and max dates are supplied
      if (this.derivedOptions.minDate && this.derivedOptions.maxDate) {
        this.derivedOptions.minDate = this.getDayjs(
          this.derivedOptions.minDate
        );
        this.derivedOptions.maxDate = this.getDayjs(
          this.derivedOptions.maxDate
        );
        if (
          this.derivedOptions.maxDate.isBefore(
            this.derivedOptions.minDate,
            "date"
          )
        ) {
          this.derivedOptions.minDate = "";
          this.derivedOptions.maxDate = "";
          console.warn(
            "supplied minDate is after maxDate. Discarding options for minDate and maxDate"
          );
        }
      }
      if (
        this.derivedOptions.minDate &&
        this.derivedOptions.minDate.format("HH:mm") === "00:00"
      ) {
        this.derivedOptions.minDate.set({
          hour: 0,
          minutes: 0,
          seconds: 0,
        });
      }
      if (
        this.derivedOptions.maxDate &&
        this.derivedOptions.maxDate.format("HH:mm") === "00:00"
      ) {
        this.derivedOptions.maxDate.set({
          hour: 23,
          minutes: 59,
          seconds: 59,
        });
      }
    }
  }
  setFromDate(value) {
    if (this.derivedOptions.noDefaultRangeSelected && !value) {
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
    if (!this.derivedOptions.timePicker) {
      if (
        this.derivedOptions.minDate &&
        this.derivedOptions.maxDate &&
        value.isSameOrAfter(this.derivedOptions.minDate, "date") &&
        value.isSameOrBefore(this.derivedOptions.maxDate, "date")
      ) {
        return value;
      } else if (
        this.derivedOptions.minDate &&
        !this.derivedOptions.maxDate &&
        value.isAfter(this.derivedOptions.minDate, "date")
      ) {
        return value;
      } else if (this.derivedOptions.minDate) {
        return this.derivedOptions.minDate.clone();
      } else {
        return dayjs();
      }
    } else {
      if (
        this.derivedOptions.minDate &&
        this.derivedOptions.maxDate &&
        value.isSameOrAfter(
          this.derivedOptions.minDate,
          this.derivedOptions.format
        ) &&
        value.isSameOrBefore(
          this.derivedOptions.maxDate,
          this.derivedOptions.format
        )
      ) {
        return value;
      } else if (
        this.derivedOptions.minDate &&
        !this.derivedOptions.maxDate &&
        value.isAfter(this.derivedOptions.minDate, this.derivedOptions.format)
      ) {
        return value;
      } else if (this.derivedOptions.minDate) {
        return this.derivedOptions.minDate.clone();
      } else {
        return dayjs();
      }
    }
  }
  setToDate(value) {
    if (this.derivedOptions.noDefaultRangeSelected && !value) {
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
    if (!this.derivedOptions.timePicker) {
      if (
        (this.derivedOptions.maxDate &&
          value.isSameOrAfter(this.fromDate, "date"),
        value.isSameOrBefore(this.derivedOptions.maxDate, "date"))
      ) {
        return value;
      } else if (this.derivedOptions.maxDate) {
        return this.derivedOptions.maxDate.clone();
      } else {
        return dayjs();
      }
    } else {
      if (
        (this.derivedOptions.maxDate &&
          value.isSameOrAfter(this.fromDate, this.derivedOptions.format),
        value.isSameOrBefore(
          this.derivedOptions.maxDate,
          this.derivedOptions.format
        ))
      ) {
        return value;
      } else if (this.derivedOptions.maxDate) {
        return this.derivedOptions.maxDate.clone();
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
      if (!this.derivedOptions.timePicker) {
        value.set({
          hour: 0,
          minute: 0,
          second: 0,
        });
      }
      this.fromDate = value;
      if (!this.derivedOptions.timePicker) {
        if (value.isAfter(this.toDate, "date")) {
          this.toDate = this.fromDate.clone();
        }
      } else {
        if (value.isAfter(this.toDate, this.derivedOptions.format)) {
          this.toDate = this.fromDate.clone();
        }
      }
    } else {
      if (!this.derivedOptions.timePicker) {
        value.set({
          hour: 23,
          minute: 59,
          second: 59,
        });
      }
      this.toDate = value;
      this.toYear = this.toDate.get("year");
      if (!this.derivedOptions.timePicker) {
        if (value.isBefore(this.fromDate, "date")) {
          this.fromDate = this.toDate.clone();
        }
      } else {
        if (value.isBefore(this.fromDate, this.derivedOptions.format)) {
          this.fromDate = this.toDate.clone();
        }
      }
    }
    if (this.isAutoApply()) {
      if (this.derivedOptions.singleCalendar || !isLeft) {
        this.toggleCalendars(false);
        this.setRange();
        this.emitRangeSelected();
      }
    } else if (!this.derivedOptions.singleCalendar && !isLeft) {
      this.enableApplyButton = true;
    } else if (this.derivedOptions.singleCalendar) {
      this.enableApplyButton = true;
    }
    this.fromMonth = this.fromDate
      ? this.fromDate.get("month")
      : this.fromMonth;
    this.toMonth = this.toDate ? this.toDate.get("month") : this.toMonth;
    this.fromYear = this.fromDate.get("year");
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
    if (this.derivedOptions.singleCalendar) {
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
    return dayjs(value, this.derivedOptions.format);
  }
  getValidateDayjs(value) {
    let dayjsValue = null;
    if (dayjs(value, this.derivedOptions.format, true).isValid()) {
      dayjsValue = dayjs(value, this.derivedOptions.format, true);
    }
    return dayjsValue;
  }
  setRange() {
    const displayFormat =
      this.derivedOptions.displayFormat !== undefined
        ? this.derivedOptions.displayFormat
        : this.derivedOptions.format;
    if (this.derivedOptions.singleCalendar && this.fromDate) {
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
    if (
      event.target.value !== this.fromDate.format(this.derivedOptions.format)
    ) {
      this.dateChanged({
        day: event.target.value ? this.getDayjs(event.target.value) : dayjs(),
        isLeft: true,
      });
    }
  }
  formatToDate(event) {
    if (event.target.value !== this.toDate.format(this.derivedOptions.format)) {
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
        this.derivedOptions.minDate &&
        range.value.start.isBefore(
          this.derivedOptions.minDate,
          this.derivedOptions.format
        )
      ) {
        return false;
      }
      if (
        this.derivedOptions.maxDate &&
        range.value.end.isAfter(
          this.derivedOptions.maxDate,
          this.derivedOptions.format
        )
      ) {
        return false;
      }
      return true;
    });
  }
  isAutoApply() {
    if (this.derivedOptions.timePicker) {
      return false;
    } else if (this.derivedOptions.singleCalendar) {
      return true;
    } else {
      return this.derivedOptions.autoApply;
    }
  }
  getAriaLabel() {
    const displayFormat =
      this.derivedOptions.displayFormat !== undefined
        ? this.derivedOptions.displayFormat
        : this.derivedOptions.format;
    if (this.fromDate && this.toDate) {
      return (
        this.fromDate.format(displayFormat) +
        " to " +
        this.toDate.format(displayFormat)
      );
    }
    return "Please select a date range";
  }
}
