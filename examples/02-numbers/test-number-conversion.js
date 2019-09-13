// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such


function testNumberConversion(input)
{
  var a = parseInt(input);
  if (isNaN(a))
  {
    alert('"' + input + '" cannot be converted');
  }
  else
  {
    alert('"' + input + '" converts to ' + a);
  }
}
