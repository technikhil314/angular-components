import { Component, OnInit } from "@angular/core";
import { Options } from "angular-datetimerangepicker/types";
declare var require: any;
const dayjs = require("dayjs");

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  isTimePickerEnabled = true;
  format = "DD.MM.YYYY HH:mm";
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
  initialConfigDatePickerOptions: any = {
    format: this.format,
    singleCalendar: true,
    displayFormat: this.format,
    position: "left",
    noDefaultRangeSelected: true,
    timePicker: {
      minuteInterval: 1,
      twentyFourHourFormat: true,
    },
  };
  startDateConfigDatePickerOptions: any = {
    ...this.initialConfigDatePickerOptions,
  };
  endDateConfigDatePickerOptions: any = {
    ...this.initialConfigDatePickerOptions,
  };
  minDateConfigDatePickerOptions: any = {
    ...this.initialConfigDatePickerOptions,
  };
  maxDateConfigDatePickerOptions: any = {
    ...this.initialConfigDatePickerOptions,
  };
  daterangepickerOptions: any = {
    startDate: dayjs(),
    endDate: dayjs().add(10, "days"),
    minDate: dayjs().add(-12, "months"),
    maxDate: dayjs().add(12, "months"),
    format: this.format,
    displayFormat: this.format,
    autoApply: true,
    theme: "dark",
    weekStartsOn: 0,
    placeholder: "demo placeholder",
    hideControls: false,
    singleCalendar: false,
    position: "left",
    required: false,
    readOnly: true,
    disabled: false,
    disableWeekEnds: true,
    disabledDays: [3],
    disabledDates: [
      dayjs().add(10, "day"),
      dayjs().add(11, "day"),
      dayjs().add(12, "day"),
      dayjs().add(13, "day"),
      dayjs().add(14, "day"),
    ],
    disableBeforeStart: false,
    inactiveBeforeStart: true,
    noDefaultRangeSelected: false,
    alwaysOpen: false,
    addTouchSupport: true,
    showRanges: true,
    timePicker: {
      minuteInterval: 5,
      twentyFourHourFormat: true,
    },
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
  };
  selectedRange = {
    start: null,
    end: null,
  };
  ngOnInit() {
    for (const prop in this.themeObject) {
      this.themeObject[prop] = getComputedStyle(
        document.documentElement
      ).getPropertyValue(prop);
    }
  }
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
    return JSON.stringify(
      object,
      (key, val) => {
        console.log(key, val);
        if (val && dayjs(val).isValid()) {
          return `dayjs('${val}')`;
        }
        return val;
      },
      2
    );
  }
  colorChange(e) {
    this.daterangepickerOptions.theme = "light";
    this.themeObject[e.target.dataset.cssPropName] = e.target.value;
    document.documentElement.style.setProperty(
      e.target.dataset.cssPropName,
      e.target.value
    );
  }
  optionChanged(propValue, event) {
    this.daterangepickerOptions = {
      ...this.daterangepickerOptions,
      [propValue]: event.start
        ? event.start.format(this.format)
        : event.target.checked,
    };
    if (["minDate", "maxDate"].includes(propValue)) {
      this.endDateConfigDatePickerOptions = {
        ...this.endDateConfigDatePickerOptions,
        noDefaultRangeSelected: false,
        minDate: this.daterangepickerOptions.minDate,
        maxDate: this.daterangepickerOptions.maxDate,
      };
      this.startDateConfigDatePickerOptions = {
        ...this.startDateConfigDatePickerOptions,
        noDefaultRangeSelected: false,
        minDate: this.daterangepickerOptions.minDate,
        maxDate: this.daterangepickerOptions.maxDate,
      };
    }
  }
  formatChanged(propValue, event) {
    this.daterangepickerOptions = {
      ...this.daterangepickerOptions,
      [propValue]: event.target.value,
    };
  }
  disabledDaysChanged(event) {
    this.daterangepickerOptions.disabledDays = event.target.value
      ? event.target.value.split(",").map((x) => +x)
      : null;
  }
}
