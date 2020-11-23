import dayjs from "dayjs";

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
        start: dayjs().subtract(1, "day"),
        end: dayjs().subtract(1, "day"),
      },
    },
    {
      name: "last 7 day",
      value: {
        start: dayjs().subtract(6, "day"),
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
