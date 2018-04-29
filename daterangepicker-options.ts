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
    format;
    displayFormat;
    inactiveBeforeStart = false;
    autoApply: boolean;
    singleCalendar: boolean;
    preDefinedRanges: DefinedDateRange[];
    noDefaultRangeSelected: boolean;
    showRanges: boolean;
    position: string = 'left';
}