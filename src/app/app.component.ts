import { Component } from "@angular/core";
import * as moment from "moment";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  isTimePickerEnabled = true;
  daterangepickerOptions = {
    startDate: null,
    endDate: null,
    format: "DD.MM.YYYY HH:mm",
    minDate: moment().add(-2, "months").format("DD.MM.YYYY HH:mm"),
    maxDate: moment().add(2, "months").format("DD.MM.YYYY HH:mm"),
    inactiveBeforeStart: true,
    autoApply: true,
    showRanges: true,
    preDefinedRanges: [
      {
        name: "Day After tomorow",
        value: {
          start: moment().add(2, "days"),
          end: moment().add(2, "days"),
        },
      },
      {
        name: "Today",
        value: {
          start: moment(),
          end: moment(),
        },
      },
      {
        name: "Tomorrow",
        value: {
          start: moment().add(1, "days"),
          end: moment().add(1, "days"),
        },
      },
      {
        name: "This week",
        value: {
          start: moment(),
          end: moment().add(7, "days"),
        },
      },
    ],
    singleCalendar: false,
    displayFormat: "DD.MM.YYYY HH:mm",
    position: "left",
    disabled: false,
    noDefaultRangeSelected: true,
    timePicker: {
      minuteInterval: 5,
      twentyFourHourFormat: true,
    },
    disableBeforeStart: true,
    alwaysOpen: false,
  };
  rangeSelected(data) {
    debugger;
  }
  singleCalendar(event) {
    this.daterangepickerOptions.singleCalendar = event.target.checked;
  }
  autoApply(event) {
    this.daterangepickerOptions.autoApply = event.target.checked;
  }
  inactiveBeforeStart(event) {
    this.daterangepickerOptions.inactiveBeforeStart = event.target.checked;
  }
  showRanges(event) {
    this.daterangepickerOptions.showRanges = event.target.checked;
  }
  setTimePicker(event) {
    this.isTimePickerEnabled = event.target.checked;
    this.daterangepickerOptions.timePicker = event.target.checked
      ? {
          minuteInterval: 5,
          twentyFourHourFormat: true,
        }
      : null;
  }
  setPosition() {}
  prettyPrintJSON(object) {
    return JSON.stringify(object, null, "  ");
  }
}
