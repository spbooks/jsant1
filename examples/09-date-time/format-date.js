Date.prototype.getDateString = function(str)
{
  var dnames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday', 'Sunday'];

  var mnames = ['January', 'February', 'March', 'April',
      'May', 'June', 'July', 'August', 'September',
      'October', 'Novemeber', 'December'];

  str = str.replace('%day', dnames[this.getDay()]);
  str = str.replace('%date', this.getDate());
  str = str.replace('%ordinal', this.getDateOrdinal());
  str = str.replace('%month', mnames[this.getMonth()]);
  str = str.replace('%year', this.getFullYear());

  return str;
};

Date.prototype.getDateOrdinal = function()
{
  var n = this.getDate();

  var ord = 'th';

  if (n % 10 == 1 && n % 100 != 11)
  {
    ord = 'st';
  }
  else if (n % 10 == 2 && n % 100 != 12)
  {
    ord = 'nd';
  }
  else if (n % 10 == 3 && n % 100 != 13)
  {
    ord = 'rd';
  }

  return ord;
};

Date.prototype.getISODate = function()
{
  var mth = this.getMonth() + 1;
  mth = (mth < 10 ? '0' : '') + mth;

  var date = this.getDate();
  date = (date < 10 ? '0' : '') + date;

  return this.getFullYear() + mth + date;
};
