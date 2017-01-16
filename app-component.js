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
var core_1 = require('@angular/core');
var daterangepicker_options_1 = require('./daterangepicker-options');
var AppComponent = (function () {
    function AppComponent() {
        this.daterangepickerOptions = new daterangepicker_options_1.Options();
        this.daterangepickerOptions.startDate = '09/01/2017';
        this.daterangepickerOptions.endDate = '09/02/2017';
        this.daterangepickerOptions.format = 'DD/MM/YYYY';
    }
    AppComponent.prototype.rangeSelected = function () {
    };
    AppComponent = __decorate([
        core_1.Component({
            selector: "my-app",
            template: "\n\t\t<date-range-picker [options]=\"daterangepickerOptions\" (rangeSelected)=\"rangeSelected($event)\" class=\"col-md-4\">\n\t",
            styleUrls: ['./daterangepicker-component.css']
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
exports.AppComponent = AppComponent;
