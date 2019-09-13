// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such


function formatTo(base, precision)
{
  var a = roundTo(base, precision);
  var s = a.toString();

  var decimalIndex = s.indexOf(".");
  if (precision > 0 && decimalIndex < 0)
  {
    decimalIndex = s.length;
    s += '.';
  }
  while (decimalIndex + precision + 1 > s.length)
  {
    s += '0';
  }
  return s;
}

function roundTo(base, precision)
{
  var m = Math.pow(10, precision);
  var a = Math.round(base * m) / m;
  return a;
}
