import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';

var moment = require("moment");
require('moment-range');
declare var moment: any;

@Component({
	moduleId: module.id,
	selector: 'calendar',
	templateUrl: './calendar-component.html',
	styleUrls: ['./calendar-component.css']
})
export class CalendarComponent implements OnChanges{
	@Input() month: string;
	@Input() year: string;
	@Input() selectedDate: string;
	@Input() isLeft: boolean;
	get monthText(){
		return moment(this.month+1, 'MM').format('MMMM');
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
		let endDay = moment(startDate).endOf('month');
		let monthRange = moment.range(firstDay, endDay);
		
		let weeks = [];

		monthRange.by('days', function(moment) {
		  var ref;
		  if (ref = moment.week(), indexOf.call(weeks, ref) < 0) {
			return weeks.push(moment.week());
		  }
		});
	   
		let calendar = [];

		for (let i = 0, len = weeks.length; i < len; i++) {
		  let week = weeks[i];
		  let firstWeekDay, lastWeekDay;
		  if (i > 0 && week < weeks[i-1]){
			// We have switched to the next year
			
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
		if(this.isLeft){
			this.dateChanged.emit({
				changed: 'left',
				value: day
			});
		}else{
			this.dateChanged.emit({
				changed: 'right',
				value: day
			});
		}
	}
	monthSelected(){
		if(this.isLeft){
			this.monthChanged.emit({
				changed: 'left'
			});
		}else{
			this.monthChanged.emit({
				changed: 'right'
			});
		}
	}
}