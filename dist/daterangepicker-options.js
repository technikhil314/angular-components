"use strict";
var DateRange = (function () {
    function DateRange() {
    }
    return DateRange;
}());
var DefinedDateRange = (function () {
    function DefinedDateRange() {
    }
    return DefinedDateRange;
}());
var Options = (function () {
    function Options() {
        this.startDate = null;
        this.endDate = null;
        this.minDate = null;
        this.maxDate = null;
        this.format = "YYYY-MM-DD";
        this.displayFormat = "YYYY-MM-DD";
        this.inactiveBeforeStart = false;
        this.autoApply = false;
        this.singleCalendar = false;
        this.noDefaultRangeSelected = false;
        this.showRanges = false;
        this.position = 'left';
        this.disabled = false;
    }
    return Options;
}());
exports.Options = Options;
