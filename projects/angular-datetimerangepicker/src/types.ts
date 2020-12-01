import { Dayjs } from 'dayjs';

export type Theme = 'dark' | 'light';
export type Position = 'left' | 'right' | 'center';

export class DateRange {
  start: Dayjs;
  end: Dayjs;
}

export class DateChanged {
  day: Dayjs;
  isLeft: boolean;
}

export class YearMonthChanged {
  value: number;
  isLeft: boolean;
}

export class MonthNameValue {
  name: string;
  value: number;
}

export class DefinedDateRange {
  name: string;
  value: DateRange;
}

export class Timepicker {
  minuteInterval = 1;
  twentyFourHourFormat = true;
}

export class YearsGrid {
  startYear: number;
  numberOfYearsInOneView: number;
  yearsPerRow: number;
  yearsList: number[][];
  currentYear: number;
}

export class Options {
  startDate?: Dayjs = null;
  endDate?: Dayjs = null;
  minDate?: Dayjs = null;
  maxDate?: Dayjs = null;
  format = 'YYYY-MM-DD';
  displayFormat?: string;
  inactiveBeforeStart = false;
  autoApply = false;
  singleCalendar = false;
  preDefinedRanges?: DefinedDateRange[];
  noDefaultRangeSelected = false;
  showRanges = false;
  position?: Position = 'left';
  disabled = false;
  timePicker?: Timepicker = null;
  disableBeforeStart = false;
  alwaysOpen = false;
  theme?: Theme = 'light';
  required ? = false;
  DOB ? = false;
  weekStartsOn ? = 0;
  addTouchSupport ? = false;
  placeholder ? = '';
  hideControls ? = false;
  readOnly ? = false;
}
