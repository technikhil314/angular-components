# angular-2-daterangepicker

### This is a npm module for daterangepicker as [here](http://www.daterangepicker.com/). But the original daterangepicker requires bootstrap.css,bootstrap.js,jquery.js as dependancy which this module is trying to get rid of.

This module is strictly intended to work on browsers only and not in node/browserless environments

This is a work in progress and you are always welcome to help me going forward with this project.

###Installation

```bash
# NPM
npm install angular-2-daterangepicker
```
### Version less than or equal 1.0.10
### if you are using this module with version less than or equal 1.0.10 then installation goes as following

	<!-- Include Required Prerequisites -->
	<script type="text/javascript" src="//cdn.jsdelivr.net/jquery/1/jquery.min.js"></script>
	<script type="text/javascript" src="//cdn.jsdelivr.net/momentjs/latest/moment.min.js"></script>
	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap/3/css/bootstrap.css" />

	<!-- Include Date Range Picker -->
	<script type="text/javascript" src="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.js"></script>
	<link rel="stylesheet" type="text/css" href="//cdn.jsdelivr.net/bootstrap.daterangepicker/2/daterangepicker.css" />

Use this as: 
<pre>
	&lt;date-range-picker [fromDate]="'04/01/2017'" [toDate]="'04/02/2017'" [format]="'DD/MM/YYYY'" (datesSelected)="demo($event)"&gt; &lt;/date-range-picker&gt;
</pre>

currently only three options are made available
<pre>
1. format
	Use this to configure date format which you want. If not provided it defaults to YYYY-MM-DD
2. fromDate and
3. toDate
	Both dates are supposed to be string and are accepted in format provided.
	If not provided then both dates defaults to current date in provided format
</pre>
To get selected dates subscribe to datesSelected event
which passes a javascript object in following format
<pre>
{
	fromDate: contains a moement object, format it as per your needs,
	toDate: contains a moement object, format it as per your needs
}
</pre>

### if you are using this module with version greater than or equal 1.1.0 then installation goes as following

### Depends on 
[momennt.js](http://momentjs.com/) version greater than 2.17.1<br/>
[momennt-range.js](https://github.com/gf3/moment-range) version 2.2.0 <br/>

I will suggest you to install dependancy modules before this module

If you are using bootstrap.css then just include following styliing in your code <br/>
```bash
<style>
	.daterangepicker .hidden {
		display: none;
		visibility: false;
	}

	.daterangepicker {
		z-index: 3000;
		border-radius: 4px;
		box-shadow: 0px 2px 2px 2px #888888;
		max-width: 450px;
	}
	.daterangepicker .calendar {
		margin: 4px;
		float: left;
		border-radius: 4px !important;
	}
	.daterangepicker .applyBtn{
		margin: 4px;
	}
	.daterangepicker .flush {
		padding: 0 !important;
		margin: 0 !important;
	}
	.daterangepicker .flush-bottom{
		padding-bottom: 0 !important;
	}
	.daterangepicker .flush-left {
		padding-left: 0 !important;
	}
	.daterangepicker .flush-right {
		padding-right: 0 !important;
	}
	.daterangepicker .flush-half--left {
		padding-left: 4px !important;
	}
	.daterangepicker .flush-half--right {
		padding-right: 4px !important;
	}
	.daterangepicker .nudge-top {
		top: 5px;
	}
	.daterangepicker th {
		margin: 1px !important;
		padding: 1px !important;
		text-align: center;
		border-radius: 4px !important;
	}
	.daterangepicker td {
		height: 20px;
		width: 20px;
		text-align: center;
		padding: 1px !important;
		margin: 1px !important;
		border-radius: 4px !important;
	}
	.daterangepicker .btn.btn-flat {
		border: none;
		background: transparent;
		margin: 3px !important;
		padding: 1px !important;
	}
	.daterangepicker .off {
		color: #A2A2A2;
	}
  </style>
```

if you do not want to include whole bootstrap.css then include [this css](https://raw.githubusercontent.com/nikhil-001mehta/angular-2-daterangepicker/master/daterangepicker-component.css) in your code.

see [this plunker](https://run.plnkr.co/plunks/BtKrOwY8nNLMIdAikubM/) to see hot to configure it with system.js loader

###Usage
Import DaterangepickerModule into your module as following
```bash
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { DaterangepickerModule } from 'angular-2-daterangepicker';
@NgModule({
	imports: [BrowserModule, DaterangepickerModule],
	declarations: [ AppComponent ],
	bootstrap: [AppComponent]
})
export class AppModule {
	
}
```

###options
Currently very minimum number of options are available but I will keep on developing and adding more and more options
```bash
startDate: Default start date
endDate: default end date
format: date format
```
###How pass options to the component
The input box automatically takes class of the date-range-picker tag
```bash
import { Component } from '@angular/core';

@Component({
	selector: "my-datepicker-demo",
	template: `
		<date-range-picker class="col-md-4" [options]="daterangepickerOptions" class="col-md-4">
		</date-range-picker>
	`
})
export class AppComponent{
	daterangepickerOptions = {
		startDate: '09/01/2017',
		endDate: '09/02/2017',
		format: 'DD/MM/YYYY'
	}
}

```
Please let me know if your are facing any issues [here](https://github.com/nikhil-001mehta/angular-2-daterangepicker/issues)
