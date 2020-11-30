import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Timepicker } from '../types';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import customParser from 'dayjs/plugin/customParseFormat';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);
dayjs.extend(customParser);
@Component({
  selector: 'timepicker',
  templateUrl: './time-component.html',
})
export class TimePicker implements OnInit, OnChanges {
  // #region all component inputs
  @Input()
  options: Timepicker = new Timepicker();
  @Input()
  selectedFromDate: Dayjs;
  @Input()
  selectedToDate: Dayjs;
  @Input()
  minDate: Dayjs;
  @Input()
  maxDate: Dayjs;
  @Input()
  format: string;
  @Input()
  isLeft: boolean;
  // #endregion

  // #region all components outputs
  @Output()
  timeChanged: EventEmitter<Dayjs> = new EventEmitter();
  // #endregion

  // #region Component Life cycle handlers
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
    this.selectedFromDate = changes['selectedFromDate']
      ? dayjs(changes['selectedFromDate'].currentValue, this.format)
      : this['selectedFromDate'];
    this.selectedToDate = changes['selectedToDate']
      ? dayjs(changes['selectedToDate'].currentValue, this.format)
      : this['selectedToDate'];
    this.maxDate = changes['maxDate']
      ? dayjs(changes['maxDate'].currentValue, this.format)
      : this['maxDate'];
    this.minDate = changes['minDate']
      ? dayjs(changes['minDate'].currentValue, this.format)
      : this['minDate'];
  }
  // #endregion

  // #region view manipulations and condition providers
  getCurrentHour() {
    const currentHour = this.isLeft
      ? this.selectedFromDate.get('hour')
      : this.selectedToDate.get('hour');
    return isNaN(currentHour)
      ? '&mdash;'
      : currentHour > 9
      ? currentHour
      : '0' + currentHour;
  }
  getCurrentMinute() {
    const currentMinute = this.isLeft
      ? this.selectedFromDate.get('minute')
      : this.selectedToDate.get('minute');
    return isNaN(currentMinute)
      ? '&mdash;'
      : currentMinute > 9
      ? currentMinute
      : '0' + currentMinute;
  }
  isValidToAddMinute(value: number) {
    let possibleNewValue, possibleSelectedDate;
    if (this.isLeft) {
      possibleNewValue = this.selectedFromDate.get('minute') + value;
      possibleSelectedDate = this.selectedFromDate.clone().add(value, 'minute');
    } else {
      possibleNewValue = this.selectedToDate.get('minute') + value;
      possibleSelectedDate = this.selectedToDate.clone().add(value, 'minute');
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
  isValidToAddHour(value: number) {
    let possibleNewValue, possibleSelectedDate;
    if (this.isLeft) {
      possibleNewValue = this.selectedFromDate.get('hour') + value;
      possibleSelectedDate = this.selectedFromDate.clone().add(value, 'hour');
    } else {
      possibleNewValue = this.selectedToDate.get('hour') + value;
      possibleSelectedDate = this.selectedToDate.clone().add(value, 'hour');
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
  // #endregion

  // #region self event handlers
  addHour(value: number) {
    if (this.isLeft) {
      this.selectedFromDate = this.selectedFromDate.set(
        'hour',
        (+this.selectedFromDate.get('hour') + value) % 24
      );
    } else {
      this.selectedToDate = this.selectedToDate.set(
        'hour',
        (+this.selectedToDate.get('hour') + value) % 24
      );
    }
    this.triggerTimeChanged();
  }
  addMinute(value: number) {
    if (this.isLeft) {
      this.selectedFromDate = this.selectedFromDate.set(
        'minute',
        (this.selectedFromDate.get('minute') + value) % 60
      );
    } else {
      this.selectedToDate = this.selectedToDate.set(
        'minute',
        (this.selectedToDate.get('minute') + value) % 60
      );
    }
    this.triggerTimeChanged();
  }
  triggerTimeChanged() {
    this.isLeft
      ? this.timeChanged.emit(this.selectedFromDate)
      : this.timeChanged.emit(this.selectedToDate);
  }
  toggleAMPM() {}
  // #endregion
}
