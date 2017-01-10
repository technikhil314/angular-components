import * as moment from 'moment';

export class Options {
	startDate;
	endDate;
	minDate = false;
	maxDate = false;
	dateLimit = false;
	autoApply = false;
	singleDatePicker = false;
	showDropdowns = false;
	showWeekNumbers = false;
	showISOWeekNumbers = false;
	showCustomRangeLabel = true;
	timePicker = false;
	timePicker24Hour = false;
	timePickerIncrement = 1;
	timePickerSeconds = false;
	linkedCalendars = true;
	autoUpdateInput = true;
	alwaysShowCalendars = false;
	ranges = {};
	format;
}