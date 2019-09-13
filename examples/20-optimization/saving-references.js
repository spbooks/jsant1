// Please note: this file contains snippets for comparison
// it is not self-contained or ready-to-use code as such

var p = document.getElementById('content').getElementsByTagName('p');
var len = p.length;

for (var i = 0; i < len; i++)
{
  var pstyle = p[i].style;
  pstyle.color = 'red';
  pstyle.fontWeight = 'bold';
}
