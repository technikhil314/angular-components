# angular-2-daterangepicker
<div>
	<a href="https://www.npmjs.com/package/angular-2-daterangepicker?activeTab=readme">
		<img src="https://img.shields.io/badge/dynamic/json.svg?label=npm&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fnikhil-001mehta%2Fangular-2-daterangepicker%2Fmaster%2Fpackage.json&query=%24.version&prefix=v" width:"100%">
	</a>
	<a href="https://unpkg.com/angular-2-daterangepicker/index.js">
		<img src="https://img.shields.io/badge/dynamic/json.svg?label=unpkg&uri=https%3A%2F%2Fraw.githubusercontent.com%2Fnikhil-001mehta%2Fangular-2-daterangepicker%2Fmaster%2Fpackage.json&query=%24.version&prefix=v" width:"100%">
	</a>
	<!-- <iframe src="https://ghbtns.com/github-btn.html?user=nikhil-001mehta&repo=angular-2-daterangepicker&type=star&count=true&size=large" frameborder="0" scrolling="0" width="160px" height="30px"></iframe>
	<iframe src="https://ghbtns.com/github-btn.html?user=nikhil-001mehta&repo=angular-2-daterangepicker&type=fork&count=true&size=large" frameborder="0" scrolling="0" width="158px" height="30px"></iframe> -->

</div>

# About this package 
<p>
Daterangepicker for Angular vX.X. Although the name of package is angular 2 it is compatible with angular v4 and v5
</p>
<p>
It is a fully responsive daterangepicker with or without bootstrap.css. See <a href="#responsive-css">responsive section </a> below for more details.
</p>
<p>
This module is strictly intended to work on browsers only and not in node/browserless environments
</p>
<p>
This is a work in progress and you are always welcome to help me going forward with this project.
</p>

# Announcements
<div style="background:grey;color:black">
<ul>
<li>
	Date: 31 Mar 2018
	<ul>
		<li>New option for singleCalendar added in version 1.1.27</li>
	</ul>
</li>
<li>
	Date: 25 Mar 2018
	<ul>
		<li>Made some changes in CSS and responsiveness in version v1.1.26</li>
	</ul>
</li>
<li>
	Date: 23 Mar 2018
	<ul>
		<li>New option for DisplayFormat added in version v1.1.25</li>
	</ul>
</li>
<li>
	Date: 20 Jan 2018
	<ul>
		<li>Module less than version v1.0.10 is no longer supported</li>
	</ul>
</li>
</div>

# Getting Started
## Install
```bash
$ npm install angular-2-daterangepicker 
```
or

```bash
$ bower install angular-2-daterangepicker
```

