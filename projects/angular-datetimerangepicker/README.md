# angular-datetimerangepicker

[//]: <> (start placeholder for auto-badger)

<br/>

## About this package

Date and time range picker for Angular v6 and above.
<br/>
This is a successor of this package located here [angular-2-daterangepicker](https://www.npmjs.com/package/angular-2-daterangepicker)
<br/>
It is a fully responsive date and time range picker with or without bootstrap.css.
<br/>
The purpose of this project is to remove dependencies on bootstrap, jquery etc.
<br/>
No offence here. These are good libraries but with modern frameworks they add more footprint hampering the performance

<br/>

## Announcements

- Date: 17 Oct 2020
  1. This is a successor of this package located here [angular-2-daterangepicker](https://www.npmjs.com/package/angular-2-daterangepicker)
  1. Published next major version. v1.0.0
  1. Fixed issue [#45](https://github.com/technikhil314/angular-components/issues/45)
  1. If you want to use this module with angular < v6. Then install v1.1.52 of [this package]([https://www.npmjs.com/package/angular-2-daterangepicker])
  1. This package uses angular version 6 or above

<br/>

## Demo

Check the demo [here](https://angular-datetimerangepicker.surge.sh)

<br/>

## Roadmap

1. Get rid of moment to minimise the package
2. Add theme support
3. Make touch friendly UI for touch devices
4. Make style more robust. Use latest CSS features.

<br/>

## Installation

```bash
$ npm install angular-datetimerangepicker
```

or

```bash
$ yarn add angular-datetimerangepicker
```

<br/>

## Usage

```ts
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { DatetimerangepickerModule } from "angular-datetimerangepicker"; <--- Add this line
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DatetimerangepickerModule, <---Add this line
    FormsModule],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

<br/>

## Styling

Styling is fully optional. You can override as per your choice

### Styling the input

The input box automatically takes class of the daterangepicker tag

### Using Unpkg

If you are already using bootstrap.css then just include the following css in your code
This has minimal set of rules that inherits styles from bootstrap.css <br/>
[https://unpkg.com/angular-datetimerangepicker/styles/with-bootstrap.css](https://unpkg.com/angular-datetimerangepicker/styles/with-bootstrap.css)

if you do not want to include whole bootstrap.css then include following css in your code. <br/>
[https://unpkg.com/angular-datetimerangepicker/styles/without-bootstrap.css](https://unpkg.com/angular-datetimerangepicker/styles/without-bootstrap.css)

### from node_modules

add following path to `angular.json`'s style section if you are already using bootstrap <br/>
`./node_modules/angular-datetimerangepicker/styles/with-bootstrap.css`

or add following path to `angular.json`'s style section if you dont want bootstrap <br/>
`./node_modules/angular-datetimerangepicker/styles/without-bootstrap.css`

<br/>

## How to configure

The input box automatically takes class of the daterangepicker tag

```ts
import { Component } from "@angular/core";

@Component({
  selector: "my-datepicker-demo",
  template: `
    <daterangepicker
      [class]="'col-md-12 col-lg-12 form-control'"
      [options]="daterangepickerOptions"
      (rangeSelected)="rangeSelected($event)"
    >
    </daterangepicker>
  `,
})
export class AppComponent {
  daterangepickerOptions = {
    startDate: "09/01/2017",
    endDate: "09/02/2017",
    format: "DD/MM/YYYY",
  };
}
```

<br/>

## Options

Currently, these options are available but I will keep on developing and adding more and more options

<table>
    <thead>
        <tr>
            <th>Option Name</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Default Value</th>
            <th>Possible Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>format</td>
            <td>string</td>
            <td>format that this date and time range picker will use to communicate with your code</td>
            <td>"YYYY-MM-DD"</td>
            <td>As per <a href="https://momentjs.com/"> momentjs </a> standard formats</td>
        </tr>
        <tr>
            <td>displayFormat</td>
            <td>string</td>
            <td>format that will be displayed to end user</td>
            <td>Same as format</td>
            <td>As per <a href="https://momentjs.com/"> momentjs </a> standard formats</td>
        </tr>
        <tr>
            <td>startDate</td>
            <td>string</td>
            <td>Default start date when this components is rendered for first time. Format of this date should be in line with format option's value above</td>
            <td>Current Systetm Date</td>
            <td>date string in line with format option's value above</td>
        </tr>
        <tr>
            <td>endDate</td>
            <td>string</td>
            <td>Default end date when this components is rendered for first time. Format of this date should be in line with format option's value above</td>
            <td>Current Systetm Date</td>
            <td>date string in line with format option's value above</td>
        </tr>
        <tr>
            <td>minDate</td>
            <td>string</td>
            <td>Default minimum date not including this date. End user will not be able select all dates before this date. Format of this date should be in line with format option's value above</td>
            <td>null</td>
            <td>date string in line with format option's value above</td>
        </tr>
        <tr>
            <td>maxDate</td>
            <td>string</td>
            <td>Default maximum date not including this date. End user will not be able select all dates after this date. Format of this date should be in line with format option's value above</td>
            <td>null</td>
            <td>date string in line with format option's value above</td>
        </tr>
        <tr>
            <td>inactiveBeforeStart</td>
            <td>boolean</td>
            <td>Blurs all dates before selected start date. So end user can not select toDate to be before fromDate.</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
        <tr>
            <td>autoApply</td>
            <td>boolean</td>
            <td>Removes apply and cancel buttons and applies as soon as user selects end date</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
        <tr>
            <td>showRanges</td>
            <td>boolean</td>
            <td>Predefined ranges to show to end user. So end user has ready options instead of navingating through calendars.</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
        <tr>
            <td>preDefinedRanges</td>
            <td> Array of object shown as <a href="#custom-range">below</a>.</td>
            <td>Custom ranges if you want to define your own ranges. This is useful only if showRanges option is set to true.</td>
            <td>see <a href="#custom-range">below</a> for more details</td>
            <td>see <a href="#custom-range">below</a> for more details</td>
        </tr>
        <tr>
            <td>noDefaultRangeSelected</td>
            <td>boolean</td>
            <td>This option set the startDate and endDate options to blank on first render.This date range picker sets startDate and endDate to be current system date by dafault if no value is passed to startDate and endDate.</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
        <tr>
            <td>singleCalendar</td>
            <td>boolean</td>
            <td>Use only one calendar. So you do not need another datepicker for single month.</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
        <tr>
            <td>position</td>
            <td>string</td>
            <td>position of the flyout which will open. By default it opens on left edge of input box</td>
            <td>'left'</td>
            <td>'left','right','center'</td>
        </tr>
        <tr>
            <td>disabled</td>
            <td>boolean</td>
            <td>Whether to disable the main input control</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
        <tr>
            <td>timePicker</td>
            <td>object</td>
            <td>Whether to show timepicker</td>
            <td>null</td>
            <td>Object explained as <a href="#time-picker">below</a></td>
        </tr>
        <tr>
            <td>disableBeforeStart</td>
            <td>boolean</td>
            <td>Whether to disable dates that ar before selected start date in right calendar. This option applies to right calendar only</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
        <tr>
            <td>alwaysOpen</td>
            <td>boolean</td>
            <td>Whether to keep the calendars always open. This option removes the main input box where range is shown</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
    </tbody>
</table>

### Custom Range Option

For custom range, Pass options as below. For this you need to pass <a href="https://momentjs.com/">momentjs</a> objects.

```js
preDefinedRanges: [
  {
    name: "Day After tomorrow",
    value: {
      start: moment().add(2, "days"),
      end: moment().add(2, "days"),
    },
  },
  {
    name: "This week",
    value: {
      start: moment(),
      end: moment().add(7, "days"),
    },
  },
];
```

All dates are supposed to be string and in format as you are passing.
You can also `import { Options } from "angular-datetimerangepicker";`
class for passing options to the component.

### Time Picker Option

Timepicker options expects an object containing following keys as timepicker options

<table>
    <thead>
        <tr>
            <th>Option Name</th>
            <th>Type</th>
            <th>Purpose</th>
            <th>Default Value</th>
            <th>Possible Values</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>minuteInterval</td>
            <td>(integer)number</td>
            <td>The interval by which minutes will increase/decrease when user changes minutes in timepicker</td>
            <td>1</td>
            <td>anything between 1 to 59. If you supply value greater or equal 60 then that value mod 60 is taken as actual value</td>
        </tr>
    </tbody>
</table>

<br/>

## Events

Subscribe to rangeSelected event as

```html
<date-range-picker
  [class]="'col-md-12 form-control'"
  [options]="date and time range pickerOptions"
  (rangeSelected)="rangeSelected($event)"
></date-range-picker>
```

the event listener will receive a javascript object conaining

```js
{
  start: "moment object representing start date selected by user";
  end: "moment object representing end date selected by user";
}
```

and if you have set singleCalendar to true then the event listener will receive following

```js
{
  start: "moment object representing date selected by user";
}
```

<br/>

## Dependencies

[moment.js](http://momentjs.com/) version greater than 2.17.1<br/>
[moment-range.js](https://github.com/gf3/moment-range) version 2.2.0 <br/>
also you should have installed @types/node or [see here](http://stackoverflow.com/questions/36700693/typescript-error-in-angular2-code-cannot-find-name-module) for more information.
I suggest installing all the dependencies before this module

<br/>

## If you liked my work, show some :heart:

### :star: the repo.

Also you can appreciate by

<p>
  <table style="border-spacing: 5px 10px;">
    <tr>
      <td>
        <a href="https://www.buymeacoffee.com/technikhil314"><img src="https://cdn.buymeacoffee.com/buttons/default-orange.png" alt="Buy Me A Coffee" style="max-width:90%;" width="180"></a>
      </td>
      <td>
        <a href="https://paypal.me/technikhil314"><img src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="PayPal Logo" style="max-width:90%;" width="180">
      </td>
    </tr>

  </table>
</p>

# Issues/Problems

Please let me know if you are facing any issues [here](https://github.com/technikhil314/angular-components/issues)

<br/>

# Contributions

Would :heart: to see any contributions.

1. Fork this repo
1. `npm install`
1. `npm install @angular/cli@6`
1. `ng build angular-datetimerangepicker --watch`
1. Actual code for npm package lies in `projects/angular-datetimerangepicker`
1. The code for demo which lies in `src` folder
1. `ng serve`
1. Make changes raise PR
