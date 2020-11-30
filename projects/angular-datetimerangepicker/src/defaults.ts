import dayjs from 'dayjs';

const defaults = {
  ranges: [
    {
      name: 'Today',
      value: {
        start: dayjs().startOf('day'),
        end: dayjs().endOf('day'),
      },
    },
    {
      name: 'Yesterday',
      value: {
        start: dayjs().subtract(1, 'day').startOf('day'),
        end: dayjs().subtract(1, 'day').endOf('day'),
      },
    },
    {
      name: 'This week',
      value: {
        start: dayjs().startOf('week'),
        end: dayjs().endOf('week'),
      },
    },
    {
      name: 'This month',
      value: {
        start: dayjs().startOf('month'),
        end: dayjs().endOf('month'),
      },
    },
    {
      name: 'Last Month',
      value: {
        start: dayjs().subtract(1, 'month').startOf('month'),
        end: dayjs().subtract(1, 'month').endOf('month'),
      },
    },
  ],
};

export default defaults;