## Demo
see [Demo](https://nikhil-001mehta.github.io/angular-2-daterangepicker/)
or [Plunker](https://run.plnkr.co/plunks/BtKrOwY8nNLMIdAikubM/) to how to consume this module

# Usage
## How to make it work for you
Import DaterangepickerModule into your module as following

```ts
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

## Options
Currently, very minimum number of options are available but I will keep on developing and adding more and more options


<table>
    <thead>
        <tr>
            <th>Option Name</th>
            <th>Type</th>
            <th colspan="2">Purpose</th>
            <th>Default Value</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>format</td>
            <td>string</td>
            <td >format that this daterangepicker will use to communicate with your code</td>
            <td>"YYYY-MM-DD"</td>
        </tr>
        <tr>
            <td>displayFormat</td>
            <td>string</td>
            <td>format that will be displayed to end user</td>
            <td>Same as format</td>
        </tr>
        <tr>
            <td>startDate</td>
            <td>string</td>
            <td>Default start date when this components is rendered for first time. Format of this date should be in line with format option's value above</td>
            <td>Current Systetm Date</td>
        </tr>
        <tr>
            <td>endDate</td>
            <td>string</td>
            <td>Default end date when this components is rendered for first time. Format of this date should be in line with format option's value above</td>
            <td>Current Systetm Date</td>
        </tr>
        <tr>
            <td>minDate</td>
            <td>string</td>
            <td>Default minimum date not including this date. End user will not be able select all dates before this date. Format of this date should be in line with format option's value above</td>
            <td>null</td>
        </tr>
        <tr>
            <td>maxDate</td>
            <td>string</td>
            <td>Default maximum date not including this date. End user will not be able select all dates after this date. Format of this date should be in line with format option's value above</td>
            <td>null</td>
        </tr>
        <tr>
            <td>inactiveBeforeStart</td>
            <td>boolean</td>
            <td>Blurs all dates before selected start date. So end user can not select toDate to be before fromDate.</td>
            <td>false</td>
        </tr>
        <tr>
            <td>autoApply</td>
            <td>boolean</td>
            <td>Removes apply and cancel buttons and applies as soon as user selects end date</td>
            <td>false</td>
        </tr>
        <tr>
            <td>showRanges</td>
            <td>boolean</td>
            <td>Predefined ranges to show to end user. So end user has ready options instead of navingating through calendars.</td>
            <td>false</td>
        </tr>
        <tr>
            <td>preDefinedRanges</td>
            <td> Array of object shown as <a href="#custom-range">below</a>.</td>
            <td>Custom ranges if you want to define your own ranges. This is useful only if showRanges option is set to true.</td>
            <td>see <a href="#custom-range">below</a> for more details</td>
        </tr>
        <tr>
            <td>noDefaultRangeSelected</td>
            <td>boolean</td>
            <td>This option set the startDate and endDate options to blank on first render.This date range picker sets startDate and endDate to be current system date by dafault if no value is passed to startDate and endDate.</td>
            <td>false</td>
        </tr>
        <tr>
            <td>singleCalendar</td>
            <td>boolean</td>
            <td>Use only one calendar. So you do not need another datepicker for single month.</td>
            <td>false</td>
        </tr>
    </tbody>
</table>

### Custom Range 
For custom range, Pass options as below. For this you need to pass <a href="https://momentjs.com/">momentjs</a> objects.
```js
        preDefinedRanges: [{
            name: 'Day After tomorrow',
                value: {
                    start: moment().add(2, 'days'),
                    end: moment().add(2, 'days'),
                }
		    },{
            name: 'This week',
            value: {
                start: moment(),
                end: moment().add(7, 'days'),
            }
        }]
```

All dates are supposed to be string and in format as you are passing.
You can also 

```ts
import { Options } from 'angular-2-daterangepicker';
```
class for passing options to the component.

## Events

Subscribe to rangeSelected event as 

```html
<date-range-picker [class]="'col-md-12 form-control'" [options]="daterangepickerOptions" (rangeSelected)="rangeSelected($event)"></date-range-picker>
```
the event listener will receive a javascript object conaining 
```js
{
	start: 'moment object representing start date selected by user'
	end: 'moment object representing end date selected by user'
}
```
and if you have set singleCalendar to true then the event listener will receive following
```js
{
	start: 'moment object representing date selected by user'
}
```
## How pass options to the component
The input box automatically takes class of the date-range-picker tag

```ts
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

# Dependencies 
[moment.js](http://momentjs.com/) version greater than 2.17.1<br/>
[moment-range.js](https://github.com/gf3/moment-range) version 2.2.0 <br/>
also you should have installed @types/node or [see here](http://stackoverflow.com/questions/36700693/typescript-error-in-angular2-code-cannot-find-name-module) for more information.
I suggest installing all the dependencies before this module

# Responsive CSS

If you are using bootstrap.css then just include the following styling in your code
if you do not want to include whole bootstrap.css then include [this css](https://raw.githubusercontent.com/nikhil-001mehta/angular-2-daterangepicker/master/daterangepicker-component.css) in your code.
```html
<style>
        .daterangepicker {
            font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important;
            font-size: 14px;
            overflow: hidden
        }

        @media (min-width: 550px) {
            .daterangepicker {
                width: 550px;
            }
        }

        @media (max-width: 550px) {
            .daterangepicker {
                width: 270px;
            }
            .text-center .pull-right {
                float: none !important;
            }
            .col-md-6 {
                width: 100% !important;
            }
            .col-md-10 {
                width: 100% !important;
            }
            .ranges > div {
                display: none;
            }
        }

        .singledatepicker {
            width: 225px;
        }

        .daterangepicker {
            z-index: 3000;
            border-radius: 4px;
            box-shadow: 0px 2px 2px 2px #ddd;
            border: 1px solid #aaa;
            padding: 10px;
        }

        .daterangepicker div[class*="col-md-"],
        .daterangepicker span[class*="col-md-"] {
            padding: 0 5px 0 5px;
            ;
        }

        .hidden {
            display: none !important;
            visibility: false !important;
        }

        .daterangepicker .calendar {
            margin: 4px;
            float: left;
            border-radius: 4px !important;
        }

        .applyBtn {
            margin: 4px;
        }

        .daterangepicker .flush {
            padding: 0 !important;
            margin: 0 !important;
        }

        .daterangepicker .flush-bottom {
            padding-bottom: 0 !important;
        }

        .daterangepicker .flush-left {
            padding-left: 0 !important;
        }

        .daterangepicker .flush-right {
            padding-right: 0 !important;
        }

        .daterangepicker .nudge-half--left {
            padding-left: 4px !important;
        }

        .daterangepicker .nudge-half--right {
            padding-right: 4px !important;
        }

        .daterangepicker .nudge-top {
            top: 5px;
        }

        .daterangepicker .push-bottom {
            margin-bottom: 10px;
        }

        .daterangepicker th {
            margin: 1px !important;
            padding: 1px !important;
            text-align: center;
            border-radius: 4px !important;
        }

        .daterangepicker td {
            font-size: 14px;
            height: 20px;
            width: 20px;
            text-align: center;
            margin: 1px !important;
            padding: 3px !important;
            border-radius: 4px !important;
            white-space: nowrap;
            text-align: center;
        }

        .daterangepicker .btn.btn-flat {
            border: none;
            background: transparent;
            margin: 3px !important;
            padding: 1px !important;
        }

        .daterangepicker .off {
            color: #666;
        }

        .daterangepicker table {
            border-spacing: 0;
            border-collapse: collapse;
        }

        .daterangepicker td,
        .daterangepicker th {
            padding: 0;
        }

        .daterangepicker .clickable {
            cursor: pointer;
        }

        .daterangepicker .clickable-link {
            color: #337ab7;
        }

        .daterangepicker .clickable.disabled {
            pointer-events: none;
            color: #AAA;
            cursor: not-allowed;
        }

        .ranges .clickable {
            margin-top: 8px !important;
        }

        .daterangepicker label {
            display: inline-block;
            max-width: 100%;
            margin-bottom: 5px;
            font-weight: bold;
        }

        .daterangepicker .btn-link {
            padding: 1px 6px 1px 6px !important;
        }

        .daterangepicker .bootstrap-flush{
            margin: 0 !important;
            padding: 0 !important;
        }
    </style>
```

# Issues/Problems
Please let me know if you are facing any issues [here](https://github.com/nikhil-001mehta/angular-2-daterangepicker/issues)

# Want to contribute. You are welcome!!! :)
<ol>
<li>Fork this repo</li>
<li>npm install</li>
<li>Copy all files from <a href="https://gist.github.com/nikhil-001mehta/7a43a4da53ed9809fd6682a340ede618" target="_blank">this gist</a> to your local folder. And do not add them to git index otherwise they will appear in your pull requests.</li>
<li> run "npm install -g typescript typescript-formatter lite-server concurrently rimraf"</li>
<li>run "npm start"</li>
<li>open browser at <a href="http://localhost:3000/" target="_blank">http://localhost:3000/</a></li>
<li>You are all set.</li>
<li>Add features. Fix issues. Open Pull requests.</li>
<li>Remember not to include files from gist in your pull requests</li>
</ol>
