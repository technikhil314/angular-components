/*
 * Public API Surface of angular-datetimerangepicker
 */
declare var require: any;
const dayjs = require('dayjs');
const isSameOrAfter = require('dayjs/plugin/isSameOrAfter');
dayjs.extend(isSameOrAfter);
const isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
dayjs.extend(isSameOrBefore);
const customParser = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParser);
const isoWeek = require('dayjs/plugin/isoWeek');
dayjs.extend(isoWeek);
const arraySupport = require('dayjs/plugin/arraySupport');
dayjs.extend(arraySupport);

export * from './datetimerangepicker.module';
export * from './types';
