// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

var p = document.getElementsByTagName('p');
var len = p.length;

for (var i = 0; i < len; i++)
{
  if (p[i].className == 'summary')
  {
    var summary = p[i];
    break;
  }
}

for (var i = 0; i < len; i++)
{
  if (p[i].className != 'summary')
  {
    continue;
  }

  var summary = p[i];
  break;
}


