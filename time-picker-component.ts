import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
declare var require: any;
var moment = require('moment');
require('moment-range');

@Component({
    selector: 'time-picker',
    template: `
        <div class="col-md-12 text-center">Timepicker To</div>
    `
})
export class TimePickerComponent implements OnChanges {
    ngOnChanges() { 
              
    }
}
