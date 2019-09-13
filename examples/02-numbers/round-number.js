// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such


function roundTo(base, precision)
{
  var m = Math.pow(10, precision);
  var a = Math.round(base * m) / m;
  return a;
}
