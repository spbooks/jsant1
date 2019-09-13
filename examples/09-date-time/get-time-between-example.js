var until = getTimeBetween('', '10 Jun, 2014');
alert(until[0] + 'years ' + until[1] + 'months ' + until[2] + 'days');

var since = getTimeBetween('10 Jun, 2003', '');
alert(since[0] + 'years ' + since[1] + 'months ' + since[2] + 'days');

var dayname = getDayName('1 Jan, 2050');
alert('1 Jan, 2050 is a ' + dayname);

var future = dateInSomeDays(15);
alert('In 15 days, it will be a ' + getDayName(future));
