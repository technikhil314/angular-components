# angular-datetimerangepicker

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

## [For Documentation, configuration click here](https://technikhil314.netlify.app/docs/daterangepicker/introduction)

## [Playground / configuration generator](https://angular-datetimerangepicker.surge.sh)

## [Coding example](https://angular-datetimerangepicker-demo.stackblitz.io)

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

## Todos

1. Get rid of moment to minimise the package [:heavy_check_mark:]
1. Make style more robust. Use latest CSS features. [:heavy_check_mark:]
1. Add theme support [:heavy_check_mark:]
1. Make touch friendly UI for touch devices

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
