import { Component } from "@angular/core";
declare var require: any;
const dayjs = require("dayjs");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  isTimePickerEnabled = true;
  daterangepickerOptions = {
    format: "DD.MM.YYYY HH:mm",
    minDate: dayjs().add(-12, "months").format("DD.MM.YYYY HH:mm"),
    maxDate: dayjs().add(12, "months").format("DD.MM.YYYY HH:mm"),
    inactiveBeforeStart: true,
    autoApply: true,
    showRanges: true,
    theme: "light",
    preDefinedRanges: [
      {
        name: "Day After tomorow",
        value: {
          start: dayjs().add(2, "days"),
          end: dayjs().add(2, "days"),
        },
      },
      {
        name: "Today",
        value: {
          start: dayjs(),
          end: dayjs(),
        },
      },
      {
        name: "Tomorrow",
        value: {
          start: dayjs().add(1, "days"),
          end: dayjs().add(1, "days"),
        },
      },
      {
        name: "This week",
        value: {
          start: dayjs(),
          end: dayjs().add(7, "days"),
        },
      },
      {
        name: "This month",
        value: {
          start: dayjs(),
          end: dayjs().add(1, "month"),
        },
      },
      {
        name: "Next 2 months",
        value: {
          start: dayjs(),
          end: dayjs().add(2, "month"),
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
    console.log(data);
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
