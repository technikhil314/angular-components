import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from "@angular/core";
declare var require: any;
const dayjs = require("dayjs");
var moment = dayjs;

import { Timepicker } from "../daterangepicker-options";

@Component({
  selector: "time-picker",
  templateUrl: "./time-component.html",
})
export class TimePickerComponent implements OnInit, OnChanges {
  @Input()
  options: Timepicker = new Timepicker();
  @Input()
  selectedFromDate: any;
  @Input()
  selectedToDate: any;
  @Input()
  minDate: any;
  @Input()
  maxDate: any;
  @Input()
  format: string;
  @Input()
  isLeft: boolean;
  @Output()
  timeChanged = new EventEmitter();
  ngOnInit(): void {
    if (
      !this.options.minuteInterval ||
      this.options.minuteInterval % 60 === 0
    ) {
      this.options.minuteInterval = 1;
    }
    this.options.minuteInterval = this.options.minuteInterval % 60;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.selectedFromDate = changes["selectedFromDate"]
      ? moment(changes["selectedFromDate"].currentValue, this.format)
      : this["selectedFromDate"];
    this.selectedToDate = changes["selectedToDate"]
      ? moment(changes["selectedToDate"].currentValue, this.format)
      : this["selectedToDate"];
    this.maxDate = changes["maxDate"]
      ? moment(changes["maxDate"].currentValue, this.format)
      : this["maxDate"];
    this.minDate = changes["minDate"]
      ? moment(changes["minDate"].currentValue, this.format)
      : this["minDate"];
  }
  getCurrentHour() {
    let currentHour = this.isLeft
      ? this.selectedFromDate.get("hour")
      : this.selectedToDate.get("hour");
    return isNaN(currentHour)
      ? "&mdash;"
      : currentHour > 9
      ? currentHour
      : "0" + currentHour;
  }
  getCurrentMinute() {
    let currentMinute = this.isLeft
      ? this.selectedFromDate.get("minute")
      : this.selectedToDate.get("minute");
    return isNaN(currentMinute)
      ? "&mdash;"
      : currentMinute > 9
      ? currentMinute
      : "0" + currentMinute;
  }
  addHour(value) {
    if (this.isLeft) {
      this.selectedFromDate = this.selectedFromDate.set(
        "hour",
        (+this.selectedFromDate.get("hour") + value) % 24
      );
    } else {
      this.selectedToDate = this.selectedToDate.set(
        "hour",
        (+this.selectedToDate.get("hour") + value) % 24
      );
    }
    this.triggerTimeChanged();
  }
  addMinute(value) {
    if (this.isLeft) {
      this.selectedFromDate = this.selectedFromDate.set(
        "minute",
        (this.selectedFromDate.get("minute") + value) % 60
      );
      console.log(this.selectedFromDate);
    } else {
      this.selectedToDate = this.selectedToDate.set(
        "minute",
        (this.selectedToDate.get("minute") + value) % 60
      );
      console.log(this.selectedToDate);
    }
    this.triggerTimeChanged();
  }
  isValidToAddMinute(value) {
    let possibleNewValue, possibleSelectedDate;
    if (this.isLeft) {
      possibleNewValue = this.selectedFromDate.get("minute") + value;
      possibleSelectedDate = this.selectedFromDate
        .clone()
        .add(value, "minutes");
    } else {
      possibleNewValue = this.selectedToDate.get("minute") + value;
      possibleSelectedDate = this.selectedToDate.clone().add(value, "minutes");
    }
    let retValue = possibleNewValue < 60 && possibleNewValue >= 0;
    if (this.minDate.isValid()) {
      retValue = retValue && possibleSelectedDate.isSameOrAfter(this.minDate);
    }
    if (this.maxDate.isValid()) {
      retValue = retValue && possibleSelectedDate.isSameOrBefore(this.maxDate);
    }
    return retValue;
  }
  isValidToAddHour(value) {
    let possibleNewValue, possibleSelectedDate;
    if (this.isLeft) {
      possibleNewValue = this.selectedFromDate.get("hour") + value;
      possibleSelectedDate = this.selectedFromDate.clone().add(value, "hour");
    } else {
      possibleNewValue = this.selectedToDate.get("hour") + value;
      possibleSelectedDate = this.selectedToDate.clone().add(value, "hour");
    }
    let retValue = possibleNewValue < 24 && possibleNewValue >= 0;
    if (this.minDate.isValid()) {
      retValue = retValue && possibleSelectedDate.isSameOrAfter(this.minDate);
    }
    if (this.maxDate.isValid()) {
      retValue = retValue && possibleSelectedDate.isSameOrBefore(this.maxDate);
    }
    return retValue;
  }
  triggerTimeChanged() {
    this.isLeft
      ? this.timeChanged.emit(this.selectedFromDate)
      : this.timeChanged.emit(this.selectedToDate);
  }
  toggleAMPM() {}
}
