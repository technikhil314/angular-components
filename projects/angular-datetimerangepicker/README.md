# angular-datetimerangepicker

## [Documentation is hosted here](https://technikhil314.netlify.app/docs/daterangepicker/introduction)

[//]: <> (start placeholder for auto-badger)

[![Build Status](https://img.shields.io/github/workflow/status/technikhil314/angular-components/build?style=flat-square&color=%23007a1f)](https://github.com/technikhil314/angular-components/actions)
[![version](https://img.shields.io/npm/v/angular-datetimerangepicker.svg?style=flat-square)](https://npmjs.org/angular-datetimerangepicker)
[![min size](https://img.shields.io/bundlephobia/min/angular-datetimerangepicker)](https://bundlephobia.com/result?p=angular-datetimerangepicker)
[![mingzip size](https://img.shields.io/bundlephobia/minzip/angular-datetimerangepicker)](https://bundlephobia.com/result?p=angular-datetimerangepicker)
[![license](https://img.shields.io/npm/l/angular-datetimerangepicker?color=%23007a1f)](https://github.com/technikhil314/angular-components/blob/master/LICENSE)

[![dependancies](https://img.shields.io/librariesio/release/npm/angular-datetimerangepicker?color=%23007a1f)](https://libraries.io/npm/angular-datetimerangepicker)
[![downloads](https://img.shields.io/npm/dm/angular-datetimerangepicker)](https://npmcharts.com/compare/angular-datetimerangepicker)
[![all contributors](https://img.shields.io/github/all-contributors/technikhil314/angular-components)](https://github.com/technikhil314/angular-components/graphs/contributors)
[![code of conduct](https://img.shields.io/badge/code%20of-conduct-ff69b4.svg?style=flat-square)](https://github.com/technikhil314/angular-components/blob/master/CODE_OF_CONDUCT.md)
[![chat with community](https://img.shields.io/gitter/room/technikhil314/angular-components?color=%23007a1f)](https://gitter.im/angular-components)

[![stargazers](https://img.shields.io/github/stars/technikhil314/angular-components?style=social)](https://github.com/technikhil314/angular-components/stargazers)
[![number of forks](https://img.shields.io/github/forks/technikhil314/angular-components?style=social)](https://github.com/technikhil314/angular-components/fork)
[![Follow technikhil314 on twiter](https://img.shields.io/twitter/follow/technikhil314?label=Follow)](https://www.twitter.com/technikhil314)

:clap: & :heart: to [auto badger](https://github.com/technikhil314/auto-badger) for making badging simple

[//]: <> (end placeholder for auto-badger)

## Table of contents

- [About this package](#about-this-package)
- [Announcements](#announcements)
- [Roadmap](#roadmap)
- [Installation](#installation)
- [Usage](#usage)
- [Styling](#styling)
  - [Styling the input](#styling-the-input)
  - [Using Unpkg](#using-unpkg)
  - [from node_modules](#from-node-modules)
  - [theming](#theming)
- [How to configure](#how-to-configure)
- [Options](#options)
  - [Custom Range Option](#custom-range-option)
  - [Time Picker Option](#time-picker-option)
- [Events](#events)
- [Dependencies](#dependencies)

* [Facing problems](#facing-problems)
* [Contributions](#contributions)
  - [How to contribute](#how-to-contribute)

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

- Date: 13th Nov 2020
  1. Using modern css (flexbox)
  1. Removing dependency on bootstrap (now works without bootstrap too)
  1. Adding option for theme
  1. Added screen reader and keyboard accessibility
- Date: 25 Oct 2020
  1. Removed momentjs now using [dayjs](https://day.js.org/)
- Date: 17 Oct 2020
  1. This is a successor of this package located here [angular-2-daterangepicker](https://www.npmjs.com/package/angular-2-daterangepicker)
  1. Published next major version. v1.0.0
  1. Fixed issue [#45](https://github.com/technikhil314/angular-components/issues/45)
  1. If you want to use this module with angular < v6. Then install v1.1.52 of [this package]([https://www.npmjs.com/package/angular-2-daterangepicker])
  1. This package uses angular version 6 or above

<br/>

## [Playground / configuration generator](https://angular-datetimerangepicker.surge.sh)

## [Coding example](https://angular-datetimerangepicker-demo.stackblitz.io)

<br/>

## Todos

1. Get rid of moment to minimise the package [:heavy_check_mark:]
1. Make style more robust. Use latest CSS features. [:heavy_check_mark:]
1. Add theme support [:heavy_check_mark:]
1. Make touch friendly UI for touch devices

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
// add the line below
import { DatetimerangepickerModule } from "angular-datetimerangepicker";
import { AppComponent } from "./app.component";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // add the line below
    DatetimerangepickerModule,
    FormsModule,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

<br/>

## Styling

Styling is fully optional. You can override as per your choice.

### Styling the input

The main input control automatically takes class of the `<daterangepicker>` tag

### Using Unpkg

[https://unpkg.com/angular-datetimerangepicker/styles/styles.css](https://unpkg.com/angular-datetimerangepicker/styles/styles.css)

### From node_modules

add following path to `angular.json`'s style section if you are already using bootstrap <br/>
`./node_modules/angular-datetimerangepicker/styles/styles.css`

or add following path to `angular.json`'s style section if you don't want bootstrap <br/>
`./node_modules/angular-datetimerangepicker/styles/without-bootstrap.css`

### Theming

The component supports two themes light and dark. See the [Options section below](#options)

If you want custom theme. Feel free to [contribute](#how-to-contribute).

or you can use following css variables to override the style

the styles.css defines following css variables

```css
:root {
  --drp-input-height: 33px;
  --drp-input-border-radius: 4px;
  --drp-background: hsla(0, 0%, 98%);
  --drp-foreground: hsla(0, 0%, 20%);
  --drp-hover-color: hsla(0, 0%, 80%);
  --drp-shadow-color: rgba(0, 0, 0, 0.2);
  --drp-flyout-width: 500px;
  --drp-outline-color: hsl(240deg, 50%, 30%);
  --drp-flyout-single-calendar-width: 250px;
  --drp-input-border-color: #666;
  --drp-input-disabled-color: #dedede;
}
```

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
            <td>As per <a href="https://day.js.org/"> dayjs </a> standard formats</td>
        </tr>
        <tr>
            <td>displayFormat</td>
            <td>string</td>
            <td>format that will be displayed to end user</td>
            <td>Same as format</td>
            <td>As per <a href="https://day.js.org/"> dayjs </a> standard formats</td>
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
            <td>theme</td>
            <td>string</td>
            <td>theme for overall component</td>
            <td>'light'</td>
            <td>'light','dark'</td>
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
        <tr>
            <td>required</td>
            <td>boolean</td>
            <td>Sets required attribute to the input box (makes sense only if used inside form)</td>
            <td>false</td>
            <td>true,false</td>
        </tr>
    </tbody>
</table>

### Custom Range Option

For custom range, Pass options as below. For this you need to pass <a href="https://day.js.org/">dayjs</a> objects.
:warning: Custom ranges should always be passed in dayjs objects

```js
preDefinedRanges: [
  {
    name: "Day After tomorrow",
    value: {
      start: dayjs().add(2, "days"),
      end: dayjs().add(2, "days"),
    },
  },
  {
    name: "This week",
    value: {
      start: dayjs(),
      end: dayjs().add(7, "days"),
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
<daterangepicker
  [class]="'col-md-12 form-control'"
  [options]="date and time range pickerOptions"
  (rangeSelected)="rangeSelected($event)"
></daterangepicker>
```

the event listener will receive a javascript object conaining

```js
{
  start: "dayjs object representing start date selected by user";
  end: "dayjs object representing end date selected by user";
}
```

and if you have set singleCalendar to true then the event listener will receive following

```js
{
  start: "dayjs object representing date selected by user";
}
```

<br/>

## Dependencies

[dayjs](http://dayjs.org/) version greater than 1.9.3<br/>
[calendarize](https://github.com/lukeed/calendarize) version 1.1.1 <br/>
also you should have installed @types/node or [see here](http://stackoverflow.com/questions/36700693/typescript-error-in-angular2-code-cannot-find-name-module) for more information.
I suggest installing all the dependencies before this module

<br/>

## If you liked my work, show some :heart: :star: the repo.

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

# Facing Problems

Please let me know if you are facing any issues [here](https://github.com/technikhil314/angular-components/issues)

<br/>

# Contributions

Would :heart: to see any contributions.

### How to contribute

P.S. The code for demo which lies in `src` folder
P.S. Actual code for npm package lies in `projects/angular-datetimerangepicker` directory

1. Fork this repo
1. `npm install @angular/cli@6`
1. `npm install`
1. `ng build angular-datetimerangepicker --watch`
1. run `ng serve` in another terminal window/shell
1. Make changes
1. Raise PR
