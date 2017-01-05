"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
//var $ = require('jquery');
//import * as moment from 'moment';
var drp = require('bootstrap-daterangepicker');
var DaterangepickerComponent = (function () {
    function DaterangepickerComponent(elem) {
        this.elem = elem;
        this.datesSelected = new core_1.EventEmitter();
    }
    DaterangepickerComponent.prototype.ngOnInit = function () {
        var that = this;
        $(this.elem.nativeElement)
            .daterangepicker({
            locale: {
                format: this.format || 'YYYY-MM-DD'
            },
            startDate: this.fromDate || new Date(),
            endDate: this.toDate || new Date()
        }, function (start, end, label) {
            that.datesSelected.emit({
                fromDate: start,
                toDate: end
            });
        });
    };
    return DaterangepickerComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "fromDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "toDate", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", String)
], DaterangepickerComponent.prototype, "format", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DaterangepickerComponent.prototype, "datesSelected", void 0);
DaterangepickerComponent = __decorate([
    core_1.Component({
        selector: 'date-range-picker',
        template: "\n\t\t<input type=\"text\"/>\n\t"
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], DaterangepickerComponent);
exports.DaterangepickerComponent = DaterangepickerComponent;
