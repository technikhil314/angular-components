declare var require: any;
declare var require: any;
const dayjs = require("dayjs");
//-----------------------------------------------------------------------------
// Contstants
//-----------------------------------------------------------------------------
let moment = dayjs;


var INTERVALS = {
  year: true,
  month: true,
  week: true,
  day: true,
  hour: true,
  minute: true,
  second: true,
};

//-----------------------------------------------------------------------------
// Date Ranges
//-----------------------------------------------------------------------------

function DateRange(start, end) {
  var parts;
  var s = start;
  var e = end;

  if (arguments.length === 1 || end === undefined) {
    if (typeof start === "object" && start.length === 2) {
      s = start[0];
      e = start[1];
    } else if (typeof start === "string") {
      parts = start.split("/");
      s = parts[0];
      e = parts[1];
    }
  }

  this.start = s === null ? moment(-8640000000000000) : moment(s);
  this.end = e === null ? moment(8640000000000000) : moment(e);
}

DateRange.prototype.constructor = DateRange;

DateRange.prototype.clone = function () {
  return moment().range(this.start, this.end);
};

DateRange.prototype.contains = function (other, exclusive) {
  var start = this.start;
  var end = this.end;

  if (other instanceof DateRange) {
    return (
      start <= other.start &&
      (end > other.end || (end.isSame(other.end) && !exclusive))
    );
  } else {
    return start <= other && (end > other || (end.isSame(other) && !exclusive));
  }
};

DateRange.prototype.overlaps = function (range) {
  return this.intersect(range) !== null;
};

DateRange.prototype.intersect = function (other) {
  var start = this.start;
  var end = this.end;

  if (start <= other.start && other.start < end && end < other.end) {
    return new DateRange(other.start, end);
  } else if (other.start < start && start < other.end && other.end <= end) {
    return new DateRange(start, other.end);
  } else if (other.start < start && start <= end && end < other.end) {
    return this;
  } else if (
    start <= other.start &&
    other.start <= other.end &&
    other.end <= end
  ) {
    return other;
  }

  return null;
};

DateRange.prototype.add = function (other) {
  if (this.overlaps(other)) {
    return new DateRange(
      moment.min(this.start, other.start),
      moment.max(this.end, other.end)
    );
  }

  return null;
};

DateRange.prototype.subtract = function (other) {
  var start = this.start;
  var end = this.end;

  if (this.intersect(other) === null) {
    return [this];
  } else if (other.start <= start && start < end && end <= other.end) {
    return [];
  } else if (other.start <= start && start < other.end && other.end < end) {
    return [new DateRange(other.end, end)];
  } else if (start < other.start && other.start < end && end <= other.end) {
    return [new DateRange(start, other.start)];
  } else if (
    start < other.start &&
    other.start < other.end &&
    other.end < end
  ) {
    return [new DateRange(start, other.start), new DateRange(other.end, end)];
  } else if (start < other.start && other.start < end && other.end < end) {
    return [new DateRange(start, other.start), new DateRange(other.start, end)];
  }
};

DateRange.prototype.toArray = function (by, exclusive) {
  var acc = [];
  this.by(
    by,
    function (unit) {
      acc.push(unit);
    },
    exclusive
  );
  return acc;
};

DateRange.prototype.by = function (range, hollaback, exclusive) {
  if (typeof range === "string") {
    _byString.call(this, range, hollaback, exclusive);
  } else {
    _byRange.call(this, range, hollaback, exclusive);
  }
  return this;
};

function _byString(interval, hollaback, exclusive) {
  var current = moment(this.start);

  while (this.contains(current, exclusive)) {
    hollaback.call(this, current.clone());
    current.add(1, interval);
      }
}

function _byRange(interval, hollaback, exclusive) {
  var div = this / interval;
  var l = Math.floor(div);

  if (l === Infinity) {
    return;
  }
  if (l === div && exclusive) {
    l--;
  }

  for (var i = 0; i <= l; i++) {
    hollaback.call(this, moment(this.start.valueOf() + interval.valueOf() * i));
  }
}

DateRange.prototype.toString = function () {
  return this.start.format() + "/" + this.end.format();
};

DateRange.prototype.valueOf = function () {
  return this.end - this.start;
};

DateRange.prototype.center = function () {
  var center = this.start + this.diff() / 2;
  return moment(center);
};

DateRange.prototype.toDate = function () {
  return [this.start.toDate(), this.end.toDate()];
};

DateRange.prototype.isSame = function (other) {
  return this.start.isSame(other.start) && this.end.isSame(other.end);
};

DateRange.prototype.diff = function (unit) {
  return this.end.diff(this.start, unit);
};

moment.range = function (start, end) {
  if (start in INTERVALS) {
    return new DateRange(
      moment(this).startOf(start),
      moment(this).endOf(start)
    );
  } else {
    return new DateRange(start, end);
  }
};

moment.range.constructor = DateRange;

moment.within = function (range) {
  return range.contains(this._d);
};

export default DateRange;
