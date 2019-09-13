function getTimeBetween(from, until)
{
  var past = from == '' ? new Date() : new Date(from);
  var future = until == '' ? new Date() : new Date(until);

  if (past >= future)
  {
    var tmp = past;
    past = future;
    future = tmp;
  }

  var between = [
      future.getFullYear() - past.getFullYear(),
      future.getMonth() - past.getMonth(),
      future.getDate() - past.getDate()
  ];

  if (between[2] < 0)
  {
    between[1]--;
    var ynum = future.getFullYear();

    var mlengths = [
        31,
        (ynum % 4 == 0 && ynum % 100 != 0 || ynum % 400 == 0) ? 29 : 28,
        31, 30, 31, 30, 31, 31, 30, 31, 30, 31
    ];

    var mnum = future.getMonth() - 1;
    if (mnum < 0) { mnum += 12; }

    between[2] += mlengths[mnum];
  }

  if (between[1] < 0)
  {
    between[0]--;
    between[1] += 12;
  }

  return between;
}

function getDayName(thedate)
{
  var dnames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday',
      'Thursday', 'Friday', 'Saturday', 'Sunday'];

  var today = new Date(thedate);

  return dnames[today.getDay()];
}

function dateInSomeDays(n)
{
  var today = new Date();

  var seconds = today.getTime();
  seconds += n * 86400000;

  return new Date(seconds);
}
