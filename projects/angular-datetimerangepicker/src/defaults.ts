declare var require: any;
const dayjs = require("dayjs");

const defaults = {
  ranges: [
    {
      name: "Today",
      value: {
        start: dayjs(),
        end: dayjs(),
      },
    },
    {
      name: "Yesterday",
      value: {
        start: dayjs().subtract(1, "days"),
        end: dayjs().subtract(1, "days"),
      },
    },
    {
      name: "last 7 days",
      value: {
        start: dayjs().subtract(6, "days"),
        end: dayjs(),
      },
    },
    {
      name: "This month",
      value: {
        start: dayjs().startOf("month"),
        end: dayjs().endOf("month"),
      },
    },
    {
      name: "Last Month",
      value: {
        start: dayjs().subtract(1, "month").startOf("month"),
        end: dayjs().subtract(1, "month").endOf("month"),
      },
    },
  ],
};

export default defaults;
