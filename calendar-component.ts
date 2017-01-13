import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

var moment = require('moment');
require('moment-range');

@Component({
	moduleId: module.id,
	selector: 'calendar',
	templateUrl: './calendar-component.html',
	styleUrls: ['./daterangepicker-component.css']
})
export class CalendarComponent implements OnChanges{
	@Input() month: string;
	@Input() year: string;
	@Input() selectedDate: string;
	@Input() isLeft: boolean;
	@Input() format: string;
	get monthText(){
		let months = moment.monthsShort()
		return months[this.month];
	}
	@Output() dateChanged = new EventEmitter();
	@Output() monthChanged = new EventEmitter();
	
	weekList: any;
	ngOnChanges(changes: SimpleChanges): void{
		let indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };
		
		let year = this.year;
		let month = this.month;
		let startDate = moment([year, month]);
		let firstDay = moment(startDate).startOf('month');
		let endDay = moment(startDate).add(60, 'd');
		let monthRange = moment.range(firstDay, endDay);
		
		let weeks = [];

		monthRange.by('days', function(moment) {
		  var ref;
		  if (weeks.length < 6 && (ref = moment.week(), indexOf.call(weeks, ref)) < 0) {
			return weeks.push(moment.week());
		  }
		});
	   
		let calendar = [];

		for (let i = 0, len = weeks.length; i < len; i++) {
		  let week = weeks[i];
		  let firstWeekDay, lastWeekDay;
		  if (i > 0 && week < weeks[i-1]){
			firstWeekDay = moment([year, month]).add(1, "year").week(week).day(0);
			lastWeekDay = moment([year, month]).add(1, "year").week(week).day(6);
		  }
		  else{
			firstWeekDay = moment([year, month]).week(week).day(0);
			lastWeekDay = moment([year, month]).week(week).day(6);
		  }
		  let weekRange = moment.range(firstWeekDay, lastWeekDay);
		  calendar.push(weekRange);
		}
		let weekList = [];
		calendar.map(function(week){
			let daysList = [];
			week.by('days', function(day){
				daysList.push(day);
			});
			weekList.push(daysList);
		});
		this.weekList = weekList;
	}
	dateSelected(day){
		this.dateChanged.emit(day.format(this.format));
	}
	monthSelected(){
		if(this.isLeft){
			this.monthChanged.emit(-1);
		}else{
			this.monthChanged.emit(1);
		}
	}
}