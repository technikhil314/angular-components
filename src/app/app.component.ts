import { Component, OnInit } from "@angular/core";
declare var require: any;
const dayjs = require("dayjs");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isTimePickerEnabled = true;
  themeObject = {
    "--drp-bg": null,
    "--drp-fg": null,
    "--drp-hover-bg": null,
    "--drp-hover-fg": null,
    "--drp-shadow-color": null,
    "--drp-outline-color": null,
    "--drp-input-border-color": null,
    "--drp-input-disabled-color": null,
  };
  ngOnInit() {
    for (let prop in this.themeObject) {
      this.themeObject[prop] = getComputedStyle(
        document.documentElement
      ).getPropertyValue(prop);
    }
  }
  daterangepickerOptions = {
    format: "DD.MM.YYYY HH:mm",
    startDate: dayjs(),
    endDate: dayjs().add(10, "days"),
    minDate: dayjs().add(-12, "months").format("DD.MM.YYYY HH:mm"),
    maxDate: dayjs().add(12, "months").format("DD.MM.YYYY HH:mm"),
    inactiveBeforeStart: true,
    autoApply: true,
    showRanges: true,
    theme: "light",
    required: false,
    preDefinedRanges: [
      {
        name: "Day After tomorrow",
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
    noDefaultRangeSelected: false,
    timePicker: {
      minuteInterval: 5,
      twentyFourHourFormat: true,
    },
    disableBeforeStart: true,
    alwaysOpen: false,
  };
  selectedRange = {
    start: null,
    end: null,
  };
  rangeSelected(data) {
    this.selectedRange = data;
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
  prettyPrintJSON(object) {
    return JSON.stringify(object, null, 2);
  }
  colorChange(e) {
    this.daterangepickerOptions.theme = "light";
    this.themeObject[e.target.dataset.cssPropName] = e.target.value;
    document.documentElement.style.setProperty(
      e.target.dataset.cssPropName,
      e.target.value
    );
  }
}
