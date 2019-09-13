var since = getTimeBetween('10 Jun, 2003', '');
since = formatTimeBetween(since) + ' since Kizzy was born';
alert(since);

var until = getTimeBetween('', '8 Sep, 2014');
until = formatTimeBetween(until) + ' until secondary school';
alert(since);

var between = getTimeBetween('10 Jun, 2006', '25 Dec, 2006');
between = formatTimeBetween(between) + ' from birthday to xmas';
alert(between);

function formatTimeBetween(difference)
{
  var str = ''

  if (difference[0] > 0)
  {
    str += difference[0] + ' year';
    str += difference[0] == 1 ? '' : 's';
    if (difference[1] > 0)
    {
      str += difference[2] > 0 ? ', ' : ' and ';
    }
    else
    {
      str += difference[2] > 0 ? ' and ' : '';
    }
  }

  if (difference[1] > 0)
  {
    str += difference[1] + ' month';
    str += difference[1] == 1 ? '' : 's';
    str += difference[2] > 0 ? ' and ' : '';
  }

  if (difference[2] > 0)
  {
    str += difference[2] + ' day';
    str += difference[2] == 1 ? '' : 's';
  }

  return str;
}
