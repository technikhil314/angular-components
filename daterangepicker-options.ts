import * as moment from 'moment';

class DateRange {
    start: any;
    end: any;
}

class DefinedDateRange {
    name: string;
    value: DateRange;
}

export class Options {
    startDate;
    endDate;
    minDate;
    maxDate;
    dateLimit = false;
    singleDatePicker = false;
    format;
    inactiveBeforeStart = false;
    autoApply: boolean;
    timePicker: boolean;
    preDefinedRanges: DefinedDateRange[];
    noDefaultRangeSelected: boolean;
    showRanges: boolean;
}