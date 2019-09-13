Date.prototype.getTimeString = function(clock)
{
  var str = '';
  var hrs = this.getHours();

  if (clock == 12)
  {
    var meridian = hrs < 12 ? 'am' : 'pm';

    hrs = hrs % 12;
    if (hrs == 0) { hrs = 12; }
    str += hrs;
  }
  else
  {
    str += (hrs < 10 ? '0' : '') + hrs;
  }

  str += ':';
  var mins = this.getMinutes();
  str += (mins < 10 ? '0' : '') + mins;

  if (clock == 12) { str += meridian; }

  return str;
};
